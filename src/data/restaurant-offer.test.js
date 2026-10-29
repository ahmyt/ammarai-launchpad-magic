import { describe, expect, test } from "bun:test";
import { restaurantOffer } from "./restaurant-offer";

describe("Approved restaurant offer", () => {
  test("costs $349 per month", () => expect(restaurantOffer.monthlyPrice).toBe(349));
  test("includes unlimited inbound minutes", () => expect(restaurantOffer.inboundMinutes).toBe("unlimited"));
  test("charges zero per-order commission", () => expect(restaurantOffer.perOrderCommission).toBe(0));
});