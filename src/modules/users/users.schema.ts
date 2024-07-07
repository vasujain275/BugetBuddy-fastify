import { buildJsonSchemas } from "fastify-zod";
import { z } from "zod";

const usersCore = {
  username: z.string({
    required_error: "Username is required",
    invalid_type_error: "Username must be a string",
  }),
  firstName: z.string({
    required_error: "firstName is required",
    invalid_type_error: "firstName must be a string",
  }),
  lastName: z.string({
    required_error: "lastName is required",
    invalid_type_error: "lastName must be a string",
  }),
  email: z
    .string({
      required_error: "email is required",
      invalid_type_error: "email must be a string",
    })
    .email(),
};

const createUsersSchema = z.object({
  ...usersCore,
  password: z.string({
    required_error: "password is required",
    invalid_type_error: "password must be a string",
  }),
});

const loginUsersSchema = z.object({
  email: z
    .string({
      required_error: "email is required",
      invalid_type_error: "email must be a string",
    })
    .email(),
  password: z.string({
    required_error: "password is required",
    invalid_type_error: "password must be a string",
  }),
});

export type CreateUserInput = z.infer<typeof createUsersSchema>;
export type LoginUserInput = z.infer<typeof loginUsersSchema>;

export const { schemas: userSchemas, $ref } = buildJsonSchemas(
  {
    createUsersSchema,
    loginUsersSchema,
  },
  { $id: "UserSchema" }
);
