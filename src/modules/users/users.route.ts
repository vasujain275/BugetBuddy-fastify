import { FastifyInstance } from "fastify";
import {
  createUserHandler,
  loginUserHandler,
  logoutUserHandler,
  verifyUser,
} from "./users.controller";
import { $ref } from "./users.schema";

export async function usersRoutes(server: FastifyInstance) {
  server.post(
    "/",
    {
      schema: {
        body: $ref("createUsersSchema"),
      },
    },
    createUserHandler
  );
  server.post(
    "/login",
    {
      schema: {
        body: $ref("loginUsersSchema"),
      },
    },
    loginUserHandler
  );
  server.delete("/logout", logoutUserHandler);
  server.get(
    "/verify",
    {
      preHandler: [server.auth],
    },
    verifyUser
  );
}
