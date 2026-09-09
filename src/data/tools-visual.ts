import type { Tool } from "./types";

export const visualTools: Tool[] = [
  {
    slug: "ai-image-editor",
    name: "AI Image Editor",
    category: "AI Image",
    summary:
      "Edit a photo by describing the change — swap the background, remove objects, extend the frame, fix the light.",
    title: "AI Image Editor: Edit Photos by Describing the Change | AmmarAI",
    description:
      "Upload a photo and say what to change. Remove objects, replace backgrounds, extend the frame, relight the scene and upscale — no masks, layers or design software.",
    h1: "Say what you want changed. The photo changes.",
    lede:
      "Upload the picture you already have — a phone snapshot, an old product shot, a screenshot — and describe the edit in a sentence. The editor rebuilds only what you asked for and leaves the rest of the image alone.",
    ctaLabel: "Edit an image",
    recent: true,
    what: [
      "Most photo problems are small and specific: a distracting background, a cable in the frame, a shot that is portrait when you need landscape, light that flattens the product. Fixing them used to mean a designer or an hour in an editor learning selections and layers.",
      "The AI Image Editor works from instructions. You upload the image, type the change — \"put this on a clean beige studio backdrop\", \"remove the person in the background\", \"extend this to 16:9\" — and it regenerates only the affected area, matching the existing perspective, grain and colour.",
      "Because every edit is reversible and stackable, you can work in small steps: clean the background, then relight, then extend, then upscale for print. Each version is kept, so you can go back to any point.",
    ],
    canDo: [
      "Replace or clean up the background behind any subject",
      "Remove people, objects, reflections, logos and clutter",
      "Extend the frame for a wider crop or a different aspect ratio",
      "Relight a flat photo with soft studio or golden-hour light",
      "Change colours — a product in five colourways from one shot",
      "Add a realistic shadow or reflection to a cut-out product",
      "Upscale to print resolution without smearing detail",
      "Batch the same edit across a whole folder of product photos",
    ],
    how: [
      {
        title: "Upload the original",
        body: "Any photo you own — phone shot, catalogue image, screenshot. Higher-resolution originals give cleaner edits.",
      },
      {
        title: "Describe the change",
        body: "One instruction at a time, in plain words. Be specific about what should stay the same as well as what should change.",
      },
      {
        title: "Refine or stack",
        body: "Keep the version you like and run the next edit on top of it. Background, then light, then crop, then upscale.",
      },
      {
        title: "Export at the size you need",
        body: "Download for web, social or print, or push the result straight into an ad, a product page or a video.",
      },
    ],
    examples: [
      {
        label: "Kitchen snapshot to catalogue shot",
        input:
          "Phone photo of a ceramic mug on a cluttered counter. Instruction: \"Put it on a clean warm beige studio backdrop with soft directional light and a natural shadow.\"",
        output:
          "The mug is kept exactly as photographed — same shape, glaze and highlights — on a seamless beige sweep with a soft shadow, ready to drop onto a product page.",
      },
      {
        label: "Reframe for a banner",
        input:
          "A 4:5 portrait lifestyle image that needs to run as a 16:9 website header. Instruction: \"Extend the frame left and right, keep the subject centred, leave empty space for a headline.\"",
        output:
          "A widened scene with invented but consistent surroundings, the original subject untouched, and clean negative space on the right for text.",
      },
    ],
    capabilities: [
      {
        title: "Instruction-based editing",
        body: "No masks, no layers, no selection tools. Describe the change and the model works out which pixels it affects.",
      },
      {
        title: "Object removal that fills correctly",
        body: "Deleted objects are replaced with plausible background, matched for perspective, texture and lighting.",
      },
      {
        title: "Generative frame extension",
        body: "Turn any crop into any ratio by inventing the surrounding scene rather than stretching or letterboxing.",
      },
      {
        title: "Relight and recolour",
        body: "Change the mood of a shot or produce a full set of colourways from a single photograph.",
      },
      {
        title: "Upscaling with real detail",
        body: "Push a small web image up to print size, reconstructing edges and texture instead of blurring them.",
      },
      {
        title: "Batch edits",
        body: "Apply one instruction across a folder — the same clean backdrop on 80 product photos in one pass.",
      },
    ],
    audiences: [
      {
        who: "Online stores",
        why: "Turn supplier photos and phone snapshots into a consistent catalogue without a studio.",
      },
      {
        who: "Marketers",
        why: "Reframe one hero image into every placement size a campaign needs.",
      },
      {
        who: "Small businesses",
        why: "Fix the photos you already have instead of paying for a reshoot.",
      },
      {
        who: "Content creators",
        why: "Clean backgrounds, remove distractions and keep a consistent look across a feed.",
      },
    ],
    useCases: [
      {
        title: "Consistent product catalogue",
        body: "Every item on the same backdrop with the same light, whether it was shot by you, a supplier or a phone.",
      },
      {
        title: "One shoot, every placement",
        body: "Extend and recrop a single hero image into square, story, banner and print versions without losing the subject.",
      },
      {
        title: "Cleanup before publishing",
        body: "Remove the stray hand, the plug socket, the competitor's logo — the things that make a good photo unusable.",
      },
    ],
    tips: [
      "Say what must stay unchanged, not only what to change — it keeps the subject faithful.",
      "Work in single steps and save each version; stacked edits beat one giant instruction.",
      "Start from the highest-resolution original you have, then upscale at the end.",
      "For colourways, name the exact colour and finish (\"matte sage green\"), not just \"green\".",
    ],
    mistakes: [
      "Asking for five changes in one sentence and getting none of them right.",
      "Editing a heavily compressed thumbnail and expecting print quality out.",
      "Removing something central to the composition and leaving nothing for the model to rebuild from.",
      "Using edits to misrepresent a product — the returns cost more than the shoot you saved.",
    ],
    faqs: [
      {
        q: "Does it change the whole photo?",
        a: "No. It regenerates the area your instruction affects and preserves the rest, matching grain, perspective and colour at the seam.",
      },
      {
        q: "Can it keep my product exactly as it is?",
        a: "Yes — that is the normal mode for background swaps and relighting. Say explicitly that the product must remain unchanged.",
      },
      {
        q: "What resolution can I export?",
        a: "Standard exports cover web and social; the upscaler takes the final image up to print resolution.",
      },
      {
        q: "Can I edit many images at once?",
        a: "Yes. Batch mode applies the same instruction to a folder, which is how most catalogues get cleaned up.",
      },
    ],
    related: ["ai-image-generator", "ai-photoshoot", "ai-creative-suite", "ai-virtual-try-on", "ai-image-to-video"],
  },
  {
    slug: "ai-photoshoot",
    name: "AI Product Photoshoot",
    category: "AI Image",
    summary:
      "Turn one plain product photo into a full commercial shoot — studio, lifestyle and seasonal scenes.",
    title: "AI Product Photoshoot: Studio Shots From One Photo | AmmarAI",
    description:
      "Upload one plain photo of your product and get a full set of commercial images — studio sweeps, lifestyle scenes, seasonal sets — with the product itself untouched.",
    h1: "One photo in. A whole shoot out.",
    lede:
      "Photograph the product once against a plain wall. The photoshoot tool places that exact item into studio sweeps, kitchen counters, café tables, sunlit concrete and seasonal sets — same product, professional photography.",
    ctaLabel: "Run a photoshoot",
    recent: true,
    what: [
      "A product shoot is slow and expensive: a studio, a photographer, props, a stylist, a day of your time, and another one when you launch the next colour. For a small catalogue it rarely happens, so the store runs on supplier images and phone snapshots.",
      "This tool needs one usable photo of the item. It isolates the product, keeps its shape, texture, label and proportions exactly, then builds new scenes around it with matching light, shadow and reflection.",
      "You pick the direction — clean e-commerce white, warm lifestyle, moody editorial, festive — and get a set of images in every ratio you need, consistent enough to run as a campaign.",
    ],
    canDo: [
      "Generate studio sweeps in any backdrop colour",
      "Place a product into lifestyle scenes: kitchens, desks, cafés, bathrooms, outdoors",
      "Build seasonal and campaign sets from the same source photo",
      "Produce matching sets for a whole product range",
      "Create hero, square, story and banner ratios in one pass",
      "Add realistic shadows, reflections and surface contact",
      "Show scale with plausible props next to the item",
      "Keep the same lighting recipe across an entire catalogue",
    ],
    how: [
      {
        title: "Photograph the product once",
        body: "Plain background, even light, the whole item in frame and in focus. A phone is fine.",
      },
      {
        title: "Choose the direction",
        body: "E-commerce clean, warm lifestyle, editorial, seasonal. Add a sentence about the customer if you want the scene to reflect them.",
      },
      {
        title: "Generate the set",
        body: "Get a batch of scenes and ratios. Keep what works, regenerate what does not, adjust the light in words.",
      },
      {
        title: "Publish",
        body: "Export for the product page, the ads, the marketplace listing and social — all from the same shoot.",
      },
    ],
    examples: [
      {
        label: "Candle range to autumn campaign",
        input:
          "One plain phone photo of three amber candle jars against a white wall. Direction: warm autumn interior, premium editorial light.",
        output:
          "The same three candles styled on dark stone with warm flame light, autumn leaves and soft linen — a polished seasonal campaign that preserves the jars and labels.",
      },
      {
        label: "Skincare summer refresh",
        input:
          "One plain photo of a forest-green skincare pump bottle. Direction: clean summer campaign, poolside sunlight, fresh botanical details.",
        output:
          "The same bottle on pale stone beside clear water, finished with realistic sunlight, water reflections and fresh leaves for a premium seasonal advert.",
      },
    ],
    capabilities: [
      {
        title: "Product fidelity first",
        body: "Shape, label, texture and colour are preserved from your photo; only the world around the product is generated.",
      },
      {
        title: "Scene library and custom prompts",
        body: "Start from a preset direction or describe the exact set you have in mind, down to the surface and time of day.",
      },
      {
        title: "Consistent across a range",
        body: "Lock a lighting and colour recipe and apply it to every product so the catalogue reads as one shoot.",
      },
      {
        title: "Every ratio you need",
        body: "Product page, marketplace square, story, wide banner and print, generated together rather than cropped later.",
      },
      {
        title: "Believable contact and shadow",
        body: "Products sit on surfaces properly, with contact shadows and reflections that match the scene light.",
      },
      {
        title: "Fast iteration",
        body: "Change the season, the surface or the mood in a sentence and regenerate in seconds instead of rebooking a studio.",
      },
    ],
    audiences: [
      {
        who: "E-commerce sellers",
        why: "Marketplace listings need many angles and scenes per SKU, and reshoots kill margin.",
      },
      {
        who: "Makers and small brands",
        why: "Get campaign-grade imagery without a studio day you cannot justify.",
      },
      {
        who: "Agencies",
        why: "Show clients three creative directions before anyone books a photographer.",
      },
      {
        who: "Marketplaces and dropshippers",
        why: "Turn identical supplier photos into imagery that looks like your brand, not everyone else's.",
      },
    ],
    useCases: [
      {
        title: "Launch a product without a shoot",
        body: "Photograph the sample on a table and have a full launch set — hero, lifestyle, detail, social — the same afternoon.",
      },
      {
        title: "Seasonal refresh",
        body: "Re-dress the same products for autumn, Christmas or summer without touching the products again.",
      },
      {
        title: "Ad testing",
        body: "Run five scenes against each other in paid social and keep the one that converts.",
      },
    ],
    tips: [
      "Shoot the source photo in soft, even light — hard shadows in the original limit what the model can relight.",
      "Include the whole product with a little space around it; tight crops lose the silhouette.",
      "Name the surface and the light (\"pale oak table, morning window light\") for scenes that feel real.",
      "Pick one direction for the whole range before generating; consistency sells more than variety.",
    ],
    mistakes: [
      "Using a blurry or heavily compressed source and blaming the output.",
      "Generating scenes that imply features the product does not have.",
      "Mixing five visual styles across one collection page.",
      "Skipping a plain product shot — marketplaces still require one on white.",
    ],
    faqs: [
      {
        q: "Will my product still look exactly like my product?",
        a: "Yes. The item is preserved from your photo — the generated part is the scene, light and shadow around it.",
      },
      {
        q: "How good does the source photo need to be?",
        a: "Sharp, evenly lit, whole product in frame, plain background if possible. A modern phone is more than enough.",
      },
      {
        q: "Can I use these images commercially?",
        a: "Yes — they are your product and your generated scenes, produced for your store, ads and listings.",
      },
      {
        q: "Do marketplaces accept AI scenes?",
        a: "Most accept lifestyle imagery as secondary images and require a plain main image, which the tool also produces.",
      },
    ],
    related: ["ai-image-editor", "ai-image-generator", "ai-virtual-try-on", "ai-creative-suite", "ai-image-to-video"],
  },
  {
    slug: "ai-virtual-try-on",
    name: "AI Fashion Try-On",
    category: "AI Image",
    summary:
      "Put a garment on a model without a shoot — same clothes, real fit, any model, any setting.",
    title: "AI Fashion Try-On: Garments on Models Without a Shoot | AmmarAI",
    description:
      "Upload a flat garment photo and get lookbook imagery on models — accurate fit and fabric drape, varied models and settings, ready for product pages and ads.",
    h1: "Your clothes, on models, without booking anyone",
    lede:
      "Upload the flat shot of the garment you already have. Get it worn — correct fit, real fabric drape, the model and setting you choose — for product pages, lookbooks and ads.",
    ctaLabel: "Try a garment on",
    recent: true,
    what: [
      "Apparel sells on being worn. A folded flat lay tells a shopper nothing about fit, length or drape, and every model shoot means casting, studio, styling and a wait — repeated for each colourway.",
      "The try-on tool takes the garment photo you already have and renders it worn: sleeve length in the right place, fabric behaving like the fabric it is, print and seams intact, shadows sitting where a real garment would create them.",
      "Because the model is generated, you can show the same piece on different body types, ages and skin tones — the range of customers you actually sell to, not the one model you could afford.",
    ],
    canDo: [
      "Render a flat-lay garment worn on a model",
      "Show one piece on multiple body types, heights and skin tones",
      "Keep prints, logos, seams and trims accurate",
      "Change setting: studio, street, interior, outdoor daylight",
      "Build full outfits by layering several garments",
      "Produce every colourway from one photographed sample",
      "Generate front, side and detail views for a product page",
      "Keep one model and one light across a whole collection",
    ],
    how: [
      {
        title: "Upload the garment",
        body: "A flat lay or mannequin shot, evenly lit, whole item visible, prints and details in focus.",
      },
      {
        title: "Pick the model and setting",
        body: "Body type, height, hair, skin tone, pose and location — or reuse a saved model so the collection matches.",
      },
      {
        title: "Generate and check the fit",
        body: "Review sleeve and hem length, drape and print placement. Adjust in words and regenerate.",
      },
      {
        title: "Publish the set",
        body: "Export product-page views, lookbook shots and story crops from the same session.",
      },
    ],
    examples: [
      {
        label: "Flat lay to lookbook",
        input:
          "A folded olive linen blazer photographed on white. Direction: neutral studio wall, soft daylight, relaxed pose.",
        output:
          "The same blazer worn open on a model against a warm neutral wall — linen creasing correctly, lapels and buttons intact, plus a three-quarter and a detail crop.",
      },
      {
        label: "One sample, six colourways",
        input:
          "One photographed t-shirt sample plus a list of six colours in the range.",
        output:
          "Six on-model images with identical model, pose and lighting, differing only in garment colour — a consistent product grid before the stock even lands.",
      },
    ],
    capabilities: [
      {
        title: "Accurate fit and drape",
        body: "Fabric behaves by type — linen creases, knit clings, denim holds structure — instead of looking painted on.",
      },
      {
        title: "Print and detail fidelity",
        body: "Graphics, stripes, seams and hardware are carried across from your photo, not reinvented.",
      },
      {
        title: "Diverse models on demand",
        body: "Show the same piece across body types, ages and skin tones so shoppers can picture themselves in it.",
      },
      {
        title: "Reusable models",
        body: "Save a model and reuse them across the whole collection for a coherent brand look.",
      },
      {
        title: "Outfit layering",
        body: "Combine several garments into one styled look to sell the full outfit, not the single item.",
      },
      {
        title: "Every colourway",
        body: "Photograph one sample and generate the entire colour range for the product grid.",
      },
    ],
    audiences: [
      {
        who: "Fashion brands",
        why: "New drops need on-model imagery faster than shoots can be booked.",
      },
      {
        who: "Online clothing stores",
        why: "Supplier flat lays convert badly; worn imagery answers the fit question shoppers actually have.",
      },
      {
        who: "Print-on-demand sellers",
        why: "Show designs on real-looking garments and people instead of the same generic mockup.",
      },
      {
        who: "Marketplace sellers",
        why: "Stand out in a grid where everyone is using the identical supplier photo.",
      },
    ],
    useCases: [
      {
        title: "Pre-launch imagery",
        body: "Build the product page and the ads from a single sample before bulk stock arrives.",
      },
      {
        title: "Inclusive size representation",
        body: "Show the same garment across the sizes you sell, which reduces returns as much as it improves conversion.",
      },
      {
        title: "Seasonal lookbooks",
        body: "Restyle the existing range into a new season's setting without reshooting the collection.",
      },
    ],
    tips: [
      "Photograph the garment flat and wrinkle-free — the model inherits whatever creases you upload.",
      "Say the fabric out loud in the prompt (\"heavy linen\", \"ribbed knit\") so the drape is right.",
      "Reuse one saved model across a collection; mixed models make a grid look chaotic.",
      "Check hem and sleeve length against the real garment before publishing.",
    ],
    mistakes: [
      "Uploading a garment on a hanger with the shape distorted and expecting an accurate fit.",
      "Generating a fit that flatters more than the real item does — that is a returns problem.",
      "Ignoring size representation and showing only one body type.",
      "Skipping a flat product shot; shoppers still want to see the item itself.",
    ],
    faqs: [
      {
        q: "Does the garment stay accurate?",
        a: "Yes — colour, print, seams and trims come from your photo. The model, pose and setting are generated around it.",
      },
      {
        q: "Can I use the same model across products?",
        a: "Yes. Save a model and reuse them so the whole collection looks shot in one session.",
      },
      {
        q: "Do I need to disclose AI imagery?",
        a: "Rules vary by market and platform. Be accurate about the product, and follow the disclosure rules of the channels you sell on.",
      },
      {
        q: "Does it work for accessories and shoes?",
        a: "Yes, worn accessories, bags and footwear work the same way; for pure product scenes use the Product Photoshoot tool.",
      },
    ],
    related: ["ai-photoshoot", "ai-image-editor", "ai-image-generator", "ai-creative-suite", "ai-product-description-generator"],
  },
  {
    slug: "ai-creative-suite",
    name: "AI Creative Suite",
    category: "AI Image",
    summary:
      "One brief, a whole set of on-brand visuals — logo marks, ads, social tiles, packaging and banners that match.",
    title: "AI Creative Suite: On-Brand Visual Sets in One Go | AmmarAI",
    description:
      "Describe the brand and the campaign once, and generate a matching set of visuals — brand marks, ad creatives, social tiles, banners and packaging mockups in a single consistent style.",
    h1: "A whole visual set, not one lonely image",
    lede:
      "Most tools give you one picture at a time and none of them match. The Creative Suite works from a brand brief and produces a coordinated set — the same palette, the same style, every format your campaign needs.",
    ctaLabel: "Build a visual set",
    recent: true,
    what: [
      "The hard part of brand visuals is not making one good image, it is making twenty that look related. Colours drift, styles wander, and a feed ends up looking like five different companies.",
      "The Creative Suite starts with a brand brief: palette, mood, audience, the words you would and would not use. That brief is applied to everything it makes, so an ad, a story tile and a packaging mockup share a visual language.",
      "Ask for a campaign and you get the set: hero image, three ad variants, matching social tiles in every ratio, a banner, and mockups showing how it looks in the real world.",
    ],
    canDo: [
      "Generate a brand starter kit: mark, palette, type direction, textures",
      "Produce a matching campaign set across every ad and social format",
      "Create packaging and merchandise mockups in your style",
      "Build presentation and pitch visuals that match your deck",
      "Design event, promo and seasonal graphics from one brief",
      "Make coordinated blog and article headers",
      "Regenerate an entire set when the brand direction changes",
      "Keep a saved style so later work still matches months on",
    ],
    how: [
      {
        title: "Write the brand brief once",
        body: "Palette, mood, audience, industry and what you want to feel like. Add existing assets if you have them.",
      },
      {
        title: "Choose the set",
        body: "Brand kit, campaign pack, social pack, packaging mockups — or list the exact formats you need.",
      },
      {
        title: "Review the direction, not each image",
        body: "Approve the style board first. Fixing direction takes a sentence; fixing twenty finished assets takes a day.",
      },
      {
        title: "Generate, refine, export",
        body: "Swap individual pieces without breaking the set, then export everything at the right sizes.",
      },
    ],
    examples: [
      {
        label: "Brand kit for a coffee roastery",
        input:
          "Small-batch roastery, warm and earthy, kraft paper and deep brown, sells at markets and online.",
        output:
          "A coordinated kit: logo mark, colour swatches, business card, packaging bag, and three matching social tiles — one palette across all of it.",
      },
      {
        label: "Skincare launch pack",
        input:
          "Serum launch, clean and clinical with a pastel edge, three key benefits, running on Meta and email.",
        output:
          "Three ad creatives sharing one palette and layout logic, plus square, story and banner crops and an email header — recognisably one campaign.",
      },
    ],
    capabilities: [
      {
        title: "Brief-driven consistency",
        body: "Every asset inherits the same palette, mood and composition rules, so the set holds together.",
      },
      {
        title: "Sets, not singles",
        body: "Ask once and get every format the campaign needs rather than regenerating one image at a time.",
      },
      {
        title: "Saved brand styles",
        body: "Lock a direction and reuse it months later so new work still matches the old.",
      },
      {
        title: "Real-world mockups",
        body: "See the design on packaging, a shop sign, a phone screen or a tote before committing to print.",
      },
      {
        title: "Format coverage",
        body: "Square, story, landscape, banner and print sizes generated together, composed for each ratio.",
      },
      {
        title: "Feeds the rest of the stack",
        body: "Push finished visuals into the Social Media Agent, ad copy tools or the image-to-video generator.",
      },
    ],
    audiences: [
      {
        who: "New brands",
        why: "Get a coherent visual identity before you can justify a design retainer.",
      },
      {
        who: "Marketing teams",
        why: "Ship a full campaign's creative in an afternoon instead of a two-week design queue.",
      },
      {
        who: "Agencies",
        why: "Put three complete directions in front of a client instead of three loose images.",
      },
      {
        who: "Event and community organisers",
        why: "Posters, tickets, social graphics and signage that obviously belong to the same event.",
      },
    ],
    useCases: [
      {
        title: "Launch pack in a day",
        body: "One brief produces the hero, the ads, the social tiles and the email header, all matching.",
      },
      {
        title: "Rebrand preview",
        body: "See a new direction applied across packaging, ads and social before anyone commits budget.",
      },
      {
        title: "Always-on social",
        body: "Generate a month of on-brand tiles that look designed rather than assembled.",
      },
    ],
    tips: [
      "Spend the time on the brief — every asset inherits its strengths and its vagueness.",
      "Name three brands whose look you admire and one you want to avoid.",
      "Approve the style board before generating the full set.",
      "Save the style once you like it, so next quarter's work still matches.",
    ],
    mistakes: [
      "Generating assets one at a time and wondering why the feed looks incoherent.",
      "Putting long copy inside generated images instead of laying text over them.",
      "Copying a famous brand's identity closely enough to cause trouble.",
      "Changing the palette halfway through a campaign.",
    ],
    faqs: [
      {
        q: "Can it match my existing brand?",
        a: "Yes. Give it your palette, logo and a few existing assets and it will work inside that direction rather than inventing a new one.",
      },
      {
        q: "Is the text inside images reliable?",
        a: "Short words usually render well, but for headlines and legal copy lay real text over the image so it stays sharp and editable.",
      },
      {
        q: "Do I own what it makes?",
        a: "The output is yours to use commercially. For a registered trademark, have a designer refine the final mark.",
      },
      {
        q: "Can I regenerate one asset without redoing the set?",
        a: "Yes — each piece can be regenerated on its own and still inherits the saved style.",
      },
    ],
    related: ["ai-image-generator", "ai-image-editor", "ai-photoshoot", "ai-ad-generator", "ai-social-media-agent"],
  },
];
