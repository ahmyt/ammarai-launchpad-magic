# Fix the locked Plesk root-route 404

## Confirmed

- Your Node app is running: deep pages such as `/ai-tools` return HTTP 200 through Passenger.
- Only the homepage `/` returns HTTP 404, and Plesk internally replaces it with `/error_docs` before the app displays the temporary not-found page.
- Since **Custom error documents** and **Apache & nginx Settings** are unavailable, this cannot be corrected from those locked controls.

## Next configuration change

1. Keep Application Root as `/ammarai.com`.
2. Keep Application URL at the domain root.
3. Keep startup file `dist/server/index.mjs`.
4. Change Document Root from the application root to the app's public client-output subdirectory, matching the exact build output present on the server.
5. Restart the Node application and confirm `/` returns HTTP 200 immediately while deep pages still work.

## If the document root cannot be changed or the 404 remains

Ask the hosting provider to route the domain root `/` to the existing Passenger Node application and disable the domain's internal `/error_docs` interception. Include this evidence:

- `GET https://ammarai.com/` returns 404 and reaches the app as `/$slug/error_docs`.
- `GET https://ammarai.com/ai-tools` returns 200.
- Passenger is running successfully, so this is a domain-root proxy mapping issue rather than an application crash.

No application route, redirect, or sitemap change should be added to hide the server-level 404.
