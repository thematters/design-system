# Matters Background Prompt Recipe

Use this recipe for OpenAI Image API background generation. The generated image
should be a clean background or editorial illustration; final words, logos, and
layout are applied later by repo templates.

## Prompt Contract

Create a Matters-style editorial background image.

Visual direction:
- public writing community, long-form reading, thoughtful civic conversation
- modern digital commons, quiet but energetic
- confident use of Matters purple `#7258FF` and lime `#C3F432`
- enough black, white, or neutral space for Chinese text overlay
- elegant editorial composition, not a marketing stock image

Hard constraints:
- no readable text
- no logos or fake brand marks
- no UI screenshots
- no QR codes
- no watermark
- keep a clear text-safe area as specified by the job

Output should work under deterministic HTML/CSS typography and logo overlays.

