import Fastify from "fastify";
import potsRoutes from "./routes/pots.js";

const HOST = process.env.HOST || "0.0.0.0";
const PORT = Number(process.env.PORT) || 3000;

const fastify = Fastify({ logger: true });

fastify.register(potsRoutes);

try {
  await fastify.listen({ host: HOST, port: PORT });
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}
