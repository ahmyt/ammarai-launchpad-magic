import { useQuery } from "@tanstack/react-query";
import { MessageCircle } from "lucide-react";
import { siteContentQuery } from "@/lib/content";
import { cn } from "@/lib/utils";

/** Builds a wa.me link from any number format; returns null when unusable. */
export function whatsappLink(number?: string, message?: string): string | null {
  const digits = (number ?? "").replace(/\D/g, "");
  if (digits.length < 8 || digits.length > 15) return null;
  const text = (message ?? "").trim();
  return `https://wa.me/${digits}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
}

export function WhatsAppButton({ message, label = "Chat on WhatsApp", className }: { message?: string; label?: string; className?: string }) {
  const { data } = useQuery(siteContentQuery);
  const settings = data?.pages.find((p) => p.slug === "settings");
  if (!settings || settings.whatsappEnabled === false) return null;
  const href = whatsappLink(settings.whatsappNumber, message ?? settings.whatsappMessage);
  if (!href) return null;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn("inline-flex h-11 items-center gap-2 rounded-md bg-primary px-5 text-sm font-semibold text-primary-foreground hover:opacity-90", className)}
    >
      <MessageCircle className="h-4 w-4" aria-hidden />
      {label}
    </a>
  );
}
