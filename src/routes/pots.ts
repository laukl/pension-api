import { FastifyInstance } from "fastify";
import { z } from "zod";
import { ValidationError } from "../lib/error.js";
import filterPotsWithForecast from "../lib/filter-pots-with-forecast.js";
import prisma from "../lib/prisma.js";

const getPotsQueryParamsSchema = z.object({
  name: z.string().optional(),
  employer: z.string().optional(),
  provider: z.string().optional(),
  amount: z.number({ coerce: true }).positive().optional(),
  amountComparator: z.enum(["gt", "lt", "gte", "lte"]).optional(),
  forecastYears: z.number({ coerce: true }).positive().optional(),
  forecastAmount: z.number({ coerce: true }).positive().optional(),
});

const getPotByIdSchema = z.object({ id: z.string() });

export default function (fastify: FastifyInstance) {
  fastify.get("/pots", async (req) => {
    const result = getPotsQueryParamsSchema.safeParse(req.query);
    if (!result.success) {
      throw new ValidationError(result.error.issues);
    }

    const pots = await prisma.pensionPot.findMany({
      where: {
        potName: { contains: result.data.name },
        employer: { equals: result.data.employer },
        providerId: { equals: result.data.provider },
        amount: { [result.data.amountComparator ?? "gte"]: result.data.amount },
      },
      include: { provider: true },
    });

    if (result.data.forecastYears && result.data.forecastAmount) {
      return filterPotsWithForecast(
        pots,
        result.data.forecastYears,
        result.data.forecastAmount,
      );
    }

    return pots;
  });

  fastify.get("/pots/:id", (req) => {
    const result = getPotByIdSchema.safeParse(req.params);
    if (!result.success) {
      throw new ValidationError(result.error.issues);
    }

    return prisma.pensionPot.findUnique({
      where: { id: result.data.id },
      include: { provider: true },
    });
  });

  fastify.get("/pots/pensions", async (req) => {
    const result = getPotsQueryParamsSchema.safeParse(req.query);
    if (!result.success) {
      throw new ValidationError(result.error.issues);
    }

    const pots = await prisma.pensionPot.findMany({
      where: {
        potName: { contains: result.data.name },
        employer: { equals: result.data.employer },
        providerId: { equals: result.data.provider },
        amount: { [result.data.amountComparator ?? "gte"]: result.data.amount },
        searches: { none: {} },
      },
      include: { provider: true },
    });

    if (result.data.forecastYears && result.data.forecastAmount) {
      return filterPotsWithForecast(
        pots,
        result.data.forecastYears,
        result.data.forecastAmount,
      );
    }

    return pots;
  });
}
