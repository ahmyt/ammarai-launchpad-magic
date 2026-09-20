import type { UseCase } from "./types";

export const industryUseCases: UseCase[] = [
  {
    slug: "ai-for-healthcare-clinics",
    name: "AI for Healthcare Clinics",
    audience: "Clinics and Private Practices",
    title: "AI for Clinics: Patient Communication and Admin | AmmarAI",
    description:
      "AmmarAI helps clinics and private practices handle appointment calls, patient-facing writing, review replies and routine admin, so front-desk time goes back to patients.",
    h1: "AI Tools for Clinics That Are Short on Front-Desk Time",
    lede: "Most clinics don't have a marketing team or a spare receptionist. They have a phone that rings during appointments and a pile of patient-facing writing nobody has time for.",
    summary: "Answer routine calls, keep patient-facing content current and clear the admin writing a small practice never gets to.",
    intro: [
      "A private practice runs on a small team doing many jobs at once. The phone rings while a patient is being checked in, the website still describes services the clinic stopped offering two years ago, and online reviews sit unanswered because nobody owns that task. None of it is clinical work, and all of it affects whether new patients choose the practice.",
      "AmmarAI is used in clinics for the administrative and communication layer around care — not for care itself. It answers routine inbound calls, drafts the plain-language explanations and service pages patients read, replies to reviews, and turns dictated notes into clean text. Anything that touches diagnosis, treatment advice or patient records belongs with your clinicians and your existing compliant systems.",
    ],
    challenges: [
      {
        title: "The phone rings during appointments",
        body: "Calls about opening hours, parking, insurance or booking a routine appointment arrive at the worst moment, and missed calls quietly become lost patients.",
      },
      {
        title: "Patient-facing writing is always out of date",
        body: "Service pages, intake instructions and pre-appointment emails get written once and then never revisited, even after the practice changes what it offers.",
      },
      {
        title: "Reviews go unanswered",
        body: "Online reviews strongly influence which clinic a new patient picks, but writing a careful, non-defensive reply to each one is a task that never reaches the top of the list.",
      },
      {
        title: "Admin writing competes with patient time",
        body: "Newsletters, recall reminders, seasonal health notices and referral letters all need writing, and every hour spent on them is an hour not spent with patients.",
      },
    ],
    workflows: [
      {
        title: "Routine call handling",
        body: "Let the AI Phone Agent answer calls about hours, location, services and appointment booking using answers you approve in advance, and hand anything clinical or unusual straight to your staff.",
      },
      {
        title: "Plain-language patient information",
        body: "Turn a clinician's rough notes into a clear pre-appointment instruction sheet or aftercare explanation that a patient can actually follow, then have the clinician review before it is sent.",
      },
      {
        title: "Service pages that match the practice",
        body: "Rewrite each treatment or service page so it describes what the clinic offers today, in language patients search with rather than clinical shorthand.",
      },
      {
        title: "Review replies in one sitting",
        body: "Batch the month's reviews and draft a measured reply to each one that thanks the patient and never discusses any clinical detail, then approve and post.",
      },
      {
        title: "Recall and reminder emails",
        body: "Draft the seasonal check-up reminder, the recall message and the new-patient welcome email once, then reuse the structure each cycle instead of rewriting from scratch.",
      },
    ],
    toolkit: [
      {
        slug: "ai-phone-agent",
        why: "Routine calls about hours, directions and booking are the biggest interruption in a small practice, and they can be answered without pulling staff away from patients.",
      },
      {
        slug: "review-responder",
        why: "Review replies affect how a new patient judges the clinic, and drafting careful, non-defensive responses in batches makes the task realistic.",
      },
      {
        slug: "services-page-generator",
        why: "Treatment and service pages are what prospective patients read first, and they need to describe the practice as it is today.",
      },
      {
        slug: "welcome-email-generator",
        why: "New-patient welcomes, pre-appointment instructions and recall reminders are recurring emails that are easy to plan and hard to sit down and write.",
      },
      {
        slug: "ai-rephraser",
        why: "Clinical wording often needs to be rewritten into plain language a patient can follow without a medical background.",
      },
      {
        slug: "ai-speech-to-text",
        why: "Dictated admin notes turn into clean written text without a second pass of typing.",
      },
      {
        slug: "ai-proofreader",
        why: "Patient-facing writing reflects on the practice, so a quick check before anything is published or sent is worth the minute it takes.",
      },
      {
        slug: "ai-blogger-agent",
        why: "A steady stream of local health articles keeps the clinic visible in search without a staff member writing one every week.",
      },
    ],
    outcomes: [
      "Fewer calls go unanswered during busy clinic hours, so routine bookings stop turning into missed patients.",
      "Service and treatment pages describe what the practice actually offers, in language patients search with.",
      "Reviews get a considered reply instead of silence, which is what prospective patients notice.",
      "Pre-appointment and recall emails get sent on time because drafting them is no longer the bottleneck.",
      "Administrative writing takes less of the day, leaving more of it for patients.",
    ],
    faqs: [
      {
        q: "Can AmmarAI give medical advice to patients?",
        a: "No, and it should not be used that way. It handles administrative and communication work — call answering for routine questions, patient-facing writing, review replies and admin drafts. Anything clinical stays with your clinicians.",
      },
      {
        q: "Is it safe to use with patient data?",
        a: "Do not put identifiable patient information into it. Use it for general, non-identifiable content such as service pages, instruction sheets and review replies, and keep patient records in the compliant systems you already use.",
      },
      {
        q: "What happens when the phone agent gets a question it should not answer?",
        a: "You decide in advance what it is allowed to handle. Anything outside that, including clinical questions, is passed to your staff rather than answered.",
      },
      {
        q: "Will review replies sound automated?",
        a: "They reflect what you feed in, and every reply is drafted for you to read, edit and approve before it is posted. Nothing is published on your behalf without your say-so.",
      },
    ],
  },
  {
    slug: "ai-for-law-firms",
    name: "AI for Law Firms",
    audience: "Law Firms and Solo Practitioners",
    title: "AI for Law Firms: Client Intake, Content, Admin | AmmarAI",
    description:
      "AmmarAI helps law firms and solo practitioners handle intake calls, practice-area pages, client updates and long-document review, without touching legal advice.",
    h1: "AI Tools for Firms Where Billable Hours Are the Bottleneck",
    lede: "Every hour a lawyer spends rewriting a practice-area page or chasing an intake call is an hour that was never going to be billed. That is the work AmmarAI is for.",
    summary: "Capture intake calls, keep practice-area content current and cut the reading and drafting load around client work.",
    intro: [
      "In a small firm the same people who handle cases also answer the phone, update the website, write the client newsletter and read the two-hundred-page document that arrived on Friday. The non-billable layer around legal work is enormous, and it is usually done late in the evening or not at all.",
      "AmmarAI is used for that layer. It answers intake calls with questions you define, drafts and refreshes the marketing content that brings clients in, summarizes long documents so a lawyer knows where to read closely, and cleans up routine client correspondence. It does not give legal advice, and its output is not a substitute for a lawyer's review.",
    ],
    challenges: [
      {
        title: "Intake calls arrive when nobody can answer",
        body: "A potential client who reaches voicemail usually calls the next firm on the list, and after-hours enquiries are exactly when many people make that first call.",
      },
      {
        title: "Practice-area pages are thin and rarely updated",
        body: "The pages that decide whether a firm is found and trusted online are the ones nobody has the billable time to rewrite.",
      },
      {
        title: "Long documents have to be read under deadline",
        body: "Discovery bundles, contracts and correspondence threads need to be understood quickly enough to know where the important parts are.",
      },
      {
        title: "Client communication slips",
        body: "Status updates, matter summaries and follow-up emails are easy to postpone when case work is urgent, and silence is the most common client complaint.",
      },
    ],
    workflows: [
      {
        title: "After-hours intake capture",
        body: "Let the AI Phone Agent answer, ask your standard intake questions, take contact details and the nature of the matter, and pass a complete summary to the firm — no legal guidance given, no advice implied.",
      },
      {
        title: "Practice-area page refresh",
        body: "Rewrite each practice-area page so it explains the service in client language, then have a lawyer review it for accuracy and any advertising rules that apply in your jurisdiction.",
      },
      {
        title: "First-pass document review",
        body: "Summarize a long document to locate the sections that need close reading, then read those sections properly. The summary orients you; it never replaces the reading.",
      },
      {
        title: "Client update routine",
        body: "Draft matter status updates and follow-up emails from short notes, so clients hear from the firm on a regular rhythm instead of only when something goes wrong.",
      },
      {
        title: "Enquiry tracking",
        body: "Keep every enquiry, call summary and follow-up in the AI CRM so no potential client falls through the gap between the phone and the case management system.",
      },
    ],
    toolkit: [
      {
        slug: "ai-phone-agent",
        why: "First contact usually happens by phone, and a missed intake call is a client who calls the next firm instead.",
      },
      {
        slug: "ai-document-analyzer",
        why: "Long documents need a fast first pass to show where the careful reading should go.",
      },
      {
        slug: "services-page-generator",
        why: "Practice-area pages carry most of a firm's search visibility and are the pages least likely to get billable attention.",
      },
      {
        slug: "reply-email-generator",
        why: "Routine client correspondence and follow-ups are constant, and drafting them quickly keeps communication from slipping.",
      },
      {
        slug: "ai-crm",
        why: "Enquiries and follow-ups stay in one place, so intake is tracked rather than remembered.",
      },
      {
        slug: "bullet-point-answer-generator",
        why: "Turning a long thread or report into key points makes preparation faster before a call or meeting.",
      },
      {
        slug: "ai-proofreader",
        why: "Anything a firm publishes or sends reflects on it, so a clean check before it goes out is worth the time.",
      },
      {
        slug: "article-wizard",
        why: "Explainer articles on common client questions are a proven way for firms to be found, and the blank page is what stops them being written.",
      },
    ],
    outcomes: [
      "After-hours and overflow enquiries get captured instead of going to voicemail.",
      "Practice-area pages stay current and readable, which is what prospective clients judge first.",
      "Long documents get triaged faster, so close reading goes where it matters.",
      "Clients hear from the firm on a regular rhythm rather than only at milestones.",
      "Non-billable admin takes a smaller share of the week.",
    ],
    faqs: [
      {
        q: "Can AmmarAI give legal advice or draft legal documents?",
        a: "No. It is for intake, marketing content, correspondence and document triage. Any legal analysis, advice or filing must be produced and reviewed by a qualified lawyer.",
      },
      {
        q: "Is it safe for confidential client material?",
        a: "Treat it as you would any external service: avoid putting privileged or identifying client material into it, and keep case files in the systems your firm already approves.",
      },
      {
        q: "Do document summaries replace reading the document?",
        a: "No. A summary shows you where to look. The lawyer still reads the parts that matter, and the summary should never be relied on as an accurate account of the whole document.",
      },
      {
        q: "What about legal advertising rules?",
        a: "Marketing copy it drafts is a starting point. Jurisdictions differ on what firms may claim, so a lawyer should review anything published under the firm's name.",
      },
    ],
  },
  {
    slug: "ai-for-restaurants",
    name: "AI for Restaurants and Hospitality",
    audience: "Restaurants, Cafés and Hospitality",
    title: "AI for Restaurants: Bookings, Social, Reviews | AmmarAI",
    description:
      "AmmarAI helps restaurants, cafés and hospitality venues answer booking calls, post daily social content, reply to reviews and shoot menu photography.",
    h1: "AI Tools for Venues Where Nobody Has Time to Post",
    lede: "Service runs from open to close, and marketing happens in whatever minutes are left over. AmmarAI fills those minutes so the venue stays visible.",
    summary: "Answer booking calls, keep social posting daily, reply to reviews and produce menu photography without a marketing hire.",
    intro: [
      "A restaurant's marketing competes directly with service. The phone rings through the dinner rush, the Instagram account goes quiet for three weeks, and the last review reply was written in spring. Meanwhile customers decide where to eat based on exactly those signals.",
      "AmmarAI is used in hospitality to keep that visible layer running: answering booking and enquiry calls, producing daily posts about specials and events, replying to reviews in the venue's own tone, and turning phone photos of dishes into presentable images. It does not run your kitchen or your booking system — it keeps the customer-facing surface alive while the team runs service.",
    ],
    challenges: [
      {
        title: "Booking calls arrive during service",
        body: "The busiest hour for calls is the busiest hour on the floor, and every unanswered booking enquiry is a table that goes to another venue.",
      },
      {
        title: "Social goes quiet for weeks",
        body: "Daily specials, events and seasonal menus are exactly the content that works, and exactly the content nobody has time to write and post.",
      },
      {
        title: "Reviews pile up unanswered",
        body: "Diners read review replies as closely as reviews, and a defensive or absent response costs more bookings than the original complaint.",
      },
      {
        title: "Food photos look like phone photos",
        body: "Good imagery drives bookings, but a proper photoshoot is an expense most independent venues cannot justify more than once.",
      },
    ],
    workflows: [
      {
        title: "Booking and enquiry line",
        body: "Let the AI Phone Agent handle calls about opening hours, location, dietary options and table availability with answers you approve, and pass anything unusual to the floor manager.",
      },
      {
        title: "Daily specials post",
        body: "Turn today's specials board into a caption for Instagram and Facebook in a couple of minutes, and let the social agent post it on the schedule you set.",
      },
      {
        title: "Menu photography",
        body: "Shoot a dish on a phone, then produce a cleaner, better-lit product image for the menu, the website and social — a presentation of the real dish, never a fabricated one.",
      },
      {
        title: "Weekly review replies",
        body: "Batch the week's reviews and draft a warm, specific reply to each, thanking regulars and addressing complaints without argument.",
      },
      {
        title: "Events and seasonal menus",
        body: "Draft the announcement, the event page copy and the follow-up posts for a seasonal menu or one-off event in a single sitting.",
      },
    ],
    toolkit: [
      {
        slug: "ai-phone-agent",
        why: "The phone rings hardest during service, and booking enquiries are the calls a venue can least afford to miss.",
      },
      {
        slug: "ai-social-media-agent",
        why: "Daily specials and event posts only work if they actually go out, and scheduling them removes the dependence on someone remembering.",
      },
      {
        slug: "review-responder",
        why: "Review replies are read by future diners, and batching them makes a consistent, non-defensive tone realistic.",
      },
      {
        slug: "ai-photoshoot",
        why: "Presentable dish photography drives bookings, and a phone photo can be turned into something menu-ready without a studio budget.",
      },
      {
        slug: "instagram-reel-script-generator",
        why: "Short-form video is where venues get discovered, and a script outline is the part that stops most owners from making one.",
      },
      {
        slug: "facebook-post-generator",
        why: "Local audiences still live on Facebook, and event and special announcements need a version written for it.",
      },
      {
        slug: "welcome-email-generator",
        why: "Regulars and event bookings are worth an email list, and the emails are easier to send when drafting them is quick.",
      },
      {
        slug: "why-choose-this-product",
        why: "Menu descriptions that make a dish sound worth ordering are writing work, and every menu change creates more of it.",
      },
    ],
    outcomes: [
      "Booking enquiries get answered during service instead of going to voicemail.",
      "Social channels post consistently, including on the weeks the team is flat out.",
      "Reviews receive a warm, timely reply, which is what prospective diners notice.",
      "Menu and social imagery looks intentional without paying for repeat photoshoots.",
      "Events and seasonal menus get promoted properly rather than mentioned once.",
    ],
    faqs: [
      {
        q: "Can the phone agent take an actual booking?",
        a: "It answers routine enquiries and captures booking requests with the details you specify, then passes them on. It is not a replacement for your reservation system.",
      },
      {
        q: "Will the food images still show my real dish?",
        a: "They start from your own photo, so the dish is yours. Use them to present the real plate well — do not use them to show food you do not serve.",
      },
      {
        q: "Do I have to approve every post?",
        a: "That is your choice. You can schedule posts to publish automatically or hold each one for approval before it goes out.",
      },
      {
        q: "How much time does this actually take each week?",
        a: "Most venues do a short weekly sitting for reviews and scheduled posts, plus a minute or two for a daily special, rather than any large block of work.",
      },
    ],
  },
  {
    slug: "ai-for-recruiting-teams",
    name: "AI for Recruiting and HR Teams",
    audience: "Recruiters and HR Teams",
    title: "AI for Recruiting: Job Ads, Screening Admin, Comms | AmmarAI",
    description:
      "AmmarAI helps recruiters and HR teams write job descriptions, keep candidate communication moving, summarize interview notes and build employer-brand content.",
    h1: "AI Tools for Recruiters Buried in Candidate Admin",
    lede: "Hiring is a communication job wearing an operations costume. Most of the delay in a pipeline is writing that nobody had time to do.",
    summary: "Write job ads faster, keep candidates informed, and turn interview notes into usable summaries.",
    intro: [
      "A recruiter's week fills with job descriptions that must be rewritten for each role, candidate emails at every stage, interview notes that never get typed up, and an employer-brand presence that exists mostly in theory. Candidates drop out of pipelines for one reason more than any other: silence.",
      "AmmarAI takes the writing load off that pipeline. It drafts job descriptions and outreach, keeps stage-by-stage candidate emails moving, turns recorded interview notes into clean summaries, and produces the careers content that makes a company worth applying to. Decisions about people stay with people — it is not used to score, rank or reject candidates.",
    ],
    challenges: [
      {
        title: "Every role needs a fresh job description",
        body: "Hiring managers send three bullet points and expect a full posting, and the recruiter writes it between interviews.",
      },
      {
        title: "Candidates go silent because recruiters do",
        body: "Stage updates, rejections and scheduling emails are individually small and collectively enormous, so they slip and candidates disengage.",
      },
      {
        title: "Interview notes never get written up",
        body: "Feedback that lives in someone's memory is feedback the hiring panel cannot compare, and reconstructing it later wastes everyone's time.",
      },
      {
        title: "Employer brand is an empty page",
        body: "Careers pages and hiring posts are the first thing a candidate reads, and they are always the last thing anyone gets around to writing.",
      },
    ],
    workflows: [
      {
        title: "Brief to job posting",
        body: "Turn a hiring manager's rough bullet points into a structured job description, then edit for the specifics only your team knows before it is published.",
      },
      {
        title: "Candidate communication cadence",
        body: "Draft the stage-update, scheduling and rejection emails once, then personalize each send so candidates hear from you at every step instead of guessing.",
      },
      {
        title: "Interview notes to summary",
        body: "Turn a recorded debrief into text, then reduce it to the points the hiring panel needs — with the recording and your own judgment as the record, not the summary.",
      },
      {
        title: "Careers content",
        body: "Write the careers page, team spotlights and hiring announcements that give candidates a reason to apply, and schedule the posts that carry them.",
      },
      {
        title: "Outreach sequences",
        body: "Draft first-contact and follow-up messages for passive candidates, personalized around the role rather than sent as one generic template.",
      },
    ],
    toolkit: [
      {
        slug: "job-description-generator",
        why: "Every open role starts with a posting, and a structured first draft removes the slowest part of opening a pipeline.",
      },
      {
        slug: "reply-email-generator",
        why: "Stage updates, scheduling and rejections are the emails that keep candidates engaged, and they are the first thing to slip.",
      },
      {
        slug: "ai-speech-to-text",
        why: "Interview debriefs and notes become written text without anyone typing them up afterwards.",
      },
      {
        slug: "bullet-point-answer-generator",
        why: "Long debriefs and candidate notes need to be reduced to what the hiring panel can actually compare.",
      },
      {
        slug: "linkedin-post-generator",
        why: "Hiring posts and employer-brand updates live on LinkedIn, and consistency matters more than polish.",
      },
      {
        slug: "services-page-generator",
        why: "A careers page is a sales page for the company, and most are written once and left alone.",
      },
      {
        slug: "welcome-email-generator",
        why: "Offer, onboarding and first-day emails set the tone of the whole employment relationship.",
      },
      {
        slug: "ai-crm",
        why: "Candidate conversations and follow-ups stay organized as the pipeline grows.",
      },
    ],
    outcomes: [
      "Roles open faster because the posting is no longer waiting on a free hour.",
      "Candidates hear back at every stage, which reduces silent drop-off.",
      "Interview feedback gets written up while it is still fresh and comparable.",
      "Careers and employer-brand content exists instead of being permanently planned.",
      "Recruiters spend more of the week talking to people and less of it typing.",
    ],
    faqs: [
      {
        q: "Can AmmarAI screen or rank candidates?",
        a: "No, and we would not recommend it. It handles writing and admin around hiring. Assessment and hiring decisions should be made by people, for both fairness and legal reasons.",
      },
      {
        q: "Will AI-written job ads sound generic?",
        a: "They reflect the brief you give them. A posting written from three vague bullet points will be vague — add the real team context, the actual problems to be solved and the salary range.",
      },
      {
        q: "Is it safe to put candidate details into it?",
        a: "Keep candidate records in your ATS. Use general, non-identifiable text when drafting, and personalize with real names at the point of sending.",
      },
      {
        q: "Does it integrate with our applicant tracking system?",
        a: "It is not an ATS integration. It produces the writing you then use in whichever system you already run.",
      },
    ],
  },
  {
    slug: "ai-for-coaches",
    name: "AI for Coaches and Course Creators",
    audience: "Coaches, Consultants and Course Creators",
    title: "AI for Coaches: Content, Courses, Client Comms | AmmarAI",
    description:
      "AmmarAI helps coaches, consultants and course creators produce lesson material, marketing content, client follow-ups and video lessons without a production team.",
    h1: "AI Tools for Coaches Who Are Also the Marketing Department",
    lede: "Coaching pays for the hours you spend with clients. Everything else — the emails, the course modules, the weekly post — is unpaid time you still have to find.",
    summary: "Build course material, keep marketing content running and handle client follow-up without hiring a team.",
    intro: [
      "A coaching or consulting business is one person doing five jobs. You deliver the sessions, write the follow-ups, build the course you have been promising for a year, record the videos, and publish enough content that new clients keep arriving. The delivery is the part you are good at; the rest is what determines whether the business grows.",
      "AmmarAI handles the production layer around your expertise. It turns your frameworks into lesson outlines and workbook material, drafts the emails and follow-ups clients expect, produces the video and audio for a course without a studio, and keeps a content rhythm going between launches. The methodology stays yours — it is a production assistant, not a source of expertise.",
    ],
    challenges: [
      {
        title: "The course never gets finished",
        body: "Turning a coaching framework into structured modules, worksheets and lesson scripts is weeks of work, and it always loses to client sessions.",
      },
      {
        title: "Marketing stops whenever client work picks up",
        body: "The feast-and-famine cycle is almost always a content cycle: posting stops when you are busy, and the pipeline empties two months later.",
      },
      {
        title: "Client follow-up eats unpaid hours",
        body: "Session recaps, action-step emails and check-ins are what make coaching stick, and they happen after hours or not at all.",
      },
      {
        title: "Video production feels out of reach",
        body: "Course videos, lesson recordings and short clips need editing, captions and thumbnails, which is a skill set most coaches never wanted to learn.",
      },
    ],
    workflows: [
      {
        title: "Framework to course outline",
        body: "Turn your methodology into a module structure, lesson outlines and workbook prompts, then rewrite them in your own voice so the material is unmistakably yours.",
      },
      {
        title: "Session recap and action steps",
        body: "Turn a recorded session debrief into a clean recap email with the agreed action steps, sent the same day instead of three days later.",
      },
      {
        title: "Content rhythm between launches",
        body: "Draft the weekly post, the newsletter and the short-form scripts in one sitting, then schedule them so publishing continues through a heavy client week.",
      },
      {
        title: "Lesson video production",
        body: "Record a lesson, then trim it, add captions and produce short clips from it for social, without an editor in the loop.",
      },
      {
        title: "Launch sequence",
        body: "Write the landing page, the email sequence and the social posts for a cohort or course launch from one core offer description.",
      },
    ],
    toolkit: [
      {
        slug: "ai-presentation-maker",
        why: "Course modules and workshop decks are the deliverable clients see, and building them from scratch is what delays every launch.",
      },
      {
        slug: "article-wizard",
        why: "Long-form content is how coaches get found, and a structured draft turns a framework into a publishable article.",
      },
      {
        slug: "welcome-email-generator",
        why: "Onboarding, session recaps and nurture emails are the recurring writing a solo practice never gets to.",
      },
      {
        slug: "ai-video-editor",
        why: "Lesson recordings need trimming and tidying, and that editing step is where most course videos stall.",
      },
      {
        slug: "ai-captions",
        why: "Captions make lesson and social video watchable without sound, and adding them by hand is tedious enough to be skipped.",
      },
      {
        slug: "landing-page-copy-generator",
        why: "Every offer and cohort needs a page that explains it clearly, and that page is usually written at the last minute.",
      },
      {
        slug: "linkedin-post-generator",
        why: "Consistent posting is what keeps a coaching pipeline full between launches.",
      },
      {
        slug: "ai-social-media-agent",
        why: "Scheduling posts ahead means marketing keeps running through the weeks that are full of client sessions.",
      },
    ],
    outcomes: [
      "Course and workshop material gets built instead of staying on the someday list.",
      "Marketing keeps publishing during busy client weeks, which flattens the feast-and-famine cycle.",
      "Clients get their recap and action steps the same day, which makes the coaching stick.",
      "Lesson video ships with captions and clips without an editor.",
      "Launches happen with a complete set of pages, emails and posts rather than a rushed announcement.",
    ],
    faqs: [
      {
        q: "Will my course sound like AI wrote it?",
        a: "Only if you publish first drafts. The useful pattern is to generate the structure and then rewrite the substance in your own voice — the framework and the examples have to be yours to be worth buying.",
      },
      {
        q: "Can it create the coaching methodology itself?",
        a: "No. It produces material around expertise you already have. A generated framework you did not develop will not survive contact with a real client.",
      },
      {
        q: "Do I need video skills to produce lesson videos?",
        a: "No. Recording is on you; trimming, captions and short clips are handled in the platform.",
      },
      {
        q: "Is this useful for a one-person practice, or only for a team?",
        a: "It is aimed squarely at solo practices, where the same person delivers the work and produces all the material around it.",
      },
    ],
  },
];
