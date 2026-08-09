# Progress sync endpoint

A Cloudflare Worker that stores one JSON progress document per sync key, so the
study app can keep a phone and a desktop in step without exporting and importing
a file by hand.

The app works completely without this. Sync is off until you deploy the Worker
and turn it on, and export/import stays available either way.

## What it costs

Nothing, on Cloudflare's free tier. That tier allows 100,000 Worker requests and
1,000 KV writes a day; normal use of this app is a few dozen of each. There is no
card required to deploy a Worker with a KV namespace.

## Deploying it

You need a free Cloudflare account and Node installed.

```bash
cd sync-worker
npx wrangler login                          # opens a browser to authorise
npx wrangler kv namespace create PROGRESS   # prints an id
```

Paste that id into `wrangler.toml`, replacing `PASTE_YOUR_NAMESPACE_ID_HERE`,
then:

```bash
npx wrangler deploy
```

Wrangler prints the URL it deployed to, of the form
`https://aat-progress-sync.<your-subdomain>.workers.dev`.

## Pointing the app at it

Edit `sync-config.js` in the repository root and set the endpoint to that URL:

```js
window.SYNC_ENDPOINT = 'https://aat-progress-sync.your-subdomain.workers.dev';
```

Commit and push. The Sync controls then appear under **Progress → Backup,
restore and sync**.

The app's Content-Security-Policy already permits `https://*.workers.dev`, so no
other change is needed. If you would rather narrow that to your exact
subdomain — worth doing, and a one-line change — edit `connect-src` in all three
places the policy is declared: the `<meta>` tag in `index.html`, `_headers`, and
`vercel.json`.

## Turning it on

On the first device, open **Progress**, choose **Set up sync**, and let it
generate a key. On the second device, open the same screen and paste that key in.
Both then pull, merge and push on open and whenever the app regains focus.

Keep the key somewhere you can find it. It is the only thing identifying your
data, there is no account to recover it from, and losing it means starting a new
sync document (your progress on each device is untouched — you would just be
re-pairing them).

## The security model, stated plainly

- Authentication is a single shared bearer key. There are no accounts and no
  passwords.
- **Anyone holding the key can read and write that progress.** Treat it like a
  password: do not paste it anywhere public.
- The key is never stored on the server. The KV entry is named after its
  SHA-256, so a dump of the namespace yields nothing that can be used to read
  anything.
- The stored data is study scores and lesson progress. It contains no name,
  email, or anything else identifying, and the Worker never logs the key or the
  body.
- Transport is HTTPS. Data is stored unencrypted at rest in KV, so Cloudflare
  can read it, in the same way any hosted database provider can.

## The API

| | |
|---|---|
| `GET /state` | `Authorization: Bearer <key>` → `{version, updatedAt, keys}`, or 404 when nothing is stored yet |
| `PUT /state` | `Authorization: Bearer <key>`, `If-Match: <version>`, body `{keys}` → `{version, updatedAt}` |

`If-Match` is required on every write. A write quoting a version that is no
longer current returns **409** with the current version — the client then
re-reads, merges again and retries. That check is the whole reason two devices
cannot silently overwrite one another: without it, two devices that both read
version 4 would both write version 5, and the second would erase the first.

## Running the tests

The Worker's request handling is covered by the repository's test suite:

```bash
npm run check:sync
```
