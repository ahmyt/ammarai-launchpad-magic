import type { Tool } from "./types";

export const chatWorkspaceTools: Tool[] = [
  {
    slug: "ai-personas",
    name: "AI Personas & Skills",
    category: "AI Chat",
    summary:
      "Build reusable AI personas with their own role, tone, knowledge and skills, then use them anywhere in the workspace instead of retyping instructions.",
    title: "AI Personas & Skills: Reusable AI Roles | AmmarAI",
    description:
      "Create AI personas with a defined role, tone, knowledge and output rules, attach reusable skills, share them with your team and use them across chat, writing and agents.",
    h1: "Save the instructions once, use the expert everywhere",
    lede: "Stop pasting the same three paragraphs of context into every conversation. Build the persona once — role, tone, knowledge, rules — attach the skills it needs, and call it whenever you need that expert.",
    ctaLabel: "Build a persona",
    recent: true,
    what: [
      "A persona is a saved AI identity: who it is, what it knows, how it writes, what it must never do. A skill is a saved procedure that persona can run — a review checklist, a brief format, a tone guide, a structured output shape.",
      "Together they turn one-off prompting into something reusable. The support persona always answers in your refund policy. The brand editor always applies your style rules. New team members get the same expert on day one that everyone else has been using for months.",
      "Personas work across the workspace — in AI Chat Pro, in writing tools, and as the voice behind agents and chatbots — so one definition keeps everything consistent.",
    ],
    canDo: [
      "Define a persona's role, expertise, tone and boundaries",
      "Upload reference material the persona should always know",
      "Attach reusable skills such as checklists, formats and review passes",
      "Set output rules — length, structure, language, forbidden claims",
      "Share personas with the team so everyone works from the same voice",
      "Use a persona in chat, in writing tools, or behind an agent or chatbot",
      "Version a persona and roll back when a change makes results worse",
    ],
    how: [
      {
        title: "Describe the role",
        body: "Say who the persona is, who it serves and what it is responsible for. Be specific: \"senior B2B SaaS copy editor for a security product\" beats \"marketing expert\".",
      },
      {
        title: "Give it knowledge",
        body: "Attach the style guide, pricing sheet, policy document or product notes it should treat as ground truth.",
      },
      {
        title: "Attach skills",
        body: "Add the repeatable procedures — a launch brief format, a legal-safety review, a tone pass — so the persona runs them the same way every time.",
      },
      {
        title: "Test and publish",
        body: "Run a few real requests, tighten the rules where it drifted, then share it with the workspace.",
      },
    ],
    examples: [
      {
        label: "Brand editor persona",
        input:
          "Role: senior brand editor. Knows our style guide and banned words. Always British English, no exclamation marks, no unverified claims. Skill: run a clarity pass, then a claims check.",
        output:
          "Persona saved. Every draft it touches comes back in British English, claims flagged where evidence is missing, and a short note on what was changed and why.",
      },
      {
        label: "Support specialist persona",
        input:
          "Role: customer support specialist for a subscription app. Knows the refund and billing policy. Never promises a refund outside policy. Skill: reply, then summarise for the CRM.",
        output:
          "Persona saved and attached to the inbox. Replies stay inside policy, and each conversation ends with a two-line summary written to the customer record.",
      },
    ],
    capabilities: [
      {
        title: "Reusable identity",
        body: "One definition covers role, tone, knowledge and boundaries, so results stay consistent across people and days.",
      },
      {
        title: "Skills as procedures",
        body: "Attach repeatable steps a persona always follows instead of hoping the prompt remembers them.",
      },
      {
        title: "Shared across the workspace",
        body: "The same persona can answer in chat, edit in the writing tools and speak as an agent or chatbot.",
      },
      {
        title: "Guardrails",
        body: "Forbidden claims, required disclaimers and escalation rules are part of the persona, not something you remember to add.",
      },
    ],
    audiences: [
      { who: "Teams with a house voice", why: "Everyone produces work that sounds like the same company." },
      { who: "Agencies", why: "One persona per client keeps tone, claims and formats separate and correct." },
      { who: "Support and sales", why: "Policy-safe answers without depending on who happens to be replying." },
    ],
    useCases: [
      { title: "House style enforcement", body: "Route every draft through a brand editor persona before it is published." },
      { title: "Client-specific writing", body: "Keep a separate persona per client so tone and claims never bleed across accounts." },
      { title: "Onboarding", body: "Hand a new hire the same expert personas the rest of the team already relies on." },
    ],
    tips: [
      "Write boundaries as clearly as abilities — what it must not do matters most.",
      "Attach real source documents rather than describing them from memory.",
      "Keep one persona to one job; a persona that does everything does nothing well.",
      "Review personas after a product or pricing change.",
    ],
    mistakes: [
      "Creating a vague persona that is just \"be helpful\".",
      "Letting several near-identical personas pile up.",
      "Never updating the attached knowledge after it goes stale.",
    ],
    faqs: [
      {
        q: "How is a persona different from a prompt?",
        a: "A prompt is typed once for one answer. A persona is saved, shared, versioned and applied automatically everywhere you use it.",
      },
      {
        q: "What exactly is a skill?",
        a: "A saved procedure the persona can run — a checklist, a format, a review pass — so complex instructions become one reusable step.",
      },
      {
        q: "Can I share personas with my team?",
        a: "Yes. Publish a persona to the workspace and everyone works from the same definition.",
      },
    ],
    related: ["ai-chat", "ai-chat-bots", "ai-agent-builder", "ai-writer", "external-chatbot"],
  },
  {
    slug: "ai-command-search",
    name: "AI Command Search",
    category: "AI Productivity",
    summary:
      "One search box that finds the right tool, opens past work and starts the job — type what you want in plain language and press enter.",
    title: "AI Command Search: Find Any Tool Instantly | AmmarAI",
    description:
      "Type what you want to do and jump straight to the right AI tool, a past conversation or a saved document. One command box across the whole workspace.",
    h1: "Describe the job, land in the right tool",
    lede: "You should not have to remember what a tool is called. Type \"make this clip vertical with subtitles\" and command search takes you straight there, with the job already set up.",
    ctaLabel: "Try command search",
    recent: true,
    what: [
      "Command search is the shortcut layer over the whole workspace. Open it from anywhere, type what you are trying to do, and it matches your intent to a tool, a past conversation, a saved document or a persona.",
      "It understands plain language rather than exact names, so \"translate my video\" finds dubbing and \"why did sales drop\" finds the document analyser. It also carries what you typed into the tool, so you arrive with the prompt already filled in.",
    ],
    canDo: [
      "Find tools by describing the outcome, not the name",
      "Reopen a past chat, document or generation",
      "Start a job with your typed text already carried over",
      "Jump to a saved persona or skill",
      "Move between tools without going back to a menu",
      "Work entirely from the keyboard",
    ],
    how: [
      { title: "Open it anywhere", body: "One shortcut brings up the command box on any screen in the workspace." },
      { title: "Type the outcome", body: "Describe what you want in ordinary words — no tool names required." },
      { title: "Pick from the matches", body: "Tools, past work, personas and documents appear together, ranked by fit." },
      { title: "Land ready to go", body: "The tool opens with your text already in place, so you start rather than retype." },
    ],
    examples: [
      {
        label: "Finding the right tool",
        input: "add subtitles to my founder clip",
        output:
          "AI Captions (best match) · AI Video Editor · AI Transcription — opening AI Captions with the upload step ready.",
      },
      {
        label: "Reopening past work",
        input: "the pricing page rewrite from last week",
        output:
          "Document: \"Pricing page v3\" · Chat: \"Pricing objections\" · Persona: \"Brand editor\" — jumping to the document.",
      },
    ],
    capabilities: [
      { title: "Intent matching", body: "Plain-language descriptions resolve to the right tool without exact names." },
      { title: "One index", body: "Tools, chats, documents, generations and personas all searchable in the same box." },
      { title: "Carry-over", body: "What you typed becomes the starting prompt in the tool that opens." },
      { title: "Keyboard-first", body: "Open, search, select and start without touching the mouse." },
    ],
    audiences: [
      { who: "Heavy daily users", why: "Cuts the clicks between one job and the next." },
      { who: "New users", why: "Finds the right tool before you have learned the library." },
      { who: "Teams", why: "Everyone reaches the same tools and saved work the same way." },
    ],
    useCases: [
      { title: "Fast tool switching", body: "Move from writing to image to video without navigating the library each time." },
      { title: "Finding old work", body: "Recall a generation or conversation by describing it rather than browsing history." },
    ],
    tips: [
      "Describe the outcome, not the tool.",
      "Include the format — vertical, PDF, subtitles — for a sharper match.",
      "Use it to reopen work instead of scrolling through history.",
    ],
    mistakes: [
      "Typing a single vague word and expecting a precise match.",
      "Browsing the full library when one phrase would land you there.",
    ],
    faqs: [
      {
        q: "Does it search my own content too?",
        a: "Yes. Past chats, documents, generations, personas and tools all appear in the same results.",
      },
      {
        q: "Do I need to know the tool names?",
        a: "No. Describe the job and the closest tools are ranked for you.",
      },
    ],
    related: ["ai-chat", "ai-personas", "ai-writer", "ai-agent-builder"],
  },
];
