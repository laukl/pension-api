import { FastifyInstance } from "fastify";
import prisma from "../lib/prisma.js";

export default function (fastify: FastifyInstance) {
  fastify.get("/providers", () => {
    return prisma.pensionProvider.findMany();
  });
}
