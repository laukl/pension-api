import { z } from "zod";
import prisma from "../lib/prisma.js";
import readPensionsData from "../lib/read-pensions-data.js";

const data = readPensionsData();

await prisma.$transaction(
  data.pensionPots.map(({ pensionProvider, ...pot }) =>
    prisma.pensionPot.upsert({
      where: { id: pot.id },
      create: pot,
      update: pot,
    }),
  ),
);

const providers = data.pensionPots
  .map((pot) => pot.pensionProvider)
  .filter((provider) => !!provider.name);

const providerSchema = z.object({
  name: z.string(),
  value: z.string(),
});
const parsedProviders = z.array(providerSchema).parse(providers);

await prisma.$transaction(
  parsedProviders.map((provider) =>
    prisma.pensionProvider.upsert({
      where: { id: provider.value },
      create: { id: provider.value, name: provider.name },
      update: { name: provider.name },
    }),
  ),
);
