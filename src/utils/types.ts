import { JWT } from "@fastify/jwt";

declare module "fastify" {
  interface FastifyRequest {
    jwt: JWT;
  }
  export interface FastifyInstance {
    auth: any;
  }
}

export type userPayload = {
  id: string | null;
  username: string | null;
  email: string | null;
  password: string | null;
};

declare module "@fastify/jwt" {
  interface FastifyJWT {
    user: userPayload;
  }
}
