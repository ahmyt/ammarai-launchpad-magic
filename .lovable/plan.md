# Homepage 404 — verify the running bundle, not the source file

## Confirmed

- Your screenshot proves `src/routes/$slug.tsx` contains the new guard.
- I checked `https://ammarai.com/` again at 15:57 UTC. It still returns HTTP 404, 1,040,426 bytes, with the old asset `index-Dkzq8ect.js` and route state `$slug error_docs`.
- Therefore the updated source reached Plesk, but Passenger is still serving a previous compiled bundle.

## Next checks in Plesk

1. Run `npm run build` from the **application root** — the same folder containing `package.json` and `src/`.
2. Save the complete final build output. It must finish successfully and create a newly dated `dist/server/index.mjs`.
3. In File Manager, check the modification time of `dist/server/index.mjs`. It must be later than the `$slug.tsx` update shown in your screenshot.
4. In Node.js settings, confirm the startup file is exactly `dist/server/index.mjs`.
5. Click **Restart App** only after steps 1–4 are confirmed.

## If the build does not update `dist/server/index.mjs`

Use the server terminal in the application root:

```text
pwd
node -v
npm ci
npm run build
ls -l dist/server/index.mjs
```

Do not use Plesk's Git **Deploy now** as a substitute for `npm run build`; Git deployment copies source but does not guarantee the Node bundle is rebuilt.

## What I need if it still fails

Send screenshots of:

- The final 20–30 lines of the `npm run build` output.
- The modification time of `dist/server/index.mjs`.
- The Plesk Node.js screen showing the application root and startup file.

Those three items will identify whether the build failed, ran in the wrong folder, wrote elsewhere, or Passenger restarted from a different file.

## Verification

After the restart, I will check the live status, response content, and bundle name. Success means `/` immediately returns the homepage with HTTP 200; genuine missing pages continue returning 404.
