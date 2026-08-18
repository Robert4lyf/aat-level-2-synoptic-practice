#!/usr/bin/env node
/**
 * Guards the password gate in worker/index.js, and the wrangler.jsonc settings
 * without which that gate never runs at all.
 *
 * The gate is the only thing standing between the deployed site and the open
 * internet, and it is code that never runs locally — nobody would notice it
 * breaking until the site was either shut to everyone or open to everyone. So
 * it is exercised here against mock requests, the same way the Worker is.
 *
 * Two failure directions matter, and both are checked:
 *   - fails OPEN — serving content to a request that should have been refused
 *   - fails SHUT — refusing a correct password, or losing the security headers
 *     that _headers can no longer supply once a Function is in front of them
 *
 * Run: node scripts/check-site-password.js   (exit 1 on any failure)
 */

'use strict';

const path = require('path');

const RED = '\x1b[31m', GREEN = '\x1b[32m', DIM = '\x1b[2m', RESET = '\x1b[0m';

const failures = [];
let checked = 0;

function check(name, condition, detail) {
  checked++;
  if (condition) {
    console.log(`  ${GREEN}✓${RESET} ${name}`);
  } else {
    console.log(`  ${RED}✗${RESET} ${name}${detail ? DIM + ' — ' + detail + RESET : ''}`);
    failures.push(name + (detail ? ' — ' + detail : ''));
  }
}

const basic = (user, password) =>
  'Basic ' + Buffer.from(`${user}:${password}`, 'utf8').toString('base64');

const APP_BODY = '<html>APP</html>';

async function main() {
  // The Worker is an ES module; this script is CommonJS like the rest of
  // scripts/. Importing it from its own path would make Node warn about the
  // ambiguous module type on every run, so the source is loaded through a data:
  // URL instead. The Worker imports nothing, so it needs no resolution context.
  const source = require('fs').readFileSync(
    path.resolve(__dirname, '../worker/index.js'),
    'utf8'
  );
  const worker = await import(
    'data:text/javascript;base64,' + Buffer.from(source, 'utf8').toString('base64')
  );

  // A stand-in for the static-assets binding, so the gate can be exercised
  // without deploying. It records whether it was reached — a request that gets
  // this far is one that would have been served the real site.
  let assetsServed = 0;
  const env = (extra) => ({
    ...extra,
    ASSETS: {
      fetch: async () => {
        assetsServed++;
        return new Response(APP_BODY, {
          headers: { 'Content-Type': 'text/html; charset=utf-8' },
        });
      },
    },
  });

  const call = (vars, authorization) =>
    worker.default.fetch(
      new Request(
        'https://example.workers.dev/',
        authorization ? { headers: { Authorization: authorization } } : undefined
      ),
      env(vars)
    );

  const ENV = { SITE_PASSWORD: 'correct horse battery staple' };
  const GOOD = basic('anyone', ENV.SITE_PASSWORD);

  console.log('An unconfigured deployment stays shut:');
  {
    const res = await call({}, GOOD);
    check('missing SITE_PASSWORD returns 503, not the site', res.status === 503, `got ${res.status}`);
    check('the 503 still carries a CSP', !!res.headers.get('Content-Security-Policy'));
  }

  console.log('\nRequests without a valid password are refused:');
  for (const [label, header] of [
    ['no Authorization header', null],
    ['wrong password', basic('anyone', 'guess')],
    ['a prefix of the password', basic('anyone', 'correct horse battery stapl')],
    ['the password with a trailing space', basic('anyone', ENV.SITE_PASSWORD + ' ')],
    ['an empty password', basic('anyone', '')],
    ['a Bearer token', 'Bearer abc123'],
    ['base64 garbage', 'Basic !!!not-base64!!!'],
    ['credentials with no colon', 'Basic ' + Buffer.from('nocolon').toString('base64')],
    ['an empty Basic header', 'Basic '],
  ]) {
    let res;
    try {
      res = await call(ENV, header);
    } catch (err) {
      check(`${label} → 401`, false, `threw ${err.message}`);
      continue;
    }
    check(`${label} → 401`, res.status === 401, `got ${res.status}`);
    if (res.status === 401) {
      const body = await res.text();
      check(`  ...and the 401 body does not echo the password`, !body.includes(ENV.SITE_PASSWORD));
    }
  }
  check(
    'no refused request ever reached the static assets',
    assetsServed === 0,
    `the assets binding was called ${assetsServed} time(s)`
  );

  console.log('\nThe 401 challenge is well-formed:');
  {
    const res = await call(ENV, null);
    check(
      'sends WWW-Authenticate so the browser shows a prompt',
      /^Basic realm="/.test(res.headers.get('WWW-Authenticate') || ''),
      `got ${res.headers.get('WWW-Authenticate')}`
    );
    check(
      'declares charset=UTF-8 so non-ASCII passwords encode consistently',
      /charset="UTF-8"/i.test(res.headers.get('WWW-Authenticate') || '')
    );
    check(
      'is no-store, so no cache or service worker keeps the refusal',
      res.headers.get('Cache-Control') === 'no-store',
      `got ${res.headers.get('Cache-Control')}`
    );
  }

  console.log('\nThe correct password gets the site:');
  {
    const res = await call(ENV, GOOD);
    check('correct password → 200', res.status === 200, `got ${res.status}`);
    check('the app body is passed through untouched', (await res.clone().text()) === APP_BODY);
    check(
      'the upstream Content-Type survives the rebuild',
      (res.headers.get('Content-Type') || '').includes('text/html')
    );

    // Every header _headers can no longer apply must be re-applied here.
    const required = {
      'Content-Security-Policy': (v) => v.includes("default-src 'self'") && !v.includes("'unsafe-inline'; script-src"),
      'X-Frame-Options': (v) => v === 'DENY',
      'X-Content-Type-Options': (v) => v === 'nosniff',
      'Referrer-Policy': (v) => v === 'strict-origin-when-cross-origin',
      'Permissions-Policy': (v) => v.includes('camera=()'),
      'Cross-Origin-Opener-Policy': (v) => v === 'same-origin',
    };
    for (const [header, valid] of Object.entries(required)) {
      const value = res.headers.get(header);
      check(`re-applies ${header}`, !!value && valid(value), value ? `got ${value}` : 'missing');
    }
  }

  console.log('\nSITE_USERNAME is enforced only when it is set:');
  {
    const withUser = { SITE_PASSWORD: ENV.SITE_PASSWORD, SITE_USERNAME: 'rob' };
    check(
      'unset → any username with the right password is accepted',
      (await call(ENV, basic('literally-anyone', ENV.SITE_PASSWORD))).status === 200
    );
    check(
      'set → the wrong username is refused even with the right password',
      (await call(withUser, basic('nope', ENV.SITE_PASSWORD))).status === 401
    );
    check(
      'set → the right username and password is accepted',
      (await call(withUser, basic('rob', ENV.SITE_PASSWORD))).status === 200
    );
  }

  console.log('\nAwkward passwords still work:');
  {
    check(
      'a password containing colons',
      (await call({ SITE_PASSWORD: 'a:b:c' }, basic('u', 'a:b:c'))).status === 200
    );
    check(
      'a password with non-ASCII characters (é, £)',
      (await call({ SITE_PASSWORD: 'pÉ£ss' }, basic('u', 'pÉ£ss'))).status === 200
    );
  }

  /* The gate can be perfect and still never run. Cloudflare serves matching
     static assets straight from the edge unless run_worker_first is set, and a
     deploy in that state looks completely normal while being wide open — so the
     setting is checked here rather than trusted. */
  console.log('\nwrangler.jsonc still routes every request through the Worker:');
  {
    const raw = require('fs').readFileSync(path.resolve(__dirname, '../wrangler.jsonc'), 'utf8');
    // Strip // comments that are not inside a string, so JSONC parses as JSON.
    let json = '', inString = false, escaped = false;
    for (let i = 0; i < raw.length; i++) {
      const c = raw[i];
      if (inString) {
        json += c;
        if (escaped) escaped = false;
        else if (c === '\\') escaped = true;
        else if (c === '"') inString = false;
        continue;
      }
      if (c === '"') { inString = true; json += c; continue; }
      if (c === '/' && raw[i + 1] === '/') { while (i < raw.length && raw[i] !== '\n') i++; json += '\n'; continue; }
      json += c;
    }

    let config = null;
    try {
      config = JSON.parse(json);
    } catch (err) {
      check('wrangler.jsonc parses', false, err.message);
    }

    if (config) {
      const assets = config.assets || {};
      check(
        'assets.run_worker_first is true — without it the gate is bypassed entirely',
        assets.run_worker_first === true,
        `got ${JSON.stringify(assets.run_worker_first)}`
      );
      check(
        'assets.binding is ASSETS, matching env.ASSETS in the Worker',
        assets.binding === 'ASSETS',
        `got ${JSON.stringify(assets.binding)}`
      );
      check(
        'main points at the Worker holding the gate',
        config.main === 'worker/index.js',
        `got ${JSON.stringify(config.main)}`
      );
    }

    /* node_modules appears at deploy time because the build runs npx wrangler,
       and workerd inside it is far over the 25 MiB per-asset limit. */
    const assetsIgnore = require('fs').readFileSync(path.resolve(__dirname, '../.assetsignore'), 'utf8');
    const ignored = assetsIgnore.split('\n').map((l) => l.trim()).filter((l) => l && !l.startsWith('#'));
    for (const entry of ['/node_modules', '/worker', '/scripts', '/tools']) {
      check(`.assetsignore excludes ${entry} from the public upload`, ignored.includes(entry));
    }
  }

  console.log('');
  if (failures.length) {
    console.log(`${RED}Password gate check FAILED (${failures.length} of ${checked}):${RESET}`);
    failures.forEach((f) => console.log(`  ${RED}✗${RESET} ${f}`));
    console.log(
      `\n${DIM}worker/index.js and its wrangler.jsonc settings are what stand between ` +
      `the deployed site and the open internet. Do not merge this red.${RESET}`
    );
    process.exit(1);
  }

  console.log(`${GREEN}Password gate check passed — ${checked} assertions.${RESET}`);
  process.exit(0);
}

main().catch((err) => {
  console.error(`${RED}Password gate check crashed:${RESET} ${err.stack || err.message}`);
  process.exit(1);
});
