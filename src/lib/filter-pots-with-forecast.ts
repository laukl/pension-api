import { PensionPot } from "@prisma/client";

export default function filterPotsWithForecast(
  pots: PensionPot[],
  years: number,
  amount: number,
): PensionPot[] {
  const allowedPotIds: string[] = [];
  for (const pot of pots) {
    const annualInterestRate =
      pot.annualInterestRate ?? pot.defaultAnnualInterestRate;
    const monthlyInterestRate = annualInterestRate / 12;
    const months = 12 * years;

    const futureValueInitial =
      pot.amount * Math.pow(1 + annualInterestRate, years);
    const futureValueContributions =
      pot.monthlyPayment *
      ((Math.pow(1 + monthlyInterestRate, months) - 1) / monthlyInterestRate);
    const futureValue = futureValueInitial + futureValueContributions;

    if (futureValue < amount) continue;
    allowedPotIds.push(pot.id);
  }

  return pots.filter((pot) => allowedPotIds.includes(pot.id));
}
