import Fastify from "fastify";
import potsRoutes from "./routes/pots.js";
import providersRoutes from "./routes/providers.js";
import searchesRoutes from "./routes/searches.js";

const HOST = process.env.HOST || "0.0.0.0";
const PORT = Number(process.env.PORT) || 3000;

const fastify = Fastify({ logger: true });

fastify.setErrorHandler((error, _request, reply) => {
  reply.status(500).send({ error: error.message });
});

fastify.register(potsRoutes);
fastify.register(searchesRoutes);
fastify.register(providersRoutes);

try {
  await fastify.listen({ host: HOST, port: PORT });
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}
