/* Where the progress sync endpoint lives.
 *
 * Leave this empty and sync simply does not exist: no controls appear, no
 * requests are made, and the app behaves exactly as it did before sync was
 * added. Export and import still work either way.
 *
 * To turn it on, deploy the Worker in sync-worker/ (its README has the four
 * commands) and put the URL wrangler prints here — no trailing slash:
 *
 *   window.SYNC_ENDPOINT = 'https://aat-progress-sync.your-subdomain.workers.dev';
 *
 * It must be https. The Content-Security-Policy already allows
 * https://*.workers.dev; anywhere else needs `connect-src` widened in all three
 * places the policy is declared — the meta tag in index.html, _headers, and
 * vercel.json.
 */
window.SYNC_ENDPOINT = '';
