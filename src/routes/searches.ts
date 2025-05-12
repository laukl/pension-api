import { FastifyInstance } from "fastify";
import prisma from "../lib/prisma.js";

export default function (fastify: FastifyInstance) {
  fastify.get("/searches", async () => {
    return await prisma.potSearch.findMany({ include: { pot: true } });
  });
}
