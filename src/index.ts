import Fastify from "fastify";

const HOST = process.env.HOST || "0.0.0.0";
const PORT = Number(process.env.PORT) || 3000;

const fastify = Fastify({
  logger: true,
});

fastify.get("/", async function handler() {
  return { hello: "world" };
});

try {
  await fastify.listen({ host: HOST, port: PORT });
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}
