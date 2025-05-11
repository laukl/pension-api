import fs from "fs";
import { z } from "zod";

const PENSIONS_DATA_PATH =
  process.env.PENSIONS_DATA_PATH || "/usr/src/app/data/pensions.json";

const pensionProviderSchema = z.object({
  name: z.string().nullable(),
  value: z.string().nullable(),
});

const pensionPotSchema = z.object({
  id: z.string(),
  potName: z.string(),
  annualInterestRate: z.number().nullable(),
  defaultAnnualInterestRate: z.number(),
  pensionProvider: pensionProviderSchema,
  amount: z.number(),
  employer: z.string().nullable(),
  lastUpdatedAt: z.date({ coerce: true }),
  monthlyPayment: z.number(),
  isWorkplacePension: z.boolean(),
});

const pensionsDataSchema = z.object({
  pensionPots: z.array(pensionPotSchema),
});

function readPensionsData() {
  const data = JSON.parse(fs.readFileSync(PENSIONS_DATA_PATH, "utf8"));
  return pensionsDataSchema.parse(data);
}

export default readPensionsData;
