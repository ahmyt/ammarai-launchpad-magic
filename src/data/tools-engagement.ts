import type { Tool } from "./types";

export const engagementTools: Tool[] = [
  {
    slug: "ai-smart-inbox",
    name: "AI Smart Inbox",
    category: "AI Sales & CRM",
    summary:
      "One inbox for every conversation — website chat, email, social DMs and comments — triaged, tagged and answered by AI.",
    title: "AI Smart Inbox: One Inbox for Every Channel | AmmarAI",
    description:
      "Bring website chat, email, social DMs and comments into one AI inbox that triages, tags, drafts replies and escalates the conversations that need a human.",
    h1: "Every conversation in one place, already sorted",
    lede:
      "Chat widget messages, emails, Instagram DMs, Facebook comments and WhatsApp threads land in a single inbox. The AI reads each one, tags it, drafts the reply and flags the handful that genuinely need you.",
    ctaLabel: "Open the inbox",
    recent: true,
    what: [
      "The Smart Inbox is the other half of an AI assistant: the bot answers, but somebody still has to watch what it said, pick up the conversations it could not close, and make sure nothing sits unanswered for two days. The inbox is where that happens.",
      "Every channel you connect — the website chatbot, a support mailbox, Instagram and Facebook DMs, comments on your posts, WhatsApp — writes into one threaded list. Each conversation carries its history, the contact behind it and the channel it came from, so you are never reconstructing context from three tabs.",
      "AI does the triage. It labels intent (sales, support, complaint, spam), scores urgency, writes a suggested reply in your tone, and escalates anything that looks like an unhappy customer or a real buying signal. You approve, edit or take over.",
    ],
    canDo: [
      "Collect website chat, email, Instagram and Facebook DMs, comments and WhatsApp in one thread list",
      "Auto-tag conversations by intent, urgency and language",
      "Get an AI-drafted reply for every message, in your brand voice",
      "Let the AI answer routine questions on its own and escalate the rest",
      "See the full contact history and linked CRM deal beside each thread",
      "Assign conversations to teammates with internal notes",
      "Turn a conversation into a lead, a task or a CRM deal in one click",
      "Track response time, resolution rate and what people ask most",
    ],
    how: [
      {
        title: "Connect your channels",
        body: "Link the website chatbot, your support mailbox and the social accounts you actually get messages on. Threads start flowing in immediately.",
      },
      {
        title: "Set the rules",
        body: "Decide what the AI may answer alone, what it must draft for approval, and what always goes straight to a person — refunds, complaints, anything legal.",
      },
      {
        title: "Work the queue",
        body: "Open the inbox, read the tags, approve the good drafts and rewrite the rest. Most threads close in one keystroke.",
      },
      {
        title: "Review what you learned",
        body: "The weekly view shows top intents, unanswered questions and response times — a map of what your site and product fail to explain.",
      },
    ],
    examples: [
      {
        label: "Morning triage",
        input:
          "31 overnight messages across the website chat, Instagram DMs and the support mailbox.",
        output:
          "22 answered automatically, 6 drafted and waiting for approval, 3 escalated — one refund request, one bulk-order enquiry worth chasing, one angry review reply. Zero unread.",
      },
      {
        label: "Buying signal caught",
        input:
          "An Instagram DM: 'do you do 200 units with our logo on them?'",
        output:
          "Tagged sales · high intent, contact matched to an existing CRM record, reply drafted with lead time and MOQ, deal created at Qualified stage and assigned to the sales owner.",
      },
    ],
    capabilities: [
      {
        title: "Truly omnichannel",
        body: "Website chat, email, Instagram, Facebook, WhatsApp and comments in one list, with the channel shown on every thread.",
      },
      {
        title: "AI triage and tagging",
        body: "Intent, urgency, sentiment and language are labelled on arrival, so the queue is already sorted before you look at it.",
      },
      {
        title: "Drafted replies in your voice",
        body: "Every thread comes with a suggested answer grounded in your content, ready to send, edit or discard.",
      },
      {
        title: "Escalation you control",
        body: "Set exactly which topics the AI must never handle alone. Everything else it can close on its own.",
      },
      {
        title: "Connected to the CRM",
        body: "Conversations link to contacts and deals, so sales sees the chat history and support sees the pipeline.",
      },
      {
        title: "Team workflow",
        body: "Assign, snooze, add internal notes and hand over mid-conversation without the customer noticing a seam.",
      },
    ],
    audiences: [
      {
        who: "E-commerce stores",
        why: "Order, shipping and returns questions arrive on five channels at once and all need the same answer.",
      },
      {
        who: "Small support teams",
        why: "Two people covering everything can clear a night's backlog before the first coffee.",
      },
      {
        who: "Sales-led businesses",
        why: "Buying signals hiding in DMs get spotted, tagged and turned into deals instead of scrolling away.",
      },
      {
        who: "Agencies",
        why: "Run several clients' inboxes side by side with separate voices, rules and reporting.",
      },
    ],
    useCases: [
      {
        title: "Overnight backlog, cleared by 9am",
        body: "The AI answers the repeatable questions while you sleep and leaves you a short, sorted list of the ones that needed judgement.",
      },
      {
        title: "Never miss a lead in the DMs",
        body: "High-intent messages are flagged, matched to a contact and pushed into the pipeline the moment they arrive.",
      },
      {
        title: "Find out what your site fails to say",
        body: "The unanswered-questions report becomes next month's FAQ, help articles and product-page copy.",
      },
    ],
    tips: [
      "Start with the AI drafting rather than sending. Two weeks of approvals tells you exactly where to loosen the rules.",
      "Write your escalation list before launch: refunds, complaints, anything legal or medical.",
      "Keep the tone guide short and specific — three sentences beats a style manual.",
      "Review the top-intent report monthly and fix the underlying page instead of answering the same thing forever.",
    ],
    mistakes: [
      "Letting the AI send unsupervised on day one and finding out later what it promised.",
      "Connecting every channel at once instead of the two that actually carry your volume.",
      "Ignoring the escalation queue — those are the conversations with money or reputation attached.",
      "Treating the inbox as support only, and missing the sales conversations inside it.",
    ],
    faqs: [
      {
        q: "Which channels can I connect?",
        a: "Website chat from your chatbot, email, Instagram and Facebook DMs, post comments and WhatsApp. Each thread shows which channel it came from and keeps its own history.",
      },
      {
        q: "Does the AI reply on its own?",
        a: "Only where you allow it. You can run it fully automatic, draft-and-approve, or a mix — automatic for routine questions, human for anything sensitive.",
      },
      {
        q: "Can my team work in it together?",
        a: "Yes. Assign threads, leave internal notes and take over a conversation mid-thread; the customer sees one continuous chat.",
      },
      {
        q: "How does it connect to the CRM?",
        a: "Conversations match to existing contacts and can create a deal in a click, so the chat history sits on the record your sales team already uses.",
      },
      {
        q: "What reporting do I get?",
        a: "Volume by channel, response and resolution times, top intents, sentiment and the questions the AI could not answer.",
      },
    ],
    related: ["ai-crm", "external-chatbot", "ai-marketing-bot", "ai-phone-agent", "ai-chat-bots"],
  },
  {
    slug: "ai-marketing-bot",
    name: "AI Marketing Bot",
    category: "AI Marketing",
    summary:
      "A marketing strategist on call — it plans campaigns, writes the assets, and tells you what to run next and why.",
    title: "AI Marketing Bot: Campaign Strategy on Demand | AmmarAI",
    description:
      "An AI marketing strategist that builds campaign plans, audience angles, channel mixes and the assets to run them — briefed on your business, not a generic template.",
    h1: "A marketing strategist that never runs out of ideas",
    lede:
      "Tell it what you sell, who you sell to and what you are trying to move. The Marketing Bot comes back with a campaign plan, the angles worth testing, the channel mix, and the actual copy and creative briefs to run it.",
    ctaLabel: "Plan a campaign",
    recent: true,
    what: [
      "Most AI writing tools start after the thinking is done: you already know the angle, you just want the words. The Marketing Bot works the other way round. It starts at strategy — who to talk to, what to say to them, where to say it — and only then produces the assets.",
      "You brief it once on your business: product, price point, audience, competitors, tone, the channels you actually use. That brief persists, so every later request is answered in the context of your business rather than a generic marketing template.",
      "Ask it for a launch plan, a slow-month rescue, a Black Friday sequence or a way to sell more of one stuck SKU, and it returns a structured plan: objective, audience segments, offer, angles ranked by likely performance, a channel-by-channel calendar, and the copy for each placement.",
    ],
    ],
    canDo: [
      "Build a full campaign plan from an objective and a budget",
      "Generate audience segments and the message that fits each one",
      "Rank creative angles by likely performance and explain the reasoning",
      "Write the assets: ad copy, emails, captions, landing page sections, scripts",
      "Produce a channel-by-channel calendar with sequencing and frequency",
      "Critique an existing campaign and say what to change first",
      "Suggest A/B tests worth running and what result would prove what",
      "Turn a plan into work: hand assets to the Social Media Agent, Email tools or Image Generator",
    ],
    how: [
      {
        title: "Brief it on your business",
        body: "Product, price, audience, competitors, tone and the channels you actually use. This is the input that makes everything after it specific.",
      },
      {
        title: "State the objective",
        body: "\"Fill 40 seats for a September workshop\" or \"clear last season's stock in three weeks\". Objectives with numbers get plans with numbers.",
      },
      {
        title: "Review the plan, not the copy",
        body: "Check the audience, offer and angle order first. Fixing strategy takes a sentence; fixing thirty finished assets takes a day.",
      },
      {
        title: "Generate and ship",
        body: "Approve the plan and have it write every asset, then push them to the social agent, email tools or your ad accounts.",
      },
    ],
    examples: [
      {
        label: "Quiet-month rescue",
        input:
          "Independent gym, 340 members, February is always flat. Budget £600. Want 40 new joiners and fewer cancellations.",
        output:
          "Plan: two audiences (January quitters who lapsed, and partners of current members). Offer: 6-week 'finish what you started' block, not a discount. Angles ranked — 1) shame-free restart, 2) train with someone you know, 3) measurable 6-week outcome. Channels: £380 local Meta, £120 Google brand defence, £100 print in three cafés; member referral email on day one, SMS reminder day ten. 14 assets attached.",
      },
      {
        label: "Campaign critique",
        input:
          "Our SaaS ads get clicks but no trials. Copy leads with '30% faster reporting'. Landing page is the homepage.",
        output:
          "Two problems, one fix each. The claim is a feature, not a consequence — test 'close the month in a morning, not a week'. And you are sending paid traffic to a homepage that asks visitors to choose; build one page per angle with a single call to action. Expected order of impact: landing page first, copy second.",
      },
    ],
    capabilities: [
      {
        title: "Strategy before assets",
        body: "You get an objective, audiences, offer and ranked angles — the decisions that make the copy work — before anything is written.",
      },
      {
        title: "Briefed on your business",
        body: "Your product, pricing, audience and competitors persist, so answers are specific to you rather than to marketing in general.",
      },
      {
        title: "Full-funnel output",
        body: "Ads, emails, captions, landing sections, scripts and creative briefs, all consistent with one plan.",
      },
      {
        title: "Honest critique",
        body: "Paste an existing campaign and it tells you what is weak and what to fix first, in priority order.",
      },
      {
        title: "Test design",
        body: "Suggests the A/B tests worth running and what a result would actually prove, so you stop testing button colours.",
      },
      {
        title: "Hands off to the rest of the platform",
        body: "Approved assets go to the Social Media Agent, email generators, image and video tools without a rewrite.",
      },
    ],
    audiences: [
      {
        who: "Small businesses with no marketing team",
        why: "The strategist you cannot afford to hire, briefed once and available whenever a decision is needed.",
      },
      {
        who: "Solo marketers",
        why: "A second opinion that pressure-tests your plan before you spend the budget.",
      },
      {
        who: "Agencies",
        why: "Turn a discovery call into a credible campaign plan the same afternoon.",
      },
      {
        who: "Founders launching something",
        why: "Go from 'we launch in three weeks' to a sequenced plan with every asset written.",
      },
    ],
    useCases: [
      {
        title: "Launch planning",
        body: "A dated run-up plan: teaser, waitlist, launch day, follow-up, with the assets for each beat already written.",
      },
      {
        title: "Fixing what is not working",
        body: "Feed it the campaign that underperformed and get a ranked list of changes instead of a vague 'test more creative'.",
      },
      {
        title: "Seasonal and promotional pushes",
        body: "Black Friday, back to school, end of quarter — an offer that is not just a discount, plus the sequence to run it.",
      },
    ],
    tips: [
      "Spend real effort on the business brief once. Everything downstream inherits its quality.",
      "Give objectives numbers and deadlines; vague goals produce vague plans.",
      "Argue with it. Say why an angle will not work for your audience and it will re-rank.",
      "Ask for the reasoning behind the channel split before you spend anything.",
      "Run one angle properly rather than five badly — ask it which single one to pick.",
    ],
    mistakes: [
      "Skipping the brief and then blaming the plan for being generic.",
      "Asking for assets before agreeing the angle, then rewriting everything.",
      "Treating budget suggestions as forecasts — they are starting allocations, not guarantees.",
      "Ignoring the critique feature and only ever using it to generate new work.",
    ],
    faqs: [
      {
        q: "How is this different from the ad and copy generators?",
        a: "Those write an asset once you know what to say. The Marketing Bot decides what to say — audience, offer, angle and channel — and then produces the assets that follow from that decision.",
      },
      {
        q: "Does it know my business?",
        a: "It knows what you tell it. The business brief — product, pricing, audience, competitors, tone — persists between sessions and shapes every plan.",
      },
      {
        q: "Can it review a campaign I already run?",
        a: "Yes. Paste the copy, targeting and results and it returns a prioritised list of what to change and why.",
      },
      {
        q: "Will it manage my ad accounts?",
        a: "It plans and writes; it does not spend your money. Assets are handed to you or to the Social Media Agent for scheduling and publishing.",
      },
      {
        q: "Is the budget advice reliable?",
        a: "Treat it as a sensible starting split based on your objective and channels, then reallocate on real performance after the first week.",
      },
    ],
    related: [
      "ai-social-media-agent",
      "ad-script-generator",
      "welcome-email-generator",
      "ai-blogger-agent",
    ],
    ],
  },
];
