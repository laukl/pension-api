import { describe, expect, test } from "@jest/globals";
import { PensionPot } from "@prisma/client";
import filterPotsWithForecast from "./filter-pots-with-forecast";

const POTS: PensionPot[] = [
  {
    id: "e181e498-9cab-4570-a188-ed699dc5eefd",
    potName: "Google",
    previousName: null,
    previousAddress: null,
    annualFee: null,
    policyNumber: null,
    annualInterestRate: 0.02,
    defaultAnnualInterestRate: 0.02,
    providerId: "AVIVA",
    amount: 36700,
    employer: "Google",
    lastUpdatedAt: new Date("2024-06-13T13:23:55.614Z"),
    monthlyPayment: 335.53,
    isWorkplacePension: true,
    isDraft: false,
  },
  {
    id: "5de51030-02f3-48c0-bd54-024120bac5ba",
    potName: "IBM",
    previousName: null,
    previousAddress: null,
    annualFee: null,
    policyNumber: null,
    annualInterestRate: 0.04,
    defaultAnnualInterestRate: 0.02,
    providerId: "SCOTTISH_WIDOWS",
    amount: 20000,
    employer: "IBM",
    lastUpdatedAt: new Date("2024-08-05T14:31:20.506Z"),
    monthlyPayment: 0,
    isWorkplacePension: false,
    isDraft: false,
  },
  {
    id: "1509481e-565d-444a-8e24-d72d3244b663",
    potName: "Mintago",
    previousName: null,
    previousAddress: null,
    annualFee: null,
    policyNumber: null,
    annualInterestRate: null,
    defaultAnnualInterestRate: 0.02,
    providerId: null,
    amount: 100,
    employer: "Mintago",
    lastUpdatedAt: new Date("2024-05-22T17:56:45.028Z"),
    monthlyPayment: 0,
    isWorkplacePension: false,
    isDraft: false,
  },
];

describe("filterPotsWithForecast", () => {
  test("with 5 years and amount of 3000", () => {
    const data = filterPotsWithForecast(POTS, 5, 3000);

    expect(data.length).toEqual(2);
  });

  test("with 5 years and amount of 36700", () => {
    const data = filterPotsWithForecast(POTS, 5, 36700);

    expect(data.length).toEqual(1);
  });
});
