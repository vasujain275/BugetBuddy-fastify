import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import { DB_AUTH_TOKEN, DB_URL } from "../utils/constants";

const client = createClient({
  url: DB_URL,
  authToken: DB_AUTH_TOKEN,
});

export const db = drizzle(client);
