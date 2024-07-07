import * as argon2 from "argon2";

export const hashPassword = async (password: string) => {
  const hash = await argon2.hash(password);
  return hash;
};

export const verifyPassword = async (
  hashedPassword: string,
  passowrd: string
): Promise<boolean> => {
  if (await argon2.verify(hashedPassword, passowrd)) {
    return true;
  } else {
    return false;
  }
};
