import { FastifyReply, FastifyRequest } from "fastify";
import { hashPassword, verifyPassword } from "../../utils/password";
import { db } from "../../db";
import { usersTable } from "../../db/schema/users.schema";
import { CreateUserInput, LoginUserInput } from "./users.schema";
import { sql } from "drizzle-orm";
import {
  ACCESS_TOKEN_EXPIRY,
  REFRESH_TOKEN_EXPIRY,
} from "../../utils/constants";
import { userPayload } from "../../utils/types";

async function createUserHandler(
  request: FastifyRequest<{
    Body: CreateUserInput;
  }>,
  reply: FastifyReply
) {
  const { username, firstName, lastName, email, password } = request.body;
  try {
    const hashedPassword = await hashPassword(password);

    await db.insert(usersTable).values({
      username,
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    return reply.code(201).send({
      message: "User Created Succesfully!",
    });
  } catch (e) {
    reply.code(500).send({
      message: "Error Creating the User",
      error: e,
    });
  }
}

async function loginUserHandler(
  request: FastifyRequest<{
    Body: LoginUserInput;
  }>,
  reply: FastifyReply
) {
  const { email, password } = request.body;
  try {
    const user: userPayload = await db
      .select({
        id: usersTable.id,
        username: usersTable.username,
        email: usersTable.email,
        password: usersTable.password,
      })
      .from(usersTable)
      .where(sql`${usersTable.email} = ${email.toLowerCase()}`)
      .then((result) => result[0]);

    let isMatch;

    if (user.password) {
      isMatch = await verifyPassword(user.password, password);
    }

    if (!user || !isMatch) {
      return reply.code(401).send({
        message: "Invalid email or password",
      });
    }

    const refreshToken = request.jwt.sign(
      { id: user.id },
      {
        expiresIn: REFRESH_TOKEN_EXPIRY,
      }
    );
    const accessToken = request.jwt.sign(
      {
        id: user.id,
        username: user.username,
        email: user.email,
      },
      { expiresIn: ACCESS_TOKEN_EXPIRY }
    );

    reply.setCookie("accessToken", accessToken, {
      path: "/",
      httpOnly: true,
      secure: true,
    });

    reply.setCookie("refreshToken", refreshToken, {
      path: "/",
      httpOnly: true,
      secure: true,
    });

    return reply.code(200).send({
      message: "User logged in Succesfully!",
    });
  } catch (e) {
    reply.code(500).send({
      message: "Error Loggin In the User",
      error: e,
    });
  }
}

async function logoutUserHandler(request: FastifyRequest, reply: FastifyReply) {
  reply.clearCookie("accessToken");
  reply.clearCookie("refreshToken");
  return reply.send({ message: "Logout successful" });
}

async function verifyUser(request: FastifyRequest, reply: FastifyReply) {
  return reply.send(request.user);
}

export { createUserHandler, loginUserHandler, logoutUserHandler, verifyUser };
