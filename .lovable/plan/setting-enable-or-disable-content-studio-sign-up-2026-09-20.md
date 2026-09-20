# Setting: enable or disable content studio sign-up

Add a switch in CMS → Site settings that controls whether new people can create an account on the sign-in page (/auth).

## What changes

- New setting: **Allow new content studio accounts** (default: off).
- When off, the sign-in page shows only the sign-in form and Google sign-in. The "Need an account? Sign up" link and the create-account form are hidden.
- When on, the page behaves exactly as today.
- Existing accounts and signing in are never affected.

## Important note

Hiding the sign-up form stops it in the browser, but it does not stop someone technical from calling the account-creation endpoint directly. For a hard block I will also turn off self-service sign-ups in the backend auth configuration, so the setting and the backend agree when it is off. If you later switch the setting on, I will need to re-enable sign-ups in the backend at the same time — I will note that in the field label.

## Technical details

- `src/data/types.ts`: add `allowCmsSignup?: boolean` to the settings page type.
- `src/data/pages.ts`: add `allowCmsSignup: false` to the settings record defaults (CMS values merge over these via `src/lib/content.ts`).
- `src/lib/cms-fields.ts`: add a boolean field `allowCmsSignup`, label "Allow new content studio accounts (sign-up)", to `pageSettingsFields`.
- `src/routes/auth.tsx`: read the settings page the same way other routes do; gate the mode toggle button and force `mode = "signin"` when the flag is false; guard `submit` so signup can't run when disabled.
- Backend: disable self-service email sign-ups in auth configuration to match the default-off state.
- Verify: build clean, /auth shows no sign-up affordance with the setting off, and shows it again when switched on.
