import { FastifyInstance } from "fastify";
import { z } from "zod";
import prisma from "../lib/prisma.js";

const getPotsQueryParamsSchema = z.object({
  name: z.string().optional(),
});

export default function (fastify: FastifyInstance) {
  fastify.get("/pots", (req) => {
    const params = getPotsQueryParamsSchema.parse(req.query);
    return prisma.pensionPot.findMany({
      where: { potName: { contains: params.name } },
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
