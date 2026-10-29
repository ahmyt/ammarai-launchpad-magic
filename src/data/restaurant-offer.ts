/** Restaurant service is a separate offer, not a replacement for Voice Scale. */
export const restaurantOffer = {
  demoPhone: "+18888000616",
  demoPhoneFormatted: "+1 (888) 800-0616",
  monthlyPrice: 349,
  inboundMinutes: "unlimited",
  perOrderCommission: 0,
} as const;

/** Illustrative missed-call estimate; assumptions are shown to visitors. */
export function missedCallEstimate(avgTicket: number, missedPerDay: number, recoveryRate = 0.85, days = 30) {
  const lost = Math.round(avgTicket * missedPerDay * days);
  const recoverable = Math.round(lost * recoveryRate);
  const breakEvenOrders = Math.ceil(restaurantOffer.monthlyPrice / avgTicket);
  return { lost, recoverable, breakEvenOrders };
}
