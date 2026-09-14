/**
 * Turns the "Frequently asked questions" part of an article's HTML into
 * collapsible <details> entries so long FAQ lists stay scannable.
 * Pure string transform, so server and client render identically.
 */
const FAQ_HEADING = /<h([23])[^>]*>\s*(?:<[^>]+>\s*)*(?:frequently\s+asked[^<]*|faqs?)\s*(?:<\/[^>]+>\s*)*<\/h\1>/i;

export function collapsibleFaqs(html: string): string {
  if (!html) return html;
  const match = FAQ_HEADING.exec(html);
  if (!match) return html;

  const start = match.index + match[0].length;
  const head = html.slice(0, start);
  const rest = html.slice(start);

  // Stop the FAQ block at the next same-or-higher-level heading.
  const level = Number(match[1]);
  const stop = new RegExp(`<h[1-${Math.max(1, level)}][^>]*>`, "i").exec(rest);
  const body = stop ? rest.slice(0, stop.index) : rest;
  const tail = stop ? rest.slice(stop.index) : "";

  const itemPattern = /<h[3-6][^>]*>([\s\S]*?)<\/h[3-6]>([\s\S]*?)(?=<h[3-6][^>]*>|$)/gi;
  const items: string[] = [];
  let found: RegExpExecArray | null;
  while ((found = itemPattern.exec(body)) !== null) {
    const question = found[1]!.trim();
    const answer = found[2]!.trim();
    if (!question) continue;
    items.push(
      `<details class="faq-item"><summary>${question}</summary><div class="faq-answer">${answer}</div></details>`,
    );
  }
  if (items.length === 0) return html;

  return `${head}<div class="faq-list">${items.join("")}</div>${tail}`;
}

/**
 * Syndicated articles ship an unstyled nest of <div>s promoting AmmarAI.
 * Rebuild it as a proper editorial card so it reads as a callout, not stray text.
 */
function blockEnd(html: string, start: number): number {
  const token = /<div\b[^>]*>|<\/div\s*>/gi;
  token.lastIndex = start;
  let depth = 0;
  let found: RegExpExecArray | null;
  while ((found = token.exec(html)) !== null) {
    depth += found[0].startsWith("</") ? -1 : 1;
    if (depth === 0) return found.index + found[0].length;
  }
  return -1;
}

function renderCta(block: string): string {
  const anchor = /<a\b[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/i.exec(block);
  if (!anchor) return block;
  const href = anchor[1]!;
  const label = anchor[2]!.replace(/<[^>]+>/g, "").trim() || "Explore AmmarAI";

  const texts: string[] = [];
  const leaf = /<(?:div|span|p|strong|em)\b[^>]*>([^<]*)<\/(?:div|span|p|strong|em)\s*>/gi;
  let found: RegExpExecArray | null;
  while ((found = leaf.exec(block)) !== null) {
    const text = found[1]!.replace(/\s+/g, " ").trim();
    if (!text) continue;
    if (/^(https?:\/\/)?(www\.)?ammarai\.com\/?$/i.test(text)) continue;
    if (!texts.includes(text)) texts.push(text);
  }
  if (texts.length === 0) return block;

  const eyebrow = texts.length > 2 ? texts.shift()! : "AmmarAI";
  const heading = texts.shift()!;
  const body = texts.join(" ");

  return [
    '<aside class="article-cta">',
    `<p class="article-cta-eyebrow">${eyebrow}</p>`,
    `<p class="article-cta-title">${heading}</p>`,
    body ? `<p class="article-cta-body">${body}</p>` : "",
    `<a class="article-cta-link" href="${href}" rel="noopener noreferrer">${label}</a>`,
    "</aside>",
  ].join("");
}

export function brandCta(html: string): string {
  if (!html || !/ammarai\.com/i.test(html)) return html;
  const open = /<div\b[^>]*>/gi;
  let out = "";
  let cursor = 0;
  let match: RegExpExecArray | null;
  while ((match = open.exec(html)) !== null) {
    if (match.index < cursor) continue;
    const end = blockEnd(html, match.index);
    if (end < 0) continue;
    const block = html.slice(match.index, end);
    if (!/href="https?:\/\/(www\.)?ammarai\.com[^"]*"/i.test(block)) continue;
    out += html.slice(cursor, match.index) + renderCta(block);
    cursor = end;
    open.lastIndex = end;
  }
  return cursor === 0 ? html : out + html.slice(cursor);
}

/**
 * Wraps bare <table> elements in a horizontally scrollable container so wide
 * comparison tables never push the page sideways on phones.
 */
export function wrapTables(html: string): string {
  if (!html || !html.includes("<table")) return html;
  return html.replace(
    /<table[\s\S]*?<\/table>/gi,
    (table) => `<div class="table-scroll">${table}</div>`,
  );
}
