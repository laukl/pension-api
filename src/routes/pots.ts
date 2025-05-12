import { FastifyInstance } from "fastify";
import { z } from "zod";
import prisma from "../lib/prisma.js";

const getPotsQueryParamsSchema = z.object({
  name: z.string().optional(),
});

const getPotByIdSchema = z.object({ id: z.string() });

export default function (fastify: FastifyInstance) {
  fastify.get("/pots", (req) => {
    const params = getPotsQueryParamsSchema.parse(req.query);
    return prisma.pensionPot.findMany({
      where: { potName: { contains: params.name } },
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

  fastify.get("/pots/pensions", () => {
    return prisma.pensionPot.findMany({
      where: { searches: { none: {} } },
      include: { provider: true },
    });
  });
}
