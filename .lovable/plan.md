# Make AI Social Media Publisher easy to find

The page exists and is live: /ai-social-media-publisher returns fine, and its card shows on the Tools page under the "AI Social Media" filter and when searching its name. So nothing is missing — it is just hard to spot among 150 cards, and it does not come up for the words people would actually type ("schedule posts", "post to LinkedIn", "content calendar").

## What I'll change

1. **Search wording** — add a scheduling/publishing group to the tool search so "schedule posts", "post calendar", "publish to LinkedIn", "queue posts", "X / Twitter post" and similar bring up AI Social Media Publisher first, alongside the social agent and post-writing tools.
2. **Cross-links** — list it as a related tool on the pages people arrive at first: AI Social Media Agent, Facebook Post Generator, Instagram Reel Script Generator, and the LinkedIn/X post templates. Today none of them point to it.
3. **Recently added row** — it is already flagged as recent, so it will appear in the "recently added" set on the tools directory; I'll confirm that row is actually rendered and visible, and fix it if it is not.

Nothing else changes: no redesign, no renaming, no new categories, and tutorials are untouched.

## Technical notes

- Add one entry to `intentMap` in `src/data/tools.ts` with the scheduling/publishing keywords and slugs `ai-social-media-publisher`, `ai-social-media-agent`, `facebook-post-generator`.
- Append `ai-social-media-publisher` to the `related` arrays of the named tool records in `src/data/tools-agents.ts` and the social template files.
- Verify `recentTools` output and its usage on the directory page; adjust only the rendering if the row is missing.
- Verification: `bunx tsgo --noEmit`, build check, and a Playwright pass at 1440 and 390 px confirming the card appears under the "AI Social Media" filter, is returned by the new search phrases, and the detail page returns 200 with no console errors.
