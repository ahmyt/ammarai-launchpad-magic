# Verify the next daily-writer post on the live site

## Check after publication
- Open the next article created automatically by the daily writer on ammarai.com.
- Confirm its table of contents uses the new outlined panel, uppercase label, and zero-padded numbering.
- Test that long titles wrap cleanly and that every contents link jumps to the correct section.
- Check the same article on mobile and desktop for horizontal overflow or visual errors.
- Confirm the FAQ remains collapsible and the recommended articles and tools sections still appear.

## Timing and dependency
The updated writer must first be deployed and the Plesk app restarted. Verification can happen after the next scheduled daily article is published; if no new article exists yet, the check remains pending until publication.

## Technical details
The daily writer now emits the new ordered-list markup for all future posts. The live check will compare the published article markup and presentation against the version already verified in preview.
