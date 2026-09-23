## Remove the "reference documentation" wording from the Document Chat tutorial

Only one place on the site has this wording: the second intro paragraph of "How to chat with documents in AmmarAI". No other tutorial mentions it.

**Change** (src/data/tutorials.ts, line 186), replacing it with:

"The steps below walk through the complete upload-and-chat workflow in AmmarAI, with a screenshot for each step."

This also removes the "shown without cropping or alteration" claim, which is no longer true because we edited the last image.

**Check:** search the site again for "reference documentation", "supplied by" and "original instructional", then load the tutorial page to confirm it looks right.
