import type { Example, Faq } from "./types";

// Original catalogue prompts; keep this route-local data out of the shared startup bundle.
export const videoProExamples: Example[] = [
      {
        label: "The Paper Puppet Wave Dance",
        input:
          "Create one uninterrupted video of a brightly coloured paper-mâché puppet performing an energetic wave dance. Keep the handmade puppet as the only subject and make its rippling arm movements, shifting posture and playful rhythm the focus of the scene. Preserve the tactile paper texture, bold painted colours and simple fabric backdrop throughout.",
        output:
          "A lively handcrafted-character performance with fluid wave-inspired movement, vivid colour and a clear uninterrupted dance routine.",
      },
      {
        label: "The Octopus Librarian",
        input:
          "Create a cinematic continuous shot of an intelligent octopus absorbed in an open antique book inside a grand, shadow-filled library. Let its tentacles curl naturally around the lectern and nearby volumes while a restrained red glow reveals the shelves, marble columns and glass vessels. Keep the mood mysterious, the camera movement subtle and the creature's reading behaviour believable.",
        output:
          "An atmospheric fantasy-library scene with convincing tentacle motion, rich environmental detail and controlled crimson lighting.",
      },
      {
        label: "Red Panda's Tea-House Discovery",
        input:
          "Create a cinematic 3D animated short about an inquisitive red panda discovering a tiny tea house deep in a mossy forest at sunrise. Track beside it across a wooden footbridge, then settle at eye level as it finds a steaming ceramic cup on the veranda. The panda investigates the steam, sits with its ringed tail around its paws and watches one maple leaf float past. Use believable animal motion, tactile fur and timber, warm natural colour and one gentle continuous camera move. Add only stream water, birds and soft pawsteps—no speech, music, titles, logos or familiar characters.",
        output:
          "A richly detailed woodland character moment with a clear visual story, restrained camera movement and natural environmental sound.",
      },
      {
        label: "A Night at the Concert Hall",
        input:
          "Create an elegant stylised animated scene of an elderly couple arriving at a grand concert hall on a rain-polished evening. Keep the camera locked in a balanced wide composition as they approach beneath warm entrance lights, pause at the programme board and greet each other with quiet excitement. Preserve the exact framing throughout with no zoom or push-in.",
        output:
          "A composed, warmly lit arrival scene whose character movement carries the emotion while the camera remains completely still.",
      },
      {
        label: "The Perfect Morning Espresso",
        input:
          "Film an extreme macro of dark espresso streaming from a polished steel portafilter into an ivory cup. Let amber crema spread in slow motion while fine steam crosses a narrow beam of morning window light. Use realistic liquid detail, very shallow focus and a barely perceptible forward camera drift. Sound should contain only the soft pour and distant cafe ambience, with no dialogue, music, branding or text.",
        output:
          "A photoreal specialty-coffee commercial shot with convincing crema, delicate steam and a premium morning atmosphere.",
      },
      {
        label: "Her First Painting Class",
        input:
          "Create a bright, expressive 3D animated short of a young woman arriving for an afternoon painting lesson. She enters a sunlit studio, chooses an easel, mixes vivid colours and begins her first confident brushstroke. Use warm handcrafted character animation, inviting art-room detail and gentle, playful movement.",
        output:
          "A cheerful animated studio sequence that moves naturally from arrival to the first brushstroke.",
      },
      {
        label: "Duel in the Cavern",
        input:
          "Stage two martial artists trading a rapid, precisely choreographed series of strikes inside a rugged stone cavern. Each impact lifts dust through strong shafts of daylight. Keep both fighters fully readable in the same fixed wide composition; do not zoom, dolly or push the camera forward.",
        output:
          "A fast, legible action beat with dynamic dust and lighting while the camera holds its original framing.",
      },
      {
        label: "Football Rivals at Hot Pot",
        input:
          "Create a photoreal comedic food short featuring Cristiano Ronaldo and Lionel Messi sharing a fiercely bubbling Sichuan hot pot in a traditional Chengdu restaurant. They compete playfully with chopsticks, react to the intense spice and laugh beneath glowing red lanterns. Use polished live-action detail, expressive timing and rich restaurant ambience in a concise 15-second scene.",
        output:
          "A playful celebrity-style dining scene with vivid food detail, clear reactions and polished comedic pacing.",
      },
      {
        label: "The Great Bank Escape",
        input:
          "Create a clearly fictional, over-the-top comedy chase in which a movie character bursts from an imaginary city bank carrying prop cash as police cars arrive behind him. Keep the tone absurd and cinematic rather than realistic, with energetic handheld movement, exaggerated reactions and a clean getaway punchline. Do not show instructions, real bank branding or harm.",
        output:
          "A fast fictional heist-comedy sequence with prop money, an exaggerated police pursuit and a clear visual punchline.",
      },
      {
        label: "Sunday Lunch Together",
        input:
          "Create a warm 3D animated family scene of two grandparents having lunch with their grandchildren. Serve roast chicken and potatoes with glasses of water, and focus on affectionate conversation, shared smiles and small natural gestures around the table. Use soft afternoon light, appealing original character design and a welcoming home atmosphere.",
        output:
          "A gentle family meal filled with expressive character moments, comforting food and warm afternoon light.",
      },
      {
        label: "The Coffee Surprise",
        input:
          "Shoot a widescreen live-action comedy reel in a bright home kitchen. A sleepy woman drops an unexpected ingredient into her coffee, takes one cautious look, then reacts with wide-eyed disbelief before trying to rescue the drink. Keep the edit quick, the performance natural and the final reaction strong enough to work as a social-media punchline.",
        output:
          "A compact kitchen mishap with a clear setup, escalating reaction and an instantly readable comedic ending.",
      },
      {
        label: "Mobile App Product Explainer",
        input:
          "45-second explainer for a scheduling app. Hook: the double-booking problem. Three benefits. CTA: free trial. Vertical, upbeat voice, captions on.",
        output:
          "A 9:16 cut with a four-second hook, three visual beats, a warm mid-paced voiceover and high-contrast captions timed to the read.",
      },
      {
        label: "Mobile App Campaign Ad",
        input:
          "Same script, three punchy opening hooks. Kinetic captions, fast jump cuts, warm brand palette, 16:9 and 9:16.",
        output:
          "Six polished ad cuts — three hooks in two ratios — with animated captions and matching pacing, ready to run against each other.",
      },
      {
        label: "Molten Gold Beauty Film",
        input:
          "Extreme macro, slow motion: a drop of molten gold falls into a black mirror pool and blooms into a glowing crown of light. Deep black background, cinematic rim light, slow push in. 5 seconds.",
        output:
          "A premium hero clip generated from the prompt alone, ready to open an ad or a launch title card.",
      },
      {
        label: "Neon Tokyo Night Ride",
        input:
          "Cinematic hyperlapse gliding through a rain-slick neon Tokyo street at night, reflections in the asphalt, light trails, teal and magenta grade, anamorphic flares. 5 seconds.",
        output:
          "Scroll-stopping B-roll that would otherwise need a location shoot, generated from one line of text.",
      },
    ];

// Guidance follows the verified how-to-use-ai-video-pro tutorial, not legacy assembly claims.
export const videoProSteps = [
  { title: "Choose your starting point", body: "Open AI Video Pro and choose text-to-video for a written scene, or image-to-video to animate a still image." },
  { title: "Select an available model", body: "Check the source types and controls supported by the model shown in your workspace. Model variants can differ in quality, speed and audio support." },
  { title: "Describe the shot", body: "Write the subject, action, setting, camera movement and lighting in one clear paragraph. For image-to-video, upload your source and describe the motion you want." },
  { title: "Set duration and output size", body: "Choose the settings offered by the selected model. Start with the shortest duration while testing. Where a reference image is used, match its dimensions to the requested output size." },
  { title: "Generate, review and download", body: "Review motion, subject consistency and framing before using the clip. Refine the prompt and generate again if faces, products or fine details change unexpectedly." },
];

export const videoProWorkflows = [
  { title: "Product demo clip", body: "Start with an authorised product photo and a simple motion brief. Generate a short shot, then check that packaging, shape and fine details still represent the actual product." },
  { title: "Social campaign variants", body: "Keep the subject consistent while testing different openings, camera moves or lighting. Choose a supported output size for the intended platform and compare the resulting clips." },
  { title: "Storytelling and B-roll", body: "Describe one visual beat at a time. Generate and review short scenes, then bring the selected clips into AI Video Editor when you need to assemble a longer piece." },
];

export const videoProTips = [
  "Use image-to-video when the starting composition, product or character matters; use text-to-video for a new scene.",
  "Keep motion simple and physically plausible for a cleaner first result.",
  "Describe subject, action, setting, camera and light rather than relying on a vague style label.",
  "Test at the shortest available duration before committing to a longer generation.",
  "Use your own authorised photos where possible, and review product details before publishing.",
  "Add important typography afterwards rather than depending on generated on-screen text.",
];

export const videoProMistakes = [
  "Requesting too many actions or camera changes in one short shot.",
  "Uploading a reference image that does not match the requested output dimensions.",
  "Assuming all models offer the same duration, resolution, aspect ratios or audio.",
  "Publishing without checking faces, hands, text and other fine details between frames.",
  "Using source images or likenesses without authorisation.",
];

export const videoProFaqs: Faq[] = [
  { q: "What is AI Video Pro?", a: "AI Video Pro generates short video clips from a written scene description or a source image. Choose an available model, adjust its supported settings, then generate, review and download the result." },
  { q: "Can I animate my own images?", a: "Yes. Choose image-to-video, upload an authorised source image and describe the motion you want. When using a reference image for the documented generation action, its dimensions must match the requested output size." },
  { q: "How long can the generated videos be?", a: "Duration depends on the selected model and the options available in your workspace. Start with the shortest option to test a prompt; use separate clips and an editor for a longer piece." },
  { q: "Which resolutions and aspect ratios are available?", a: "Select from the output sizes and aspect ratios offered by the chosen model. Vertical sizes suit Reels, Shorts and TikTok; landscape suits YouTube and website embeds. Supported settings can vary by plan and availability." },
  { q: "Does every model generate audio?", a: "No universal audio support is promised. Model variants differ in whether audio is generated alongside the picture; check the option label. Use the separate voice and caption tools when preparing narration or subtitles." },
  { q: "How can I improve the result?", a: "Describe one clear subject and action, include camera and lighting details, and keep movement physically plausible. Review every clip for motion, subject consistency, framing and unwanted visual changes." },
  { q: "How is AI Video Pro different from AI Video Agent?", a: "AI Video Pro generates motion scenes from prompts or images. AI Video Agent is the separate brief-to-presenter video workflow with avatar, voice and storyboard choices." },
  { q: "What should I check before publishing?", a: "Generated motion can alter faces, hands, products, text and fine details. Check every clip, especially when it represents a real product or person, and use only images and likenesses you are authorised to process." },
];
