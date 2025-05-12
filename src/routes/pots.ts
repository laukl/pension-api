import { FastifyInstance } from "fastify";
import { z } from "zod";
import { ValidationError } from "../lib/error.js";
import prisma from "../lib/prisma.js";

const getPotsQueryParamsSchema = z.object({
  name: z.string().optional(),
  employer: z.string().optional(),
  provider: z.string().optional(),
  amount: z.number({ coerce: true }).positive().optional(),
  amountComparator: z.enum(["gt", "lt", "gte", "lte"]).optional(),
});

const getPotByIdSchema = z.object({ id: z.string() });

export default function (fastify: FastifyInstance) {
  fastify.get("/pots", (req) => {
    const result = getPotsQueryParamsSchema.safeParse(req.query);
    if (!result.success) {
      throw new ValidationError(result.error.issues);
    }
    return prisma.pensionPot.findMany({
      where: {
        potName: { contains: result.data.name },
        employer: { equals: result.data.employer },
        providerId: { equals: result.data.provider },
        amount: { [result.data.amountComparator ?? "gte"]: result.data.amount },
      },
      include: { provider: true },
    });
  });

  fastify.get("/pots/:id", (req) => {
    const params = getPotByIdSchema.parse(req.params);
    return prisma.pensionPot.findUnique({
      where: { id: params.id },
      include: { provider: true },
    });
  });

  fastify.get("/pots/pensions", (req) => {
    const result = getPotsQueryParamsSchema.safeParse(req.query);
    if (!result.success) {
      throw new ValidationError(result.error.issues);
    }
    return prisma.pensionPot.findMany({
      where: {
        potName: { contains: result.data.name },
        employer: { equals: result.data.employer },
        providerId: { equals: result.data.provider },
        amount: { [result.data.amountComparator ?? "gte"]: result.data.amount },
        searches: { none: {} },
      },
      include: { provider: true },
    });
  });
}
