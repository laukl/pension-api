import { FastifyInstance } from "fastify";
import { z } from "zod";
import { ValidationError } from "../lib/error.js";
import prisma from "../lib/prisma.js";

const getSearchesQueryParamsSchema = z.object({
  status: z.enum(["FOUND", "TO_HUNT"]).optional(),
});

export default function (fastify: FastifyInstance) {
  fastify.get("/searches", (req) => {
    const result = getSearchesQueryParamsSchema.safeParse(req.query);
    if (!result.success) {
      throw new ValidationError(result.error.issues);
    }
    return prisma.potSearch.findMany({
      where: { status: result.data.status },
      include: { pot: { include: { provider: true } } },
    });
  });
}
