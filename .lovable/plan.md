# Stop audio samples switching before playback finishes

## What will change
- Keep an audio sample selected while its player is visible instead of advancing it on the current automatic timer.
- Let visitors play, pause, seek, and finish the complete recording without the page switching to another option.
- Keep the sample option buttons available so visitors can move to another recording whenever they choose.
- Preserve the existing automatic presentation for text, image, video, code, and workflow samples.

## Why
The shared sample viewer currently gives every audio option a fixed 12-second display period, followed by a short completion pause. The two phone recordings are about 85–91 seconds, so the viewer changes options long before playback can finish.

## Verification
- Play each AI Phone Agent recording past the former switch point and confirm the selected option does not change.
- Confirm each recording can play through to its natural end.
- Confirm manually switching options stops the previous recording and loads the selected one.
- Check another voice/audio tool to ensure the same protection applies consistently.
- Confirm mobile layout, download blocking, and the project build remain correct.

## Technical details
Adjust the shared animated sample viewer so audio output is user-controlled and does not enter the timed auto-advance path. Keep all non-audio timing behavior unchanged.
