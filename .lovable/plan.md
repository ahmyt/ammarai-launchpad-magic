# Remove the production homepage 404 flash

## Confirmed diagnosis

- The Node.js values in the screenshot are internally consistent: production mode, application root `/ammarai.com`, application URL at the domain root, and startup file `dist/server/index.mjs`.
- The live server currently returns a real HTTP **404** for `https://ammarai.com/`, while `https://ammarai.com/ai-tools` returns **200**.
- HTTP and `www` redirects work normally. The fault is therefore limited to how Plesk handles the root `/` request before or while forwarding it to the Node application—not the site's page route or client-side navigation.
- The warning beside Document Root is a security recommendation. It does not by itself explain why only `/` fails.

## Plesk changes to verify

1. In **Node.js**, keep:
   - Application mode: `production`
   - Application URL: domain root `/`
   - Application root: `/ammarai.com`
   - Startup file: `dist/server/index.mjs`
2. In **Apache & nginx Settings** for `ammarai.com`:
   - Disable **Serve static files directly by nginx**.
   - Remove any custom nginx rule that handles `/`, `index`, or `error_docs` before the Node proxy.
3. In **Hosting Settings**:
   - Disable **Custom error documents** for this domain while testing.
4. Restart the Node.js application, then test in a private browser window.
5. Verify the server result—not only the visual page:
   - `/` must return HTTP 200 immediately.
   - `/ai-tools` and another deep page must remain HTTP 200.
   - Refreshing `/` must no longer show the temporary 404.

## If `/` still returns 404

Capture the domain's **Apache & nginx Settings** screen, especially the proxy/static-file controls and both custom-directive boxes. The remaining cause will be a domain-level routing directive or Plesk proxy rule, not the Node.js values shown here.

No Lovable project code changes are required for this diagnosis.
