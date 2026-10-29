import { describe, expect, test } from "bun:test";
import { restaurantOffer, missedCallEstimate } from "./restaurant-offer";

describe("Approved restaurant offer", () => {
  test("uses the Anchor Fish demo phone line", () => expect(restaurantOffer.demoPhone).toBe("+18888000616"));
  test("costs $349 per month", () => expect(restaurantOffer.monthlyPrice).toBe(349));
  test("includes unlimited inbound minutes", () => expect(restaurantOffer.inboundMinutes).toBe("unlimited"));
  test("charges zero per-order commission", () => expect(restaurantOffer.perOrderCommission).toBe(0));
});

test("missed call estimate: $40 ticket, 8 calls/day", () => {
  expect(missedCallEstimate(40, 8)).toEqual({ lost: 9600, recoverable: 8160, breakEvenOrders: 9 });
});
