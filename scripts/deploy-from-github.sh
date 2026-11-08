#!/usr/bin/env bash
# Deploy AmmarAI on Plesk straight from GitHub.
# Run over SSH from the app's root directory (the folder that contains package.json):
#   bash scripts/deploy-from-github.sh
set -euo pipefail

echo "==> Pulling the latest code from GitHub (main)"
git pull origin main

echo "==> Ensuring Node is available (nodenv on Zap Hosting / Plesk)"
export PATH="$HOME/.nodenv/shims:$HOME/.nodenv/bin:$PATH"
node -v
npm -v

echo "==> Installing dependencies"
npm install

echo "==> Building the production server bundle (dist/server/index.mjs)"
# VITE_* env vars must already exist in the environment or .env —
# they bake into the client bundle at build time.
npm run build

test -f dist/server/index.mjs || { echo "BUILD FAILED: dist/server/index.mjs missing"; exit 1; }

# A development build (e.g. `npm run build:dev`, or Plesk "Application mode:
# Development") ships React's slow debug code and source annotations, which
# makes every page several times slower. Refuse to go live with one.
if grep -rqs "data-tsd-source" dist/public/assets/ dist/client/assets/ 2>/dev/null; then
  echo "BUILD FAILED: this is a development build. Run 'npm run build' (not build:dev)"
  echo "and set Plesk -> Node.js -> Application mode to Production."
  exit 1
fi

echo "==> Asking Passenger to restart the app"
mkdir -p tmp
touch tmp/restart.txt

echo "==> Done. If the site shows a 500, in Plesk use Disable Node.js, then"
echo "    Enable Node.js, then Restart App once more."
