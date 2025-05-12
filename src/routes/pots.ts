import { FastifyInstance } from "fastify";
import prisma from "../lib/prisma.js";

export default function (fastify: FastifyInstance) {
  fastify.get("/pots", () => {
    return prisma.pensionPot.findMany({ include: { provider: true } });
  });

  fastify.get("/pots/pensions", () => {
    return prisma.pensionPot.findMany({
      where: { searches: { none: {} } },
      include: { provider: true },
    });
  });
}
