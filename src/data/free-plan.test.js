import { describe, expect, test } from "bun:test";
import { freePlan } from "./free-plan";

describe("Free plan allowances", () => {
  test("costs $0 monthly", () => {
    expect(freePlan.monthlyPrice).toBe(0);
  });
  test("includes 500 credits", () => {
    expect(freePlan.monthlyCredits).toBe(500);
  });
  test("renews credits every month", () => {
    expect(freePlan.creditRenewal).toBe("monthly");
  });
  test("does not require a card", () => {
    expect(freePlan.requiresCard).toBe(false);
  });
});