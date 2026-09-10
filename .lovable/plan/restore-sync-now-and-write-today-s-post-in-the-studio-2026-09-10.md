# Restore "Sync now" and "Write today's post" in the studio

## What's happening

The two buttons still exist on the **Synced articles** page of the studio, but they only appear for admin accounts. Right now the site cannot read anyone's access level, so even your admin account is treated as a normal user and the whole Synced articles tab stays hidden.

Two separate causes, both confirmed:

1. The access-level table has no read permission granted to signed-in users, so the site always sees "no roles" — verified: zero grants exist on that table.
2. Your Google account (the one you signed in with a few minutes ago) has no admin access recorded; only the email/password account `ahmed@atntechnology.net` does.

## Fix

1. Grant signed-in users permission to read the access-level table (and full access for backend/service code). Existing security rules already restrict each person to their own row, so this does not expose anyone else's data.
2. Give admin access to the Google account as well, so signing in either way lands you in the studio with full rights.
3. Reload the studio and confirm the **Synced articles** tab appears with the auto-sync selector, **Write today's post** and **Sync now** buttons.

## Technical detail

- Migration: `GRANT SELECT ON public.user_roles TO authenticated;` and `GRANT ALL ON public.user_roles TO service_role;` (RLS policies `Users can read their own roles` and `Admins manage roles` already exist and stay unchanged).
- Insert an `admin` row in `public.user_roles` for the Google-provider user, idempotent via the existing `unique (user_id, role)` constraint.
- No frontend changes: `src/hooks/useAuth.ts`, `src/routes/admin.tsx` and `src/routes/admin.articles.tsx` already implement the sync interval, `syncBabyLoveGrowthArticles` and `writeDailyBlogPost` actions.
- Note: "Write today's post" runs against OpenAI, which is keyed only in the Plesk environment, so that button will work on the live site rather than in the preview.
