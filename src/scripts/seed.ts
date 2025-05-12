import { SearchStatus } from "@prisma/client";
import { z } from "zod";
import prisma from "../lib/prisma.js";
import readPensionsData from "../lib/read-pensions-data.js";

const data = readPensionsData();
const pots = [...data.pensionPots, ...data.searchedPensions];

await prisma.$transaction(
  pots.map(({ pensionProvider, status, foundOn, ...pot }) =>
    prisma.pensionPot.upsert({
      where: { id: pot.id },
      create: { ...pot, providerId: pensionProvider.value },
      update: { ...pot, providerId: pensionProvider.value },
    }),
  ),
);

const providers = pots
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

const searches = await prisma.potSearch.count();

if (searches === 0) {
  await prisma.potSearch.createMany({
    data: data.searchedPensions.map((pot) => ({
      foundOn: z.date().parse(pot.foundOn),
      status: z.nativeEnum(SearchStatus).parse(pot.status),
      potId: pot.id,
    })),
    skipDuplicates: true,
  });
}
