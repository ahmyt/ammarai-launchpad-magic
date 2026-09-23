# Replace the liquidthemes.com link in the AI Chat Pro tutorial image

## What I found

- The link lives inside the screenshot `public/media/tutorials/tutorial-ai-chat-pro-5.png` — the final step image of the "How to use AI Chat Pro" tutorial.
- The assistant bubble in that screenshot quotes `https://liquidthemes.freshdesk.com/support/tickets/new` (and mentions "Freshdesk"). It is baked into the picture, not text on the page, so it needs an image edit.
- No other tutorial image or page text contains "liquidthemes" — I will confirm this with a scan of all tutorial images before finishing.

## The fix

1. Edit `tutorial-ai-chat-pro-5.png` in place: paint over the quoted link line (and the "Freshdesk" wording in the sentence above it) with the card's background color, then redraw the line as `https://ammarai.com` in a matching font, size and dark-gray color so it looks native to the screenshot.
2. Leave everything else in the image untouched — the file name chip, layout and red-free design stay as they are.
3. Scan the remaining tutorial images for any other "liquidthemes" / "freshdesk" text and report if any others need the same treatment.

## Checks

- View the edited image to confirm the new link reads cleanly and nothing else shifted.
- Confirm the tutorial page still renders the image correctly in the preview.
