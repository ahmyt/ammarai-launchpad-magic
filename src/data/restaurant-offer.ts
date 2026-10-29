/** Restaurant service is a separate offer, not a replacement for Voice Scale. */
export const restaurantOffer = {
  monthlyPrice: 349,
  inboundMinutes: "unlimited",
  perOrderCommission: 0,
} as const;

export function restaurantRecovery(callsPerDay: number, orderValue: number, conversionPercent: number) {
  const recoveredOrders = Math.round(callsPerDay * 30 * conversionPercent / 100);
  const grossRevenue = recoveredOrders * orderValue;
  return { recoveredOrders, grossRevenue, revenueLessSubscription: grossRevenue - restaurantOffer.monthlyPrice };
}