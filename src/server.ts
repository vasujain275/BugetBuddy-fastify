import Fastify, { FastifyReply, FastifyRequest } from "fastify";
import fjwt, { FastifyJWT } from "@fastify/jwt";
import fcookie from "@fastify/cookie";
import cors from "@fastify/cors";
import { userSchemas } from "./modules/users/users.schema";
import { usersRoutes } from "./modules/users/users.route";
import { COOKIE_SECRET_KEY, JWT_SECRET_KEY } from "./utils/constants";
import { request } from "http";

export function buildserver() {
  const server = Fastify({
    logger: {
      transport: {
        target: "pino-pretty",
      },
    },
  });

  server.register(cors, {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  });

  for (const schema of [...userSchemas]) {
    server.addSchema(schema);
  }

  server.register(fjwt, {
    secret: JWT_SECRET_KEY,
  });

  // We use this so that we don't have to export the server
  server.addHook(
    "preHandler",
    (req: FastifyRequest, reply: FastifyReply, next) => {
      req.jwt = server.jwt;
      return next();
    }
  );

  server.decorate(
    "auth",
    async (request: FastifyRequest, reply: FastifyReply) => {
      const token = request.cookies.accessToken;

      if (!token) {
        return reply.status(401).send({
          message: "Authentication required",
        });
      }

      const decoded = request.jwt.verify<FastifyJWT["user"]>(token);
      request.user = decoded;
    }
  );

  server.register(fcookie, {
    secret: COOKIE_SECRET_KEY,
  });

  server.get("/v1/healthcheck", async () => ({ status: "ok" }));

  server.register(usersRoutes, { prefix: "v1/users" });
  return server;
}
