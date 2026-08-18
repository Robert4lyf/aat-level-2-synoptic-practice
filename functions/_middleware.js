/* Cloudflare Pages middleware — shared-password gate for the whole site.
 *
 * Runs in front of EVERY request. Visitors get a browser password prompt
 * (HTTP Basic authentication) and nothing is served until they pass it.
 *
 * Setup, once, in the Cloudflare dashboard (Workers & Pages -> this project ->
 * Settings -> Variables and Secrets):
 *
 *   SITE_PASSWORD   required. The shared password. Add it as a SECRET so it is
 *                   encrypted at rest and not readable back out of the UI.
 *   SITE_USERNAME   optional. If set, the username must match it too. If left
 *                   unset, any username is accepted and only the password is
 *                   checked — simpler to explain to people you share the URL with.
 *
 * Set the variable for BOTH the Production and Preview environments, or preview
 * deployments will refuse to serve (see the fail-closed note below).
 *
 * This is a single shared password, not per-person accounts, and Basic auth
 * sends it base64-encoded rather than encrypted — HTTPS is what keeps it private
 * in transit. It is the right weight for handing a study URL to a group; it is
 * not access control for anything sensitive. For per-person logins use
 * Cloudflare Access instead, which is free for up to 50 users.
 */

'use strict';

/* The security headers from _headers, repeated here because Cloudflare does NOT
 * apply _headers to any response that passes through a Pages Function — and with
 * this middleware in place, that is every response. Dropping this block would
 * silently un-set the CSP site-wide.
 *
 * Keep in sync with _headers, vercel.json and the meta tag in index.html.
 * scripts/check-csp-hashes.js fails the build if the script-src hashes drift
 * apart across the four. */
const SECURITY_HEADERS = {
  'Content-Security-Policy':
    "default-src 'self'; " +
    "script-src 'self' 'sha256-8PRl4GcVarXiKtZEOPI2t+MXQXNyZN9w9jzfkY4tUGw=' 'sha256-bWdLkvh2q041d4g8zaF7NPzpJpmyJqIjvBMfvQZ5woI='; " +
    "style-src 'self' 'unsafe-inline'; " +
    "font-src 'self'; " +
    "img-src 'self' data: blob:; " +
    "media-src 'self'; " +
    "connect-src 'self' https://*.workers.dev; " +
    "worker-src 'self';",
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=()',
  'Cross-Origin-Opener-Policy': 'same-origin',
};

const REALM = 'AAT Level 2 Practice';

/* Compare two strings without leaking, through timing, how much of a guess was
 * right. Hashing first means the comparison runs over two equal-length digests,
 * so the loop cannot terminate early on a length difference either. */
async function equals(a, b) {
  const encoder = new TextEncoder();
  const [x, y] = await Promise.all([
    crypto.subtle.digest('SHA-256', encoder.encode(a)),
    crypto.subtle.digest('SHA-256', encoder.encode(b)),
  ]);
  const xs = new Uint8Array(x);
  const ys = new Uint8Array(y);
  let diff = 0;
  for (let i = 0; i < xs.length; i++) diff |= xs[i] ^ ys[i];
  return diff === 0;
}

/* Split an "Authorization: Basic ..." header into its username and password.
 * Returns null if the header is absent or malformed rather than throwing, so a
 * junk header is answered with the same 401 as a missing one. */
function parseCredentials(header) {
  if (!header || !/^Basic /i.test(header)) return null;
  let decoded;
  try {
    /* atob yields one char per byte; re-decode as UTF-8 so non-ASCII passwords
       survive the round trip. */
    const binary = atob(header.slice(6).trim());
    const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
    decoded = new TextDecoder().decode(bytes);
  } catch (e) {
    return null;
  }
  /* Only the FIRST colon separates the two fields — a password may contain colons. */
  const separator = decoded.indexOf(':');
  if (separator === -1) return null;
  return { username: decoded.slice(0, separator), password: decoded.slice(separator + 1) };
}

function withSecurityHeaders(response) {
  /* Response headers from next() are immutable, so rebuild rather than mutate. */
  const out = new Response(response.body, response);
  for (const [name, value] of Object.entries(SECURITY_HEADERS)) out.headers.set(name, value);
  return out;
}

function challenge(message) {
  return new Response(message, {
    status: 401,
    headers: {
      /* charset="UTF-8" tells the browser how to encode what the user types,
         which is what makes a non-ASCII password work consistently. */
      'WWW-Authenticate': 'Basic realm="' + REALM + '", charset="UTF-8"',
      'Content-Type': 'text/plain; charset=utf-8',
      /* Never let a 401 be stored — by a CDN, a proxy, or the service worker. */
      'Cache-Control': 'no-store',
      ...SECURITY_HEADERS,
    },
  });
}

export async function onRequest(context) {
  const { request, env, next } = context;

  /* Fail CLOSED. If the password variable is missing the site stays shut rather
     than quietly publishing itself — a forgotten dashboard step should look like
     a broken deploy, not an open one. */
  if (!env.SITE_PASSWORD) {
    return new Response(
      'This deployment is not configured yet: set the SITE_PASSWORD variable in the ' +
      'Cloudflare Pages dashboard (Settings -> Variables and Secrets) and redeploy.',
      { status: 503, headers: { 'Cache-Control': 'no-store', ...SECURITY_HEADERS } }
    );
  }

  const credentials = parseCredentials(request.headers.get('Authorization'));
  if (!credentials) return challenge('Password required.');

  /* Always check the password, and the username only when one is configured.
     Both comparisons run before either is acted on, so a wrong username costs
     the same time as a wrong password. */
  const passwordOk = await equals(credentials.password, env.SITE_PASSWORD);
  const usernameOk = env.SITE_USERNAME
    ? await equals(credentials.username, env.SITE_USERNAME)
    : true;

  if (!passwordOk || !usernameOk) return challenge('Incorrect username or password.');

  return withSecurityHeaders(await next());
}
