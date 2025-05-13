import { SearchStatus } from "@prisma/client";
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
  status: z.nativeEnum(SearchStatus).nullish(),
  previousAddress: z.string().nullish(),
  previousName: z.string().nullish(),
  policyNumber: z.number().nullish(),
  annualInterestRate: z.number().nullable(),
  annualFee: z.number().nullish(),
  defaultAnnualInterestRate: z.number(),
  pensionProvider: pensionProviderSchema,
  amount: z.number(),
  employer: z.string().nullable(),
  lastUpdatedAt: z.date({ coerce: true }),
  foundOn: z.date({ coerce: true }).nullish(),
  monthlyPayment: z.number(),
  isWorkplacePension: z.boolean().optional(),
  isDraft: z.boolean().optional(),
});

const pensionsDataSchema = z.object({
  pensionPots: z.array(pensionPotSchema),
  searchedPensions: z.array(pensionPotSchema),
});

function readPensionsData() {
  const data = JSON.parse(fs.readFileSync(PENSIONS_DATA_PATH, "utf8"));
  return pensionsDataSchema.parse(data);
}

export default readPensionsData;
