/**
 * Writing and Chat & Assistants tutorials.
 *
 * Same rules as src/data/tutorials.ts: end-user workflows only, AmmarAI
 * terminology only, nothing documented that AmmarAI does not actually offer.
 */

import type { Tutorial } from "./tutorials";

export const writingTutorials: Tutorial[] = [
  {
    slug: "how-to-use-ai-writer",
    category: "Writing",
    title: "How to Use AI Writer in AmmarAI",
    description:
      "Write blog posts, emails and marketing copy with AI Writer: brief fields, tone, creativity, language, model choice and bulk generation, step by step.",
    h1: "How to use AI Writer",
    intro: [
      "AI Writer is the template-driven writing workspace in AmmarAI. You choose the kind of content you want — a blog article, a product description, an ad, an email — fill in a short brief, and AI Writer drafts it in the language and tone you set.",
      "Every draft opens in the document editor, where you can rewrite sections, keep versions and save the piece to your workspace.",
    ],
    whenToUse: [
      "You need a first draft fast and you know roughly what it should say.",
      "You write the same kind of content repeatedly and want a consistent structure.",
      "You need the same copy in several languages or several variations.",
    ],
    sections: [
      {
        heading: "What AI Writer does",
        paragraphs: [
          "AI Writer turns a short brief into finished copy. Each template asks only for the fields that matter for that format — a blog article asks for a topic and the sections to cover, a product description asks for the product and its key features.",
          "The output lands in an editable document rather than a throwaway text box, so you can refine it, rewrite a paragraph, and keep the final version alongside the rest of your work.",
        ],
      },
      {
        heading: "Write your first piece",
        steps: [
          {
            title: "Open the template you need",
            body: "From the dashboard, open AI Writer and pick the format — blog article, paragraph, email, ad copy, product description and so on. The template decides which brief fields you see.",
          },
          {
            title: "Describe the content",
            body: "Fill in the main brief field, such as the blog topic, and any supporting field like the sections you want covered. Be specific: the audience, the angle and the outcome you want all improve the draft.",
          },
          {
            title: "Set language and length",
            body: "Choose the output language and the maximum length. Length is a character target, so raise it for long-form and lower it for short social or ad copy.",
          },
          {
            title: "Set tone and creativity",
            body: "Pick a tone of voice — professional, casual, bold, witty and others — or enter a custom tone. Creativity controls how closely the model sticks to the brief: lower for factual copy, higher for ideas and headlines.",
          },
          {
            title: "Choose the number of results",
            body: "Ask for more than one result when you want options to compare. Each result costs credits, so start with one or two.",
          },
          {
            title: "Generate and edit",
            body: "Select Generate. The draft appears in the document editor, where you can highlight a passage and rewrite just that part, then save the document.",
          },
        ],
        callouts: [
          {
            type: "tip",
            body: "Keep the brief short but concrete. \"Blog post for small ecommerce owners on cutting returns, with 5 practical tactics\" beats \"write about returns\".",
          },
        ],
      },
      {
        heading: "Options and settings",
        table: {
          head: ["Setting", "What it controls"],
          rows: [
            ["Language", "The language of the finished copy — not just the brief."],
            ["Maximum length", "Approximate character budget for the output."],
            ["Tone of voice", "The register of the writing; a custom tone can be typed in."],
            ["Creativity", "How freely the model interprets the brief."],
            ["Number of results", "How many alternative drafts are generated in one run."],
            ["Model", "Which AI model writes the draft; the default suits most work."],
            ["Brand", "Attach a saved company or product so the copy uses your positioning."],
          ],
        },
      },
      {
        heading: "Use your brand details",
        paragraphs: [
          "If you have saved a company or a product in your workspace, switch on the brand option and select it. AI Writer then writes with your positioning, audience and product facts instead of generic filler — useful for teams producing a lot of copy that must stay consistent.",
        ],
      },
      {
        heading: "Generate in bulk",
        paragraphs: [
          "For repetitive work — dozens of product descriptions or ad variants — use bulk generation instead of running the template one item at a time. Each item still follows the same tone, language and length settings.",
        ],
        callouts: [
          {
            type: "warning",
            body: "Bulk runs consume credits per item. Test the settings on a single item first, then run the batch.",
          },
        ],
      },
      {
        heading: "A practical example",
        paragraphs: [
          "Say you need a 1,200-character blog post about switching a small team to AI writing. Topic: \"How a five-person marketing team can adopt AI writing without losing its voice\". Sections: \"where AI helps, where it does not, setting a brand voice, a simple review process\". Tone: professional. Creativity: average. Language: English (UK). One result.",
          "The draft arrives structured along those sections. From there, rewrite the introduction for punch, tighten the conclusion, and save the document.",
        ],
      },
      {
        heading: "Tips and best practices",
        bullets: [
          "Name the audience in the brief — it changes vocabulary and examples more than any other field.",
          "Use lower creativity for anything factual, pricing-related or regulated.",
          "Generate two results when you are unsure of the angle, then merge the best parts.",
          "Always fact-check names, numbers and claims before publishing.",
          "Save strong drafts as documents so you can reuse the structure later.",
        ],
      },
      {
        heading: "Limitations to know",
        bullets: [
          "The model does not browse your website unless you give it the detail in the brief or in saved brand information.",
          "Maximum length is a target, not a hard cut-off — long pieces may run slightly over or under.",
          "Output quality depends heavily on the brief; vague inputs produce generic copy.",
        ],
      },
    ],
    relatedTools: ["ai-writer", "ai-seo-analyzer", "ai-plagiarism-detector"],
    relatedTutorials: ["how-to-use-the-ai-article-wizard", "how-to-use-ai-chat-pro"],
    cta: { toolName: "AI Writer", toolSlug: "ai-writer" },
  },
  {
    slug: "how-to-use-the-ai-article-wizard",
    category: "Writing",
    title: "How to Use the AI Article Wizard | AmmarAI",
    description:
      "Build a long-form article step by step in AmmarAI: keywords, titles, outline, images and the finished draft — with full control at every stage.",
    h1: "How to use the AI Article Wizard",
    intro: [
      "The Article Wizard is the long-form path in AmmarAI. Rather than producing a whole article from a single prompt, it walks through four stages — keywords, title, outline, then the finished article — and lets you approve or change the work at each one.",
      "Use it when the structure of the piece matters as much as the words.",
    ],
    whenToUse: [
      "You are writing a long, structured article rather than a short piece of copy.",
      "You want to choose the keywords and headings before the draft is written.",
      "You want images generated alongside the article.",
    ],
    sections: [
      {
        heading: "The four stages",
        paragraphs: [
          "Each stage produces suggestions you can accept, edit, add to or skip. Nothing is final until you generate the article at the end.",
        ],
        table: {
          head: ["Stage", "What you do"],
          rows: [
            ["1. Topic and keywords", "Describe the article and generate or enter target keywords."],
            ["2. Titles", "Generate title options, set a maximum title length, pick one."],
            ["3. Outline", "Generate subtitles and outline points, reorder or rewrite them."],
            ["4. Images and output", "Optionally describe images, then set language, length and creativity and generate."],
          ],
        },
      },
      {
        heading: "Step by step",
        steps: [
          {
            title: "Describe the article",
            body: "In the topic field, answer \"What is this article about?\" in a sentence or two. Add the optional title and outline hints if you already have a direction in mind.",
          },
          {
            title: "Generate keywords",
            body: "Set how many keywords you want and select Generate Keywords. Add your own with the keyword field, remove any that miss the intent, or skip the step if you already know your target terms.",
          },
          {
            title: "Choose a title",
            body: "Set the number of titles and the maximum title length, generate the options, and select the one that matches the search intent. You can also type your own.",
          },
          {
            title: "Shape the outline",
            body: "Set how many subtitles and outline points you want, generate them, then edit. This is the most valuable stage — the outline decides whether the article actually answers the question.",
          },
          {
            title: "Add images (optional)",
            body: "Describe the images you want, set how many and their size, and add them to the run. Skip this if you are supplying your own artwork.",
          },
          {
            title: "Set the output and generate",
            body: "Choose the language, the blog post length and the creativity level, then generate. The finished article opens in the document editor for final edits.",
          },
        ],
        callouts: [
          {
            type: "tip",
            body: "Spend your time on the outline. Fixing a weak structure after generation takes far longer than adjusting a heading before it.",
          },
        ],
      },
      {
        heading: "A practical example",
        paragraphs: [
          "Topic: \"A guide to AI video generation for small ecommerce brands\". Generate eight keywords, keep the five with clear commercial intent, and delete the rest. Generate five titles at a maximum of 60 characters and pick the clearest. Generate six subtitles, then reorder so pricing comes after the how-to section. Add two images described as a product-video workflow and a finished ad frame. Generate at 1,500 words, average creativity.",
        ],
      },
      {
        heading: "Tips and limitations",
        bullets: [
          "Generated keywords are suggestions, not search-volume data — validate them with your own research.",
          "A longer article is not automatically better; set the length to what the topic genuinely needs.",
          "Every stage that generates content uses credits, including keyword and title suggestions.",
          "Check facts, product names and pricing before publishing.",
        ],
      },
    ],
    relatedTools: ["ai-writer", "ai-seo-analyzer", "ai-image-generator"],
    relatedTutorials: ["how-to-use-ai-writer", "how-to-check-content-with-the-plagiarism-checker"],
    cta: { toolName: "AI Writer", toolSlug: "ai-writer" },
  },
  {
    slug: "how-to-use-ai-chat-pro",
    category: "Chat & Assistants",
    title: "How to Use AI Chat Pro in AmmarAI",
    description:
      "Use AI Chat Pro for research, drafting and analysis: choosing models, saving personal instructions and memory, organising chats and attaching brand details.",
    h1: "How to use AI Chat Pro",
    intro: [
      "AI Chat Pro is the full chat workspace in AmmarAI. It keeps your conversations organised in folders, remembers the instructions you set, lets you switch between AI models, and can work with files you attach.",
      "It is the tool to reach for when the task is a conversation — thinking something through, refining a draft, or analysing material — rather than filling in a template.",
    ],
    whenToUse: [
      "You are exploring a problem and expect several rounds of back and forth.",
      "You want one assistant that remembers how you like to work.",
      "You need to compare how different models answer the same question.",
    ],
    sections: [
      {
        heading: "Start a conversation",
        steps: [
          {
            title: "Open AI Chat Pro",
            body: "From the dashboard, open AI Chat Pro. A new conversation starts ready for your first message.",
          },
          {
            title: "Pick an assistant or start blank",
            body: "Choose one of the ready-made assistants for a specific job, or start with the default assistant and steer it yourself.",
          },
          {
            title: "Choose a model",
            body: "Open the model selector and pick the model for the task. The default model suits most work; switch models when you want a different balance of speed, reasoning depth or writing style.",
          },
          {
            title: "Write your message",
            body: "State the task, the audience and the format you want back. Attach a file if the answer depends on it.",
          },
          {
            title: "Iterate",
            body: "Reply with corrections rather than starting over — the assistant keeps the thread's context.",
          },
        ],
      },
      {
        heading: "Personal instructions and memory",
        paragraphs: [
          "Personal instructions are standing rules for every new conversation — your role, your audience, your preferred formats, the things you never want mentioned. Memory keeps useful facts between chats so you do not repeat yourself.",
        ],
        callouts: [
          {
            type: "note",
            body: "Keep personal instructions short and behavioural. Long instruction blocks crowd out the actual question.",
          },
        ],
      },
      {
        heading: "Attach your brand",
        paragraphs: [
          "Select a saved company or product in the chat options and the assistant writes with your positioning and product facts. This is the fastest way to stop generic answers when you are drafting customer-facing copy.",
        ],
      },
      {
        heading: "Keep chats organised",
        bullets: [
          "Create folders for projects or clients and move conversations into them.",
          "Rename a chat as soon as it becomes useful — default names are hard to find later.",
          "Delete dead-end threads so search stays clean.",
          "Export the useful output as PDF, Word or plain text.",
        ],
      },
      {
        heading: "A practical example",
        paragraphs: [
          "You are preparing a launch email. Set personal instructions once: \"I market a B2B SaaS to operations managers. Write in plain British English, no exclamation marks.\" Select your product as the brand context. Ask for three subject lines and a 120-word body, then reply with \"tighten the second option and cut the jargon\" until it reads right. Export to Word and file the chat in your launch folder.",
        ],
      },
      {
        heading: "Tips and limitations",
        bullets: [
          "Ask for the format you want — a table, five bullets, a 100-word paragraph — and you will get it.",
          "Start a fresh chat when the topic changes; long unrelated threads degrade answers.",
          "Model availability depends on your plan.",
          "Verify anything time-sensitive; models can be confidently wrong about recent facts.",
        ],
      },
    ],
    relatedTools: ["ai-chat", "ai-personas", "ai-command-search"],
    relatedTutorials: ["how-to-analyse-documents-with-ai-file-chat", "how-to-use-ai-vision"],
    cta: { toolName: "AI Chat Pro", toolSlug: "ai-chat" },
  },
  {
    slug: "how-to-analyse-documents-with-ai-file-chat",
    category: "Chat & Assistants",
    title: "How to Analyse Documents with AI in AmmarAI",
    description:
      "Upload a PDF or document to AmmarAI and ask questions about it: summaries, key clauses, comparisons and extracted data, in a normal conversation.",
    h1: "How to analyse documents with AI File Chat",
    intro: [
      "AI File Chat lets you upload a document and then ask questions about it in plain language. Instead of reading a fifty-page report end to end, you ask for the parts that matter and follow up until you have what you need.",
      "The conversation stays attached to the document, so every answer refers back to the file you uploaded.",
    ],
    whenToUse: [
      "You need the substance of a long report, contract or research paper quickly.",
      "You want specific figures, dates or clauses pulled out of a document.",
      "You are comparing a document against your own requirements.",
    ],
    sections: [
      {
        heading: "Step by step",
        steps: [
          {
            title: "Open AI File Chat",
            body: "From the dashboard, open the document analysis workspace and start a new chat.",
          },
          {
            title: "Upload the document",
            body: "Add your file. Wait for the upload to finish processing before asking the first question.",
          },
          {
            title: "Ask a broad question first",
            body: "Start with something like \"Summarise this in ten bullets for a non-specialist\" to check the document was read correctly.",
          },
          {
            title: "Narrow down",
            body: "Follow up with specifics: \"List every deadline with its date\", \"What are the termination conditions?\", \"Pull the pricing into a table\".",
          },
          {
            title: "Save what you need",
            body: "Rename the chat after the document so you can find it again, and export the answers you want to keep.",
          },
        ],
        callouts: [
          {
            type: "tip",
            body: "Ask the assistant to quote the passage it based an answer on. It makes verification much faster.",
          },
        ],
      },
      {
        heading: "Questions that work well",
        bullets: [
          "\"Summarise the argument and list the evidence used for each claim.\"",
          "\"Extract all figures into a table with the page they came from.\"",
          "\"What does this document not cover that I should ask about?\"",
          "\"Rewrite section 4 in plain language for a customer.\"",
        ],
      },
      {
        heading: "Limitations to know",
        bullets: [
          "Scanned documents without a text layer may not be read reliably.",
          "Very large files can be truncated — split them into parts when accuracy matters.",
          "Always verify legal, medical or financial conclusions against the source text.",
        ],
        callouts: [
          {
            type: "warning",
            body: "Treat the output as a fast reading aid, not professional advice. Check the original wording before acting on it.",
          },
        ],
      },
    ],
    relatedTools: ["ai-document-analyzer", "ai-chat", "ai-vision"],
    relatedTutorials: ["how-to-use-ai-chat-pro", "how-to-use-ai-vision"],
    cta: { toolName: "AI Document Analyzer", toolSlug: "ai-document-analyzer" },
  },
  {
    slug: "how-to-use-ai-vision",
    category: "Chat & Assistants",
    title: "How to Use AI Vision in AmmarAI",
    description:
      "Upload an image to AmmarAI and ask about it: describe a photo, read a screenshot, explain a chart, or turn a picture into usable copy.",
    h1: "How to use AI Vision",
    intro: [
      "AI Vision is a chat that can see. Upload an image and ask about it — what is in the photo, what a chart shows, what an error message means, or how to describe a product for a listing.",
      "It is the quickest way to turn something visual into text you can use.",
    ],
    whenToUse: [
      "You need a written description of a photo or screenshot.",
      "You want a chart, diagram or table explained.",
      "You are writing product copy from product photography.",
    ],
    sections: [
      {
        heading: "Step by step",
        steps: [
          {
            title: "Open AI Vision",
            body: "From the dashboard, open the Vision workspace.",
          },
          {
            title: "Add your image",
            body: "Drag the image in or browse for it. JPG, PNG and WebP files are accepted.",
          },
          {
            title: "Ask a specific question",
            body: "Say what you want out of it: \"Describe this for an ecommerce listing in 60 words\", \"What does this error screenshot mean?\", \"Summarise the trend in this chart\".",
          },
          {
            title: "Follow up",
            body: "Refine in the same conversation — change the tone, shorten the description, or ask for alt text.",
          },
        ],
      },
      {
        heading: "Useful jobs for AI Vision",
        table: {
          head: ["Task", "What to ask"],
          rows: [
            ["Accessibility", "\"Write descriptive alt text under 120 characters.\""],
            ["Ecommerce", "\"Describe the material, fit and styling for a product page.\""],
            ["Support", "\"Explain this error screen and the likely fix.\""],
            ["Analysis", "\"Read this chart and summarise what changed and when.\""],
          ],
        },
      },
      {
        heading: "Tips and limitations",
        bullets: [
          "Upload the highest-quality version you have — small, blurry images produce vague answers.",
          "Ask for a specific length and audience to avoid generic description.",
          "Fine print, handwriting and dense tables can be misread; check anything critical.",
          "Do not upload images containing personal or confidential data you would not want processed.",
        ],
      },
    ],
    relatedTools: ["ai-vision", "ai-image-generator", "ai-document-analyzer"],
    relatedTutorials: ["how-to-analyse-documents-with-ai-file-chat", "how-to-use-ai-chat-pro"],
    cta: { toolName: "AI Vision", toolSlug: "ai-vision" },
  },
  {
    slug: "how-to-check-content-with-the-plagiarism-checker",
    category: "Writing",
    title: "How to Check Content with AI Plagiarism Checker",
    description:
      "Run text through AmmarAI's plagiarism checker before publishing, read the result sensibly, and fix the passages that need rewriting.",
    h1: "How to check content with the AI Plagiarism Checker",
    intro: [
      "The AI Plagiarism Checker reviews a piece of text and reports passages that look copied or too close to existing material. Run it as a last step before publishing anything written by a freelancer, a model, or yourself in a hurry.",
    ],
    whenToUse: [
      "You are publishing content written by someone else.",
      "You reworked an existing article and want to be sure it reads as original.",
      "You need a quick originality check before a client hand-off.",
    ],
    sections: [
      {
        heading: "Step by step",
        steps: [
          {
            title: "Open the plagiarism checker",
            body: "Find it in the writing tools in your dashboard.",
          },
          {
            title: "Paste the text",
            body: "Add the content into the description field. Check one piece at a time rather than a whole site.",
          },
          {
            title: "Set language and length",
            body: "Choose the language of the text and a maximum length that covers the piece you pasted.",
          },
          {
            title: "Run the check",
            body: "Select Generate and read the report.",
          },
          {
            title: "Rewrite the flagged parts",
            body: "Rewrite in your own words, or quote and attribute properly if the source should be credited.",
          },
        ],
      },
      {
        heading: "Reading the result sensibly",
        bullets: [
          "Common phrases, product names and standard definitions will often look similar — that is not plagiarism.",
          "Long identical sentences are the signal to act on.",
          "A clean result is reassurance, not a guarantee; it does not replace your own judgement.",
        ],
        callouts: [
          {
            type: "warning",
            body: "For academic or legal submissions, follow the checker required by your institution or client. Use this as a pre-check.",
          },
        ],
      },
    ],
    relatedTools: ["ai-plagiarism-detector", "ai-writer"],
    relatedTutorials: ["how-to-use-ai-writer", "how-to-use-the-ai-article-wizard"],
    cta: { toolName: "AI Plagiarism Detector", toolSlug: "ai-plagiarism-detector" },
  },
];
