import type { Tool } from "./types";

export const coreToolsB: Tool[] = [
  {
    slug: "ai-avatar-generator",
    name: "AI Avatar Video Generator",
    category: "AI Video",
    summary:
      "Turn any image into a talking avatar video with realistic lip-sync and natural expressions. Ideal for product explainers, social content, training videos, and personal branding.",
    title: "AI Avatar Video Generator: Talking Avatar Videos | AmmarAI",
    description:
      "Turn any image into a talking avatar video with realistic lip-sync and natural expressions. Ideal for product explainers, social content, training videos and personal branding.",
    h1: "Create professional animated talking videos",
    lede: "Bring your visuals to life with AI-powered avatar talking videos. Turn any image or video into an engaging animated clip by adding your script or voice, with realistic lip-sync and natural facial expressions.",
    ctaLabel: "Create a talking avatar",
    featured: true,
    what: [
      "The AI Avatar Video Generator turns a still image or an existing video into an animated talking clip. You supply a face — a photo, an illustrated character, a product mascot or a frame from footage — then add a script or an audio recording, and the AI animates the mouth, jaw and face so the delivery reads as natural speech rather than a pasted-on effect.",
      "You can start from your own upload or pick from hundreds of avatar image and video templates covering presenters, spokespeople, educators, customer-service faces and stylised characters. Type a script and the platform can voice it for you, or upload your own voiceover and the avatar will match it line for line.",
      "The output is a finished, attention-grabbing video suited to marketing, education, social media, onboarding, product explainers, announcements and localisation — produced in minutes without a camera, studio, lighting or on-screen talent.",
    ],
    canDo: [
      "Turn a single photo into a talking presenter video",
      "Animate an existing video clip so the subject speaks a new script",
      "Generate speech from a typed script, or lip-sync to your uploaded voice recording",
      "Choose from hundreds of avatar image and video templates",
      "Produce realistic lip-sync with natural facial expression and head movement",
      "Create the same message in multiple languages with matching mouth movement",
      "Batch out variants of an ad, lesson or announcement from one avatar",
    ],
    how: [
      {
        title: "Choose your avatar",
        body: "Upload a photo or video of the face you want to use, or pick one of the ready-made avatar image and video templates.",
      },
      {
        title: "Add your script or voice",
        body: "Type the script and select a voice, or upload an existing voiceover or audio file to drive the performance.",
      },
      {
        title: "Generate the talking video",
        body: "The AI aligns mouth shapes to the audio and adds natural blinks, micro-expressions and head motion.",
      },
      {
        title: "Review and export",
        body: "Watch the clip at full size, adjust pacing or script if a line lands awkwardly, then export for your channel.",
      },
    ],
    examples: [
      {
        label: "Product launch announcement",
        input:
          "Upload a founder headshot. Script: a 45-second announcement of a new feature, warm and direct tone, generated voice.",
        output:
          "A talking-head clip of the founder delivering the announcement with accurate lip-sync, ready for LinkedIn and the product page.",
      },
      {
        label: "Localised course lesson",
        input:
          "Template presenter avatar, uploaded Spanish voiceover of an existing English lesson script.",
        output:
          "The same presenter delivering the lesson in Spanish, with mouth movement matched to the new audio.",
      },
    ],
    capabilities: [
      {
        title: "Realistic lip-sync",
        body: "Mouth shapes are aligned to the phonemes in your audio, so speech reads as spoken rather than mimed.",
      },
      {
        title: "Natural facial expression",
        body: "Blinks, brow movement and small head motion keep the avatar from looking frozen between lines.",
      },
      {
        title: "Image or video sources",
        body: "Animate a still portrait, an illustrated character, or a subject inside existing footage.",
      },
      {
        title: "Template library",
        body: "Hundreds of avatar image and video templates for presenters, spokespeople, educators and stylised characters.",
      },
      {
        title: "Script or voice input",
        body: "Generate the voice from text, or drive the performance with your own recording.",
      },
    ],
    audiences: [
      {
        who: "Marketing teams",
        why: "Ship spokesperson ads and announcements without booking a shoot or on-screen talent.",
      },
      {
        who: "Educators and course creators",
        why: "Give every lesson a consistent presenter and re-record instantly when the script changes.",
      },
      {
        who: "Social media creators",
        why: "Publish daily talking-head content without appearing on camera.",
      },
      {
        who: "Support and product teams",
        why: "Turn onboarding and help articles into short explainer videos people actually watch.",
      },
    ],
    useCases: [
      {
        title: "Spokesperson ad variants",
        body: "Generate five script variations from one avatar and test which hook holds attention longest.",
      },
      {
        title: "Training and onboarding",
        body: "Convert written SOPs into short presenter videos, then update a clip by editing the script instead of reshooting.",
      },
      {
        title: "Multilingual campaigns",
        body: "Keep the same presenter across markets by swapping the audio track and regenerating the lip-sync.",
      },
    ],
    tips: [
      "Use a clear, front-facing source image with an unobstructed mouth for the cleanest lip-sync.",
      "Write scripts the way people speak: short sentences, natural pauses, no dense clauses.",
      "Keep clips under about 90 seconds; attention drops fast on talking-head formats.",
      "Clean audio matters more than the image — noisy voiceovers produce shaky sync.",
      "Only animate faces you have the right to use, and label synthetic presenters where the platform requires it.",
    ],
    mistakes: [
      "Uploading a heavily angled, low-resolution or partially covered face and expecting accurate mouth movement.",
      "Feeding in a script written for reading rather than speaking, which makes delivery sound stilted.",
      "Publishing without watching the full clip at full size to catch sync drift at the end of long takes.",
    ],
    faqs: [
      {
        q: "What can I use as the avatar?",
        a: "A photo, an illustrated character, a product mascot or an existing video clip. You can also choose from hundreds of built-in avatar image and video templates.",
      },
      {
        q: "Do I need to record a voiceover?",
        a: "No. You can type a script and pick a generated voice, or upload your own recording if you prefer your real voice.",
      },
      {
        q: "Can the avatar speak other languages?",
        a: "Yes. Supply the script or audio in the target language and the lip-sync is matched to that audio.",
      },
      {
        q: "Can I animate a real person's face?",
        a: "Only with their permission. Do not create talking videos of public figures or anyone who has not consented.",
      },
      {
        q: "How long can a talking video be?",
        a: "Short clips give the most reliable sync. Longer scripts work best split into segments and joined in your editor.",
      },
    ],
    related: [
      "ai-video-generator",
      "ai-image-to-video",
      "ai-voice-generator",
      "ad-script-generator",
    ],
  },

  {
    slug: "ai-image-to-video",
    name: "AI Image to Video",
    category: "AI Video",
    summary:
      "Animate a still image into a short clip with camera movement and controlled motion.",
    title: "AI Image to Video: Animate Any Still Image | AmmarAI",
    description:
      "Turn a photo or generated image into a short animated clip with camera moves and subtle motion. Ideal for social and ads.",
    h1: "Give a still image somewhere to go",
    lede: "Upload a photo or a generated still, describe the movement you want, and get a short clip with real camera motion instead of a static frame.",
    ctaLabel: "Animate an image",
    recent: true,
    what: [
      "Image to Video takes an existing still and produces a short animated clip from it. You control the movement: a slow push in, a lateral drift, a parallax separation between subject and background, or subtle motion within the scene such as drifting steam or moving water. The source image stays recognisably itself, which is the whole point.",
      "This is the counterpart to text-to-video, and the difference matters. Text-to-video invents the entire shot from a description, so you cannot predict exactly what appears. Image to video starts from an image you have already approved, which makes it far more reliable for brand work: your product photo, your generated hero image, your team portrait.",
      "The realistic ceiling is a few seconds of convincing motion. Short pushes and drifts look excellent. Large movements, complex human motion and long durations are where artefacts appear, so the craft is choosing small, deliberate movement.",
    ],
    canDo: [
      "Add camera moves such as push in, pull out, pan and tilt to a still",
      "Create parallax depth between a subject and its background",
      "Animate ambient elements like smoke, water, cloth or light",
      "Turn a static product photo into a scroll-stopping social clip",
      "Produce a moving background plate for a text-led video",
      "Generate several motion variants of the same approved image",
    ],
    how: [
      {
        title: "Start with a strong still",
        body: "The clip inherits everything from the source. A well-composed image with clear depth animates far better than a flat, cluttered one.",
      },
      {
        title: "Describe one movement",
        body: "Pick a single motion: \"slow push in on the subject, background drifts slightly\". Combining several movements is where clips fall apart.",
      },
      {
        title: "Set duration honestly",
        body: "Three to five seconds is the sweet spot. Ask for twelve and you will usually see the model run out of ideas.",
      },
      {
        title: "Review at full size",
        body: "Watch for warping at edges and around faces or hands, then regenerate with a smaller movement if needed.",
      },
    ],
    examples: [
      {
        label: "Product hero",
        input:
          "Uploaded: studio photo of a matte black sneaker. Motion: hover and rotate slowly, light sweeps across the surface, smoke drifts underneath, gentle push in. 5 seconds.",
        output:
          "A premium rotating hero shot from one photo — no turntable, no studio, no re-shoot.",
      },
      {
        label: "Landscape parallax",
        input:
          "Uploaded: sunrise mountain photo. Motion: slow aerial drift forward, mist rolling between ridges, real depth separation between foreground and distant peaks. 5 seconds.",
        output:
          "A cinematic establishing shot with genuine parallax, cut from a single still frame.",
      },
    ],
    capabilities: [
      {
        title: "Directed camera movement",
        body: "Specify the move rather than accepting whatever motion the model invents.",
      },
      {
        title: "Depth-aware parallax",
        body: "Foreground and background separate convincingly, which is what makes a still feel three-dimensional.",
      },
      {
        title: "Ambient animation",
        body: "Bring life to specific elements while the rest of the frame holds still.",
      },
      {
        title: "Ratio-preserving output",
        body: "Animate in the ratio the still was composed for, so nothing important is cropped away.",
      },
    ],
    audiences: [
      {
        who: "Social media managers",
        why: "Convert an existing image library into motion content without shooting anything new.",
      },
      {
        who: "E-commerce teams",
        why: "Give catalogue photography movement for ads and product pages.",
      },
      {
        who: "Video editors",
        why: "Produce B-roll and establishing plates from stills when there is no footage available.",
      },
      {
        who: "Marketers running ads",
        why: "Motion creative typically earns more attention in feeds than a static frame.",
      },
    ],
    useCases: [
      {
        title: "Static library to motion library",
        body: "Take the ten strongest images you already own, animate each with a small deliberate move, and you have a month of motion posts.",
      },
      {
        title: "Ad opener",
        body: "Animate the hero product shot for the first three seconds, then cut to the text-led body of the ad.",
      },
      {
        title: "Generated still to clip",
        body: "Create an image in AI Image Pro, approve the composition, then animate it here so the campaign visual moves.",
      },
    ],
    tips: [
      "Choose images with obvious depth: a clear subject, a distinct background, and space between them.",
      "Smaller movements look more expensive. Slow beats dramatic almost every time.",
      "Avoid animating tight shots of faces and hands, where artefacts are most visible.",
      "Generate a few short variants and pick, rather than requesting one long clip.",
      "Keep the first and last frames usable as stills so the clip can also serve as a poster image.",
    ],
    mistakes: [
      "Asking for several simultaneous movements in one clip.",
      "Animating a low-resolution or heavily compressed source image.",
      "Requesting long durations and accepting the drift that comes with them.",
      "Using it where text-to-video would be better, namely when you have no source image at all.",
    ],
    faqs: [
      {
        q: "How is this different from text to video?",
        a: "Text to video invents the shot from a written description. Image to video animates a still you already have, so the content of the frame is predictable and on brand.",
      },
      {
        q: "How long can the clips be?",
        a: "Short by design, typically a handful of seconds per generation. Longer sequences are best built by assembling several clips in the video generator.",
      },
      {
        q: "Can I animate my own photos?",
        a: "Yes, and that is often the best use. Your real product and location photography animates into far more credible content than generated footage.",
      },
      {
        q: "Will the image stay exactly the same?",
        a: "The composition and subject stay recognisable, but fine detail can shift as the frame moves. Small movements preserve the original best.",
      },
    ],
    related: [
      "ai-image-generator",
      "ai-video-generator",
      "ai-avatar-generator",
      "ad-script-generator",
    ],
  },
  {
    slug: "ai-code-generator",
    name: "AI Code Generator",
    category: "AI Code",
    summary:
      "Generate code in multiple languages from natural language descriptions — functions, components, queries and tests, with explanations you can review.",
    title: "AI Code Generator: Functions, Tests and Queries | AmmarAI",
    description:
      "Generate code in multiple languages from natural language descriptions: functions, components, SQL, tests and scripts, with explanations included.",
    h1: "Code you can read, review and defend in a pull request",
    lede: "Describe the behaviour you need and get an implementation with the reasoning attached, from a single function to a component, a query or a test suite.",
    ctaLabel: "Generate code",
    popular: true,
    what: [
      "AI Code Generator produces code from a described requirement. It works best at the unit a developer thinks in: a function, a component, a migration, a query, a script, a test file. You state the language, the framework, the inputs and outputs and the edge cases, and it returns an implementation together with an explanation of the choices it made.",
      "The explanation matters more than the code. Generated code that you cannot review is a liability, so the tool is built around producing something legible: named variables, obvious control flow, comments where behaviour is non-obvious, and an honest note when an approach has trade-offs.",
      "It does not know your codebase unless you show it. Paste the surrounding types, the existing helper, the schema or the failing test and the output stops being generic. Without that context you get textbook code that ignores your conventions.",
    ],
    canDo: [
      "Write functions, classes, components and utilities in common languages",
      "Generate SQL queries and schema migrations from a described data need",
      "Produce unit tests, including edge cases you may not have listed",
      "Explain unfamiliar code line by line",
      "Convert code between languages or frameworks",
      "Refactor a working but ugly implementation and say what changed",
      "Draft regular expressions, shell scripts and configuration files",
    ],
    how: [
      {
        title: "Specify like a ticket",
        body: "Language, framework version, inputs, outputs, error behaviour and constraints. \"TypeScript, no dependencies, must handle empty arrays and reject negative input\" produces usable code.",
      },
      {
        title: "Paste real context",
        body: "Include the types, the interface it must satisfy, or the neighbouring function whose style it should match.",
      },
      {
        title: "Ask for tests alongside",
        body: "Generating tests with the implementation surfaces misunderstandings immediately and gives you something to run.",
      },
      {
        title: "Review, then run",
        body: "Read the code before executing it. Check dependencies it introduced, error handling and anything touching data or credentials.",
      },
    ],
    examples: [
      {
        label: "Utility with edge cases",
        input:
          "TypeScript function that groups an array of objects by a key selector, preserves insertion order, returns a Map, no dependencies. Include tests.",
        output:
          "A typed generic groupBy using a Map so insertion order is preserved, plus a Vitest file covering empty input, duplicate keys and numeric-string key collisions.",
      },
      {
        label: "SQL from a question",
        input:
          "Postgres: monthly active users for the last 12 months, counting a user active if they created at least one event. Tables: users(id, created_at), events(id, user_id, created_at).",
        output:
          "A date_trunc query with a distinct user count per month, plus a note to index events(user_id, created_at) so the scan stays cheap as the table grows.",
      },
    ],

    capabilities: [
      {
        title: "Explained output",
        body: "Every generation comes with its reasoning, so the approach can be judged on merit rather than taken on faith.",
      },
      {
        title: "Test generation",
        body: "Ask for tests with the implementation and get coverage of the edge cases you named plus ones you did not.",
      },
      {
        title: "Code explanation",
        body: "Paste unfamiliar code and get a plain-language walkthrough, which is how most people onboard onto a legacy file.",
      },
      {
        title: "Language conversion",
        body: "Translate an implementation into another language while preserving behaviour and flagging what does not map cleanly.",
      },
      {
        title: "Refactoring with a diff summary",
        body: "Improve structure and get a clear statement of what changed and why.",
      },
    ],
    audiences: [
      {
        who: "Developers",
        why: "Skip the boilerplate and spend attention on architecture and correctness.",
      },
      {
        who: "Data analysts",
        why: "Write SQL for questions you can describe precisely but do not want to hand-code.",
      },
      {
        who: "Learners",
        why: "See a working implementation with the reasoning, which teaches more than an answer alone.",
      },
      {
        who: "Technical founders",
        why: "Move faster on internal tooling and scripts that would otherwise never get built.",
      },
    ],
    useCases: [
      {
        title: "Test-first bug fix",
        body: "Paste the failing case, ask for a test that reproduces it, then ask for the fix and check the test passes.",
      },
      {
        title: "Legacy file onboarding",
        body: "Paste an unfamiliar module, get a walkthrough, then ask targeted questions about the parts that look risky.",
      },
      {
        title: "Internal script",
        body: "Describe a one-off data migration or reporting script and get something runnable in minutes rather than an afternoon.",
      },
    ],
    tips: [
      "State the version. Framework APIs change and unversioned prompts produce outdated patterns.",
      "Give it the interface the code must satisfy rather than describing it in prose.",
      "Ask what could go wrong with the generated approach; the answer is often more useful than the code.",
      "Never paste credentials, tokens or customer data into a prompt.",
      "Run generated tests before trusting generated code.",
    ],
    mistakes: [
      "Shipping code you did not read because it looked confident and compiled.",
      "Accepting new dependencies the model introduced without checking whether you need them.",
      "Asking for a whole application in one prompt instead of building it piece by piece.",
      "Assuming the model knows your internal conventions when you never showed it any.",
    ],
    faqs: [
      {
        q: "Which languages does it handle well?",
        a: "Mainstream languages and frameworks are strongest, since they are best represented in training data. Niche or very new frameworks produce weaker, sometimes outdated results, so verify carefully.",
      },
      {
        q: "Is the generated code secure?",
        a: "Treat it as unreviewed code from an unfamiliar contributor. It can produce insecure patterns, especially around input validation, authentication and SQL construction. Review anything touching data or credentials.",
      },
      {
        q: "Can it work with my repository?",
        a: "It works with what you paste. Provide types, schemas and neighbouring code to get output that fits your conventions instead of generic examples.",
      },
      {
        q: "Should I use AI Chat or the code generator?",
        a: "Chat is better for reasoning about an approach or debugging a problem conversationally. The code generator is better for producing an implementation, tests or a query you intend to keep.",
      },
      {
        q: "Does it write tests?",
        a: "Yes, and asking for them alongside the implementation is one of the highest-value habits with this tool.",
      },
    ],
    related: [
      "ai-chat",
      "ai-document-analyzer",
      "ai-writer",
      "ai-vision",
      "bullet-point-answer-generator",
    ],
  },
  {
    slug: "ai-vision",
    name: "AI Vision",
    category: "AI Vision",
    summary:
      "Analyze images, chat with uploaded documents, or analyze any webpage — describe, extract text, compare, and question what you point it at.",
    title: "AI Vision: Understand and Question Any Image | AmmarAI",
    description:
      "Analyze images, chat with uploaded documents or analyze any webpage. Describe scenes, read text from photos, compare screenshots and generate alt text.",
    h1: "Point it at an image and ask what is going on",
    lede: "AI Vision reads images the way chat reads text: describe a scene, extract the writing on a label, compare two screenshots, or generate accurate alt text at scale.",
    ctaLabel: "Analyse an image",
    what: [
      "AI Vision is image understanding rather than image creation. You upload a photo, a screenshot, a diagram or a scan and ask questions about it. It can describe what is present, read visible text, identify categories and attributes, compare two images and explain what differs between them.",
      "It differs from the AI Document Analyzer in what it is optimised for. The document analyzer is built for structured documents: contracts, reports, statements, multi-page PDFs where layout, sections and cross-references matter. Vision is built for pictures: product photos, screenshots, whiteboards, receipts, charts, UI captures, anything where the meaning is visual.",
      "It is strong at description, text extraction from reasonably clear images, categorisation and explaining charts. It is weaker at precise counting, exact measurement, fine print on poor scans, and any judgement that depends on knowledge outside the frame.",
    ],
    canDo: [
      "Describe an image in detail, including composition and context",
      "Extract visible text from photos, screenshots and signs",
      "Generate accurate alt text for accessibility at scale",
      "Categorise and tag product images with consistent attributes",
      "Explain a chart, diagram or whiteboard photo in words",
      "Compare two images and articulate what changed",
      "Check images against simple rules, such as whether a logo is present",
    ],
    how: [
      {
        title: "Upload the image",
        body: "Photos, screenshots, scans and diagrams all work. Higher resolution matters most when text extraction is involved.",
      },
      {
        title: "Ask a specific question",
        body: "\"What is the return period stated on this receipt?\" gets a better answer than \"tell me about this image\".",
      },
      {
        title: "Follow up",
        body: "Vision runs inside a conversation — drill into a detail without uploading the image again.",
      },
      {
        title: "Use the output downstream",
        body: "Send extracted attributes into product copy, or push descriptions into alt text and metadata.",
      },
    ],
    examples: [
      {
        label: "Alt text generation",
        input: "Image attached. Task: write accessible alt text under 25 words.",
        output:
          "\"A mechanic in a green apron truing a bicycle wheel on a workstand in a daylit workshop, spoke wrench in hand.\"",
      },
      {
        label: "Chart explanation",
        input: "Screenshot attached. Question: what is the story in this chart?",
        output:
          "Revenue rose in each of the first three quarters and dipped in Q4. The Q4 decline is roughly the size of the Q2 gain, so the year ends close to where Q3 finished…",
      },
    ],
    capabilities: [
      {
        title: "Scene description",
        body: "Detailed natural-language description of what an image contains, at whatever depth you ask for.",
      },
      {
        title: "Text extraction",
        body: "Pull written content out of photos, screenshots and signage.",
      },
      {
        title: "Attribute tagging",
        body: "Return consistent structured attributes across a batch of product images.",
      },
      {
        title: "Comparison",
        body: "Explain the differences between two versions of a design, a screenshot or a photo.",
      },
      {
        title: "Accessibility support",
        body: "Generate alt text that describes function and content rather than restating the file name.",
      },
    ],
    audiences: [
      {
        who: "E-commerce teams",
        why: "Tag and describe large product image libraries consistently instead of by hand.",
      },
      {
        who: "Accessibility and content teams",
        why: "Produce alt text for an entire image library in a fraction of the time.",
      },
      {
        who: "Support teams",
        why: "Read a customer's screenshot and understand the error before replying.",
      },
      {
        who: "Analysts",
        why: "Get a written reading of a chart or dashboard capture to paste into a report.",
      },
    ],
    useCases: [
      {
        title: "Bulk alt text pass",
        body: "Run the site's image library through vision, generate descriptive alt text, review the edge cases, and publish.",
      },
      {
        title: "Catalogue enrichment",
        body: "Extract colour, material, style and shape from product photos, then feed those attributes into the product description generator.",
      },
      {
        title: "Screenshot triage",
        body: "Have support paste a customer screenshot, extract the visible error text, and route the ticket correctly.",
      },
    ],
    tips: [
      "Ask one question at a time when precision matters; compound questions get compound vagueness.",
      "Upload the highest resolution you have when text extraction is the goal.",
      "For batch work, define the exact output shape you want, such as a fixed list of attributes.",
      "Verify counts and measurements yourself. Approximate quantity judgement is a known weakness.",
      "Write alt text prompts around purpose: what does a reader need to know about this image?",
    ],
    mistakes: [
      "Using it for multi-page structured documents, where the document analyzer is the right tool.",
      "Trusting exact counts of objects in a busy image.",
      "Uploading a blurry photo of small print and treating the extraction as reliable.",
      "Asking about things outside the frame, such as who took the photo or when.",
    ],
    faqs: [
      {
        q: "How is AI Vision different from the AI Document Analyzer?",
        a: "Vision answers questions about pictures: photos, screenshots, diagrams. The document analyzer handles structured multi-page documents where sections, tables and cross-references matter.",
      },
      {
        q: "Can it read text in images?",
        a: "Yes, reliably on clear images. Low-resolution scans, unusual fonts and dense small print reduce accuracy, so verify anything important.",
      },
      {
        q: "Is it good for alt text?",
        a: "It is one of the best uses. Ask for description focused on content and purpose, then review for context only you know.",
      },
      {
        q: "Can it identify people?",
        a: "It will not identify specific individuals. It describes what is visible, such as a person's activity or clothing, without naming them.",
      },
      {
        q: "Can I process many images at once?",
        a: "Batch workflows are supported on higher plans, which is where catalogue tagging and library-wide alt text become practical.",
      },
    ],
    related: [
      "ai-document-analyzer",
      "ai-chat",
      "ai-image-generator",
      "why-choose-this-product",
      "ai-transcription",
    ],
  },
  {
    slug: "ai-document-analyzer",
    name: "AI Document Analyzer",
    category: "AI Documents",
    summary:
      "Chat with uploaded documents — PDF, Word, CSV — and get summaries, answers with citations, and extracted structured data.",
    title: "AI Document Analyzer: Chat With Your Documents | AmmarAI",
    description:
      "Chat with uploaded documents (PDF, Word, CSV). Get summaries, answers with citations and structured data extracted from the text.",
    h1: "Stop reading 60 pages to find the one clause that matters",
    lede: "Upload contracts, research, reports and statements, then ask questions and get answers pointing back to the exact section they came from.",
    ctaLabel: "Analyse a document",
    what: [
      "AI Document Analyzer is built for structured, lengthy documents. You upload a PDF, a report, a contract, a policy or a spreadsheet, and it reads the whole thing before you start asking questions. Answers cite where they came from, so verification is a click rather than a search.",
      "The distinction from AI Vision is about shape rather than file type. Vision looks at pictures and answers what is in the frame. The document analyzer follows layout and structure across many pages: sections, defined terms, tables, appendices and cross-references. It is the tool for the thirty-page agreement, not the photo of a receipt.",
      "Practical strengths are summarisation, targeted question answering, comparison between two versions, and pulling structured data out of prose. The honest weakness is that it is an aid to reading, not a substitute for professional judgement. It does not give legal, medical or financial advice, and consequential decisions still need a qualified human reading the source.",
    ],
    canDo: [
      "Summarise a long document at a chosen level of detail",
      "Answer specific questions with citations to the source section",
      "Extract structured data such as dates, parties, amounts and obligations",
      "Compare two versions of a document and list what changed",
      "Flag unusual or missing clauses relative to what you asked it to look for",
      "Translate or explain dense technical language in plain terms",
      "Work across a set of documents at once and answer across all of them",
    ],
    how: [
      {
        title: "Upload the document set",
        body: "One file or several. Text-based PDFs work best; scanned images are read but with lower fidelity on small print.",
      },
      {
        title: "Start with a structural summary",
        body: "Ask what the document covers and how it is organised. That orientation makes your later questions much sharper.",
      },
      {
        title: "Ask targeted questions",
        body: "Name the thing you care about: notice periods, payment terms, exclusions, assumptions, sample size. Follow the citations.",
      },
      {
        title: "Extract what you need",
        body: "Request a table of the key fields, then paste it into your own system of record.",
      },
    ],
    examples: [
      {
        label: "Contract review prep",
        input:
          "Upload: 41-page service agreement. Question: list every obligation with a deadline attached, and cite the clause.",
        output:
          "Obligations with deadlines (11 found):\n1. Supplier delivers implementation plan — 10 business days from Effective Date (cl. 3.1)\n2. Customer nominates project lead — 5 business days from Effective Date (cl. 3.4)\n3. Supplier reports uptime monthly — 5th of each month (Schedule 2, §1.2)\n4. Customer raises service credits claim — within 30 days of the incident (Schedule 2, §4.1)\n5. Either party notifies renewal intent — 60 days before term end (cl. 9.2)\nTwo of these sit in the schedules rather than the body: Schedule 2 §1.2 and §4.1.",
      },
      {
        label: "Research triage",
        input:
          "Upload: six academic PDFs. Question: which of these use a sample smaller than 100, and what do they measure?",
        output:
          "Three of six papers use n < 100:\n• Okafor et al. (2023), n = 62 — measures task-completion time and error rate (p. 7)\n• Lindqvist & Barr (2021), n = 48 — measures self-reported cognitive load, NASA-TLX (p. 4)\n• Mehta (2024), n = 91 — measures 30-day retention and session frequency (p. 12)\nThe remaining three range from n = 240 to n = 1,410 and all measure conversion rather than behaviour.",

      },
    ],
    capabilities: [
      {
        title: "Cited answers",
        body: "Every answer points at the section it came from — no trust required.",
      },
      {
        title: "Multi-document questioning",
        body: "Ask one question across a folder of documents and get a consolidated answer.",
      },
      {
        title: "Structured extraction",
        body: "Turn prose into a table of fields you can use elsewhere.",
      },
      {
        title: "Version comparison",
        body: "Identify substantive differences between two drafts, not just textual diffs.",
      },
      {
        title: "Plain-language explanation",
        body: "Rewrite dense passages so a non-specialist can understand what they commit to.",
      },
    ],
    audiences: [
      {
        who: "Operations and procurement",
        why: "Get through supplier agreements and policies fast enough to keep the process moving.",
      },
      {
        who: "Researchers and students",
        why: "Triage a reading pile and find the papers that actually address the question.",
      },
      {
        who: "Finance teams",
        why: "Pull recurring figures and terms out of statements and contracts without manual re-keying.",
      },
      {
        who: "Founders",
        why: "Understand an agreement well enough to ask your lawyer the right questions.",
      },
    ],
    useCases: [
      {
        title: "Pre-legal contract read",
        body: "Summarise the agreement, extract obligations and unusual terms, and send your lawyer a focused list instead of the whole file.",
      },
      {
        title: "Literature review",
        body: "Upload the paper set, extract method, sample and finding for each into a comparison table, then read the three that matter in full.",
      },
      {
        title: "Policy rollout",
        body: "Turn a long internal policy into a plain-language summary and an FAQ that people will actually read.",
      },
    ],
    tips: [
      "Ask for the citation every time. An answer without a source is a hypothesis.",
      "Upload text-based PDFs rather than photographs of pages where you can.",
      "Ask what the document does not say. Missing terms are often the risk.",
      "For extraction, specify the exact fields and format you want returned.",
      "Read the clauses that matter yourself once you have found them.",
    ],
    mistakes: [
      "Treating a summary as a substitute for reading a legally binding clause.",
      "Uploading a poor scan and trusting numbers pulled from small print.",
      "Asking vague questions of a long document and getting a vague answer back.",
      "Uploading confidential material without checking your organisation's policy on doing so.",
    ],
    faqs: [
      {
        q: "What file types can I upload?",
        a: "Common document formats including PDF, Word documents, plain text and spreadsheets. Text-based files produce the most reliable results; scans depend on image quality.",
      },
      {
        q: "How long can a document be?",
        a: "Long documents are supported, with page and size limits set by your plan. Very large sets are best analysed in logical groups.",
      },
      {
        q: "Does it cite its answers?",
        a: "Yes, answers reference the section they came from, so checking one takes a moment. Always follow the citation on anything consequential.",
      },
      {
        q: "Can it give legal or financial advice?",
        a: "No. It helps you read and understand documents faster and prepare better questions. Decisions with legal or financial consequences need a qualified professional.",
      },
      {
        q: "Can it compare two contracts?",
        a: "Yes. Upload both and ask what differs substantively, which surfaces meaning changes rather than only textual edits.",
      },
    ],
    related: [
      "ai-vision",
      "bullet-point-answer-generator",
      "ai-chat",
      "ai-transcription",
      "ai-writer",
    ],
  },
];
