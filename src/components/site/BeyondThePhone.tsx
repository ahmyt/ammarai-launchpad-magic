import { Link } from "@tanstack/react-router";
import { ArrowRight, Megaphone, MessagesSquare, Newspaper, Users, type LucideIcon } from "lucide-react";
import { Card } from "@/components/site/primitives";

export type BeyondThePhoneItem = {
  icon: "chat" | "newsletter" | "social" | "crm";
  job: string;
  tool: string;
  to: "/ai-smart-inbox" | "/ai-writer" | "/ai-social-media-agent" | "/ai-crm";
  body: string;
  tutorial?: { slug: string; label: string };
};

const icons: Record<BeyondThePhoneItem["icon"], LucideIcon> = {
  chat: MessagesSquare,
  newsletter: Newspaper,
  social: Megaphone,
  crm: Users,
};

/** "Supporting superpowers" strip for phone-agent landing pages: other AmmarAI tools already included in the same plan. */
export function BeyondThePhone({ items, note }: { items: BeyondThePhoneItem[]; note?: string }) {
  return (
    <>
      <div className={`mt-10 grid gap-5 sm:grid-cols-2 ${items.length >= 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"}`}>
        {items.map((item) => {
          const Icon = icons[item.icon];
          return (
            <Card key={item.job} className="restaurant-lift flex flex-col p-5">
              <Icon className="size-5 text-accent" aria-hidden="true" />
              <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground">{item.job}</p>
              <h3 className="mt-2 text-lg font-semibold">
                <Link to={item.to} className="text-foreground hover:text-accent">{item.tool}<ArrowRight className="ml-2 inline size-4" aria-hidden="true" /></Link>
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
              {item.tutorial ? (
                <Link to="/tutorials/$slug" params={{ slug: item.tutorial.slug }} className="mt-4 text-sm font-semibold text-accent hover:underline">{item.tutorial.label}</Link>
              ) : null}
            </Card>
          );
        })}
      </div>
      {note ? <p className="mt-6 max-w-3xl border-l-2 border-accent pl-4 text-sm leading-relaxed text-muted-foreground">{note}</p> : null}
    </>
  );
}
