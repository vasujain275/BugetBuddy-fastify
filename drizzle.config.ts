import { defineConfig } from "drizzle-kit";
import { DB_AUTH_TOKEN, DB_URL } from "./src/utils/constants";

export default defineConfig({
  dialect: "sqlite",
  schema: "./src/db/schema/*",
  out: "./src/db/migrations",
  driver: "turso",
  dbCredentials: {
    url: DB_URL,
    authToken: DB_AUTH_TOKEN,
  },
});
