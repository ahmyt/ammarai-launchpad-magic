import type { Tool } from "./types";

export const agentTools: Tool[] = [
  {
    slug: "ai-agent-builder",
    name: "AI Agent Builder",
    category: "AI Agents",
    summary:
      "Build agents that run real workflows on a schedule or trigger — reading, deciding and acting without you.",
    title: "AI Agent Builder: Automate Real Workflows | AmmarAI",
    description:
      "Build AI agents that run on a schedule or a trigger, read your data, make decisions and complete multi-step work without supervision.",
    h1: "Build an agent that does the work, not just the writing",
    lede: "Describe the job in plain language, connect the tools it needs, and set when it should run. The agent then works through the steps on its own — reading, deciding and acting — and reports back when it is done.",
    ctaLabel: "Build an agent",
    featured: true,
    recent: true,
    what: [
      "An AI agent is different from a generator. A generator answers one prompt and stops. An agent has a goal, a set of tools and permission to take several steps in order — look something up, decide what it means, do the next thing — until the goal is met or it needs you.",
      "The Agent Builder gives you that without code. You write the instructions the way you would brief a new assistant, choose which tools and data it may touch, and decide whether it runs on a schedule, on an event, or when you ask. Every run is logged step by step so you can see exactly what it did and why.",
    ],
    canDo: [
      "Describe an agent's job in plain language instead of building a flowchart",
      "Give it tools: web search, your documents, email, calendar, spreadsheets and other AmmarAI tools",
      "Run it on a schedule, on a trigger, or on demand",
      "Chain several steps so one result feeds the next",
      "Require your approval before sensitive actions like sending or paying",
      "Read the full step-by-step log of every run",
    ],
    how: [
      {
        title: "Describe the job",
        body: "Write what the agent is for, what a good result looks like, and what it must never do.",
      },
      {
        title: "Give it tools and data",
        body: "Connect only what the job needs — search, files, inbox, calendar or another AmmarAI tool.",
      },
      {
        title: "Choose when it runs",
        body: "On a schedule, when something happens, or only when you press the button.",
      },
      {
        title: "Test, then let it loose",
        body: "Watch a run end to end, tighten the instructions, then leave it working.",
      },
    ],
    examples: [
      {
        label: "Morning briefing agent",
        input:
          "Every weekday at 7am: read my inbox and calendar, check yesterday's sales, and post a short briefing to Slack.",
        output:
          "Ran in 8.9 seconds. Flagged 6 emails needing replies, spotted a 14:00 calendar clash, reported 18 orders worth £2,140, and posted the briefing to #team-daily.",
      },
      {
        label: "Inbox triage agent",
        input:
          "When a customer email arrives, look up their account, draft a reply from our policies, and hold it for my approval.",
        output:
          "Reply drafted in 4.9 seconds with both upgrade options and the renewal date, held for approval, and a notification sent to Telegram. Nothing sent without a tap.",
      },
    ],
    capabilities: [
      {
        title: "Multi-step reasoning",
        body: "The agent plans the order of work itself and adjusts when a step returns something unexpected.",
      },
      {
        title: "Tool access you control",
        body: "It can only use the tools and data you connect — nothing else is reachable.",
      },
      {
        title: "Approval gates",
        body: "Mark any action as needing sign-off, so sending, spending and deleting stay in your hands.",
      },
      {
        title: "Readable run logs",
        body: "Every run is recorded step by step, with what it read, what it decided and what it changed.",
      },
    ],
    audiences: [
      {
        who: "Small business owners",
        why: "Hand off the repeated admin that eats the first hour of every day.",
      },
      {
        who: "Operations teams",
        why: "Turn documented processes into something that actually runs on time.",
      },
      {
        who: "Agencies",
        why: "Build one agent per client workflow and run them all from the same place.",
      },
    ],
    useCases: [
      {
        title: "Daily reporting",
        body: "Collect numbers from several places every morning and deliver one short, readable summary.",
      },
      {
        title: "Lead follow-up",
        body: "Watch for new enquiries, research the company, draft a tailored first reply and queue it for approval.",
      },
      {
        title: "Content pipeline",
        body: "Research a topic, draft the piece, check it, and file it for review on a weekly cycle.",
      },
    ],
    tips: [
      "Write the instructions like a briefing for a new hire: goal, boundaries, what good looks like.",
      "Start with one narrow job. Broad agents drift; narrow agents are reliable.",
      "Keep approval on anything that sends, spends or deletes until you trust the run log.",
      "Read the first five runs in full before increasing the schedule.",
    ],
    mistakes: [
      "Giving one agent five unrelated jobs instead of building five small ones.",
      "Connecting every tool 'just in case' — more access means more ways to go wrong.",
      "Skipping the test runs and finding out from a customer.",
      "Writing vague instructions and expecting judgement the agent was never given.",
    ],
    faqs: [
      {
        q: "Do I need to know how to code?",
        a: "No. You describe the job in plain language and pick the tools it may use. There is no flowchart to draw and no script to write.",
      },
      {
        q: "Can it act without asking me?",
        a: "Only where you allow it. Any step can be marked as requiring approval, and sensitive actions are gated by default.",
      },
      {
        q: "What happens if a step fails?",
        a: "The agent retries where it makes sense, then stops and reports what went wrong instead of guessing its way forward.",
      },
      {
        q: "Can several agents run at once?",
        a: "Yes. Each agent has its own instructions, tools and schedule, and they run independently.",
      },
    ],
    related: ["ai-blogger-agent", "ai-social-media-agent", "ai-crm", "ai-phone-agent", "ai-chat"],
  },
  {
    slug: "ai-phone-agent",
    name: "AI Phone Call Agent",
    category: "AI Agents",
    summary:
      "A voice agent that answers and makes real phone calls, books appointments and logs every conversation.",
    title: "AI Phone Call Agent: Answer and Make Calls | AmmarAI",
    description:
      "A natural-sounding AI voice agent that answers inbound calls, makes outbound calls, books appointments and logs every conversation.",
    h1: "Every call answered, on the second ring",
    lede: "A voice agent that picks up the phone, holds a normal conversation, books the appointment, answers the common questions and writes the whole thing into your records — day, night and weekends.",
    ctaLabel: "Set up a phone agent",
    featured: true,
    recent: true,
    what: [
      "Missed calls are missed revenue, and most of them are the same handful of questions: opening hours, availability, price, where you are. The phone agent handles those in a natural voice, at any hour, without a queue and without a menu tree.",
      "It works both directions. Inbound, it answers, understands what the caller wants and completes the task. Outbound, it calls a list — follow-ups, reminders, qualification — and passes anything real to a person. Every call ends with a transcript, a summary and the record updated.",
    ],
    canDo: [
      "Answer inbound calls in a natural voice, with no phone menu",
      "Book, move and cancel appointments in your live calendar",
      "Answer routine questions from your own information",
      "Make outbound follow-up, reminder and qualification calls",
      "Transfer to a human the moment the caller needs one",
      "Log a transcript, summary and next step against the contact",
    ],
    how: [
      {
        title: "Give it a number",
        body: "Use a new number or forward your existing one to the agent.",
      },
      {
        title: "Tell it what it handles",
        body: "Opening hours, services, prices, booking rules and when to pass the call to a person.",
      },
      {
        title: "Pick the voice",
        body: "Choose the voice, pace and greeting so it sounds like your business, not a robot.",
      },
      {
        title: "Go live and review",
        body: "Read the first transcripts, tighten the answers, and let it take the load.",
      },
    ],
    examples: [
      {
        label: "Inbound booking",
        input: "A caller wants a dental check-up on Thursday morning.",
        output:
          "Answered in two rings, offered 9:20 and 11:05, booked 9:20, texted the confirmation and saved the call summary to the CRM. Total call: 41 seconds.",
      },
      {
        label: "Outbound qualification",
        input: "Call the leads who downloaded the pricing guide yesterday.",
        output:
          "Reached Sam, established a 12-seat support team, matched them to the Team plan and booked a 30-minute demo with Aisha on Tuesday. Deal updated with the transcript.",
      },
    ],
    capabilities: [
      {
        title: "Natural conversation",
        body: "It handles interruptions, hesitation and changes of mind rather than reading a script at people.",
      },
      {
        title: "Live calendar booking",
        body: "It offers real availability and writes the appointment straight into the calendar.",
      },
      {
        title: "Clean handover",
        body: "When a call needs a person, it transfers with the context already gathered.",
      },
      {
        title: "Full call records",
        body: "Recording, transcript, summary and outcome saved against the right contact automatically.",
      },
    ],
    audiences: [
      {
        who: "Clinics and salons",
        why: "Take bookings while the team is with clients and the phone would otherwise ring out.",
      },
      {
        who: "Trades and service businesses",
        why: "Never lose a job because you were up a ladder when they called.",
      },
      {
        who: "Sales teams",
        why: "Qualify inbound interest and run follow-up calls at a volume people cannot.",
      },
    ],
    useCases: [
      {
        title: "After-hours cover",
        body: "Answer evenings and weekends, book what can be booked and flag the rest for the morning.",
      },
      {
        title: "Appointment reminders",
        body: "Call the day before, confirm or rebook, and cut no-shows without staff time.",
      },
      {
        title: "Overflow answering",
        body: "Pick up when everyone is already on a call, so nothing goes to voicemail.",
      },
    ],
    tips: [
      "Write out the ten questions you actually get asked and give it those answers first.",
      "Be explicit about when to transfer — complaints and anything about money are good defaults.",
      "Listen to the first twenty calls; small wording changes fix most awkward moments.",
      "Tell callers they can ask for a person at any time.",
    ],
    mistakes: [
      "Letting it handle complaints or refunds instead of transferring them.",
      "Loading it with marketing language when callers want a straight answer.",
      "Leaving booking rules vague, so it offers slots you cannot staff.",
      "Never reading the transcripts, then wondering why bookings dip.",
    ],
    faqs: [
      {
        q: "Does it sound like a robot?",
        a: "No. It speaks in a natural voice with normal pacing and handles interruptions, so most callers treat it as a conversation.",
      },
      {
        q: "Can it use my existing phone number?",
        a: "Yes. You can forward your current number to the agent, or give it a new one and keep the old line for staff.",
      },
      {
        q: "What if it cannot help the caller?",
        a: "It transfers to a person, or takes a message with the details already captured, depending on the rules you set.",
      },
      {
        q: "Do I get a record of calls?",
        a: "Every call produces a recording, transcript, short summary and an outcome saved against the contact.",
      },
    ],
    related: ["ai-crm", "ai-agent-builder", "ai-chat-bots", "ai-voice-generator", "ai-transcription"],
  },
  {
    slug: "ai-crm",
    name: "AI CRM",
    category: "AI Sales & CRM",
    summary:
      "A CRM you talk to: ask about the pipeline, update deals and get reports without touching a spreadsheet.",
    title: "AI CRM: Manage Your Pipeline by Asking | AmmarAI",
    description:
      "A CRM you run by asking. Track contacts and deals, update records in plain language, and get pipeline reports without spreadsheets.",
    h1: "A CRM that answers you instead of asking you to fill in fields",
    lede: "Contacts, deals and pipeline in one place — with an assistant on top that you can simply ask. Move a deal, book a follow-up, or get March's numbers as a sentence rather than a saved view.",
    ctaLabel: "Open the CRM",
    featured: true,
    recent: true,
    what: [
      "Most CRMs fail for the same reason: keeping them updated is work, so nobody does it, and then the data is not worth reading. This one is built to be updated by talking to it — say what happened and the record changes.",
      "The same assistant answers questions about what is in there. Which deals went quiet, what closed last month, where the pipeline is stuck, which source converts. You get the answer directly, and you can ask it from the dashboard or from WhatsApp and Telegram while you are out.",
    ],
    canDo: [
      "Track contacts, companies, deals and pipeline stages",
      "Update records by describing what happened, in plain language",
      "Ask questions about the pipeline and get direct answers",
      "Get monthly summaries, win rates and source performance without exports",
      "Create tasks and follow-ups from a sentence",
      "Work with it from WhatsApp or Telegram as well as the dashboard",
    ],
    how: [
      {
        title: "Bring your contacts in",
        body: "Import a spreadsheet or add contacts as they come — the fields are already set up.",
      },
      {
        title: "Set your stages",
        body: "Name the pipeline stages the way your business actually sells.",
      },
      {
        title: "Talk to it after calls",
        body: "Say what happened and the deal, notes and next step update themselves.",
      },
      {
        title: "Ask for the numbers",
        body: "Request a summary whenever you need one, instead of building a report.",
      },
    ],
    examples: [
      {
        label: "Chasing quiet deals",
        input: "Which deals have gone quiet for more than two weeks?",
        output:
          "Five deals: Northgate £8.4k, Vella £3.2k, Orbit £12k, Farrow £1.9k, Pike £6k. Moving Orbit to Negotiation and creating a call task for Friday 10:00 puts £31.5k in Negotiation.",
      },
      {
        label: "Month in review",
        input: "Summarise March and tell me what changed.",
        output:
          "Closed £48,200 across 21 deals, up 14% on February. Win rate 31%. Average deal size down from £2,600 to £2,295. Referrals converted at 46%, paid search at 12%.",
      },
    ],
    capabilities: [
      {
        title: "Plain-language updates",
        body: "Describe the call; the stage, note and follow-up are written for you.",
      },
      {
        title: "Answers, not dashboards",
        body: "Ask a question about the pipeline and get the number with the context around it.",
      },
      {
        title: "Reports on demand",
        body: "Monthly summaries, win rates and source breakdowns generated from live records.",
      },
      {
        title: "Messaging access",
        body: "Update and query the CRM from WhatsApp or Telegram between meetings.",
      },
    ],
    audiences: [
      {
        who: "Founders selling directly",
        why: "Keep a real pipeline without the admin that makes you abandon CRMs.",
      },
      {
        who: "Small sales teams",
        why: "One shared view of every deal, updated because updating is finally easy.",
      },
      {
        who: "Service businesses",
        why: "Track enquiries from first contact to booked job without a spreadsheet.",
      },
    ],
    useCases: [
      {
        title: "Pipeline review",
        body: "Ask what moved, what stalled and what needs chasing before the weekly meeting.",
      },
      {
        title: "Post-call logging",
        body: "Say what was agreed straight after the call and let the record and task write themselves.",
      },
      {
        title: "Board reporting",
        body: "Turn the month's real records into a summary or a short deck you can send.",
      },
    ],
    tips: [
      "Name stages after what has actually happened, not how hopeful you feel.",
      "Log the call while you are still in the car — one sentence is enough.",
      "Ask for quiet deals weekly; it is the cheapest revenue you will find.",
      "Keep one pipeline until it hurts, then split it.",
    ],
    mistakes: [
      "Importing ten years of dead contacts and burying the live ones.",
      "Adding custom fields nobody fills in.",
      "Only updating deals when they close, which makes forecasts fiction.",
      "Treating the summary as the truth without checking the underlying deals.",
    ],
    faqs: [
      {
        q: "Can I import my existing contacts?",
        a: "Yes. Bring in a spreadsheet and map the columns; you can keep adding contacts manually afterwards.",
      },
      {
        q: "Do I have to use the chat, or can I edit records normally?",
        a: "Both. Everything can be edited in the interface; the assistant is a faster way to do the same thing.",
      },
      {
        q: "Can it work from WhatsApp?",
        a: "Yes. You can ask questions and log updates from WhatsApp or Telegram and they land in the same records.",
      },
      {
        q: "Where do the reports come from?",
        a: "They are generated from your live deals and contacts at the moment you ask, not from a stale export.",
      },
    ],
    related: ["ai-phone-agent", "ai-agent-builder", "ai-chat-bots", "ai-email-writer", "ai-chat"],
  },
  {
    slug: "ai-social-media-agent",
    name: "AI Social Media Agent",
    category: "AI Agents",
    summary:
      "An agent that plans, writes, schedules and adjusts a month of social posts across your accounts.",
    title: "AI Social Media Agent: Plan, Post, Adjust | AmmarAI",
    description:
      "An AI agent that plans a month of social posts, writes them, schedules them across your accounts and adapts to what performs.",
    h1: "A month of social posts, planned and scheduled while you sleep",
    lede: "Give it your brand, your accounts and how often you want to post. It builds the calendar, writes every caption, schedules them at the right times, and changes the plan based on what actually performed.",
    ctaLabel: "Plan a month",
    featured: true,
    recent: true,
    what: [
      "Consistency is what makes social media work, and consistency is exactly what busy people run out of. The Social Media Agent takes the whole cycle — plan, write, schedule, review — and runs it on repeat.",
      "It is not a bulk caption generator. It maps out a month with a mix of themes, writes each post for the platform it is going on, spaces them sensibly, and then reads the results. Posts that work shape next week's plan; posts that do not, quietly stop appearing.",
    ],
    canDo: [
      "Build a monthly content calendar from your brand and goals",
      "Write captions and hashtags tailored per platform",
      "Suggest or generate the image or video direction for each post",
      "Schedule posts across Instagram, TikTok, Facebook, LinkedIn and X",
      "Review performance weekly and adjust the plan",
      "Hold everything for approval if you want the final say",
    ],
    how: [
      {
        title: "Describe the brand",
        body: "What you sell, who buys it, and the tone you want to sound like.",
      },
      {
        title: "Connect your accounts",
        body: "Link the platforms you post to and set how often each one should get content.",
      },
      {
        title: "Approve the plan",
        body: "Review the month it proposes and change anything before a word is written.",
      },
      {
        title: "Let it run and learn",
        body: "It posts on schedule, reads the numbers weekly and adjusts what comes next.",
      },
    ],
    examples: [
      {
        label: "Month one",
        input: "Sustainable skincare brand, three posts a week, warm and plain-spoken.",
        output:
          "12 posts mapped: 4 education, 4 product, 4 community. Captions, hashtags and image directions drafted, scheduled for Instagram Tue 18:40, TikTok Thu 20:10 and LinkedIn Wed 08:15.",
      },
      {
        label: "Weekly adjustment",
        input: "Review last week and update the plan.",
        output:
          "41.2k views and 2,180 engagements. Behind-the-scenes clips beat product shots by 240%; posts after 20:00 lost half their reach. Next week: four behind-the-scenes posts, all moved to 18:30.",
      },
    ],
    capabilities: [
      {
        title: "Real calendar planning",
        body: "A balanced mix of themes across the month, not thirty variations of the same post.",
      },
      {
        title: "Per-platform writing",
        body: "The same idea written differently for LinkedIn, Instagram and TikTok, because they are different rooms.",
      },
      {
        title: "Performance feedback loop",
        body: "Weekly analysis feeds directly into what gets planned next.",
      },
      {
        title: "Approval workflow",
        body: "Auto-publish when you trust it, or keep everything queued for a quick review.",
      },
    ],
    audiences: [
      {
        who: "Small brands without a social manager",
        why: "Stay consistent without giving up an afternoon a week.",
      },
      {
        who: "Agencies",
        why: "Run several client calendars in parallel and review instead of drafting.",
      },
      {
        who: "Solo founders",
        why: "Keep a presence going through the weeks when everything else is on fire.",
      },
    ],
    useCases: [
      {
        title: "Always-on brand presence",
        body: "A steady stream of on-brand posts that keeps going when you get busy.",
      },
      {
        title: "Launch campaigns",
        body: "A build-up, launch and follow-up sequence planned across every account at once.",
      },
      {
        title: "Client content",
        body: "A separate agent per client, each with its own voice, accounts and cadence.",
      },
    ],
    tips: [
      "Give it three example posts you liked — tone copies faster than it describes.",
      "Let it run four full weeks before judging; consistency compounds slowly.",
      "Keep approval on for the first month, then loosen it per platform.",
      "Tell it what you will never post about, not just what you will.",
    ],
    mistakes: [
      "Rewriting every caption by hand, which removes the point of the agent.",
      "Posting the identical text to every platform.",
      "Changing the strategy every week before there is enough data to read.",
      "Ignoring the weekly review and letting a losing format keep running.",
    ],
    faqs: [
      {
        q: "Which platforms does it post to?",
        a: "Instagram, TikTok, Facebook, LinkedIn and X, with per-platform cadence and per-platform wording.",
      },
      {
        q: "Do posts go out without my approval?",
        a: "Only if you allow it. You can keep everything in a review queue and publish with one tap.",
      },
      {
        q: "Does it make the images and videos too?",
        a: "It plans the visual for every post and can generate it using the image and video tools in AmmarAI.",
      },
      {
        q: "How does it know what is working?",
        a: "It reads reach and engagement from the connected accounts each week and shifts the plan towards what performed.",
      },
    ],
    related: [
      "ai-blogger-agent",
      "ai-agent-builder",
      "instagram-caption-generator",
      "ai-image-generator",
      "video-script-generator",
    ],
  },
  {
    slug: "ai-blogger-agent",
    name: "AI Blogger Agent",
    category: "AI Agents",
    summary:
      "An agent that researches keywords, writes SEO articles in bulk and publishes them to your blog on a schedule.",
    title: "AI Blogger Agent: Research, Write, Publish | AmmarAI",
    description:
      "An AI agent that researches keywords, writes SEO-ready articles in bulk and publishes them to WordPress on a schedule.",
    h1: "A blog that publishes itself, week after week",
    lede: "Give it a topic and a cadence. It researches what people actually search for, writes the articles properly, links them to each other, and publishes them to your blog on schedule — titles, meta descriptions and alt text included.",
    ctaLabel: "Queue a month of posts",
    featured: true,
    recent: true,
    what: [
      "Search traffic rewards publishing regularly over a long time, which is precisely the thing that stops. The Blogger Agent removes the stopping: you set the topic and the rhythm, and posts keep arriving.",
      "It starts with research, not writing. It finds the terms with real demand, maps each article to one clear search intent so your posts do not compete with each other, then writes with headings, internal links and FAQs in place. Each piece goes out finished, not as a draft you have to repair.",
    ],
    canDo: [
      "Research keywords and pick topics with genuine search demand",
      "Plan a batch of articles that do not overlap or cannibalise each other",
      "Write full posts with headings, tables, FAQs and internal links",
      "Set titles, meta descriptions and image alt text automatically",
      "Publish to WordPress directly, or hold posts for review",
      "Keep publishing on a weekly or daily schedule without prompting",
    ],
    how: [
      {
        title: "Give it a topic",
        body: "One subject area, plus who you are writing for and roughly how long posts should be.",
      },
      {
        title: "Let it research",
        body: "It checks live sources and search demand, then proposes the article list.",
      },
      {
        title: "Approve the plan",
        body: "Cut, add or reorder topics before anything is written.",
      },
      {
        title: "Publish on schedule",
        body: "Posts go live automatically, or wait in review if you prefer to read first.",
      },
    ],
    examples: [
      {
        label: "Bulk run",
        input: "Home EV charging. Twelve posts, one every Tuesday.",
        output:
          "38 live sources checked, 12 keywords chosen with real demand, each mapped to one intent. Twelve articles of 1,400–1,900 words written with internal links; post one live, posts two to twelve scheduled weekly.",
      },
      {
        label: "Single scheduled post",
        input: "Publish the next post in the queue at 6am.",
        output:
          "\"How much does it cost to charge an EV at home?\" — 1,620 words, comparison table, six FAQs, three internal links, 54-character title, 148-character meta. Live at 06:00 with a featured image.",
      },
    ],
    capabilities: [
      {
        title: "Keyword-led planning",
        body: "Topics come from what people search for, with one intent per article so posts do not compete.",
      },
      {
        title: "Bulk generation",
        body: "Plan and produce a month of posts in one run instead of one at a time.",
      },
      {
        title: "Direct publishing",
        body: "Push straight to WordPress with the SEO fields and featured image already set.",
      },
      {
        title: "Internal linking",
        body: "New posts link to your existing ones, which is where most auto-published blogs fall down.",
      },
    ],
    audiences: [
      {
        who: "Small businesses",
        why: "Build search traffic without hiring a writer or finding the time yourself.",
      },
      {
        who: "Agencies",
        why: "Keep client blogs publishing consistently at a cost that works.",
      },
      {
        who: "Affiliate and niche site owners",
        why: "Cover a topic thoroughly and quickly, with the internal links joining it up.",
      },
    ],
    useCases: [
      {
        title: "Topic cluster build-out",
        body: "Cover one subject properly with a set of linked posts aimed at different questions.",
      },
      {
        title: "Steady publishing",
        body: "One researched post a week, indefinitely, without anyone remembering to do it.",
      },
      {
        title: "Refresh runs",
        body: "Revisit older posts, update the facts and republish them.",
      },
    ],
    tips: [
      "Give it your product pages so internal links point somewhere that earns money.",
      "Ask for fewer, longer posts rather than many thin ones.",
      "Read the first three published pieces closely and correct the tone once.",
      "Keep a review queue for anything involving prices or regulated claims.",
    ],
    mistakes: [
      "Queueing a hundred posts on day one and flooding a new site.",
      "Letting it invent statistics — ask for sourced figures or none.",
      "Publishing several posts aimed at the same search term.",
      "Never reading the output, then finding the tone drifted months ago.",
    ],
    faqs: [
      {
        q: "Does it publish to WordPress automatically?",
        a: "Yes. Connect the site and posts go live on schedule with titles, meta descriptions and featured images set, or wait in review if you prefer.",
      },
      {
        q: "How does it choose topics?",
        a: "It researches search demand and live sources first, then maps each article to a single search intent so your posts do not compete with each other.",
      },
      {
        q: "Will the posts read as machine-written?",
        a: "They are structured and edited to read as ordinary articles, and you can set the tone with a few examples. Reviewing the first few is still worth doing.",
      },
      {
        q: "Can I use it for more than one site?",
        a: "Yes. Run a separate agent per site, each with its own topic, tone, cadence and publishing target.",
      },
    ],
    related: [
      "ai-article-generator",
      "ai-social-media-agent",
      "ai-agent-builder",
      "ai-seo-content-generator",
      "ai-blog-generator",
    ],
  },
];
