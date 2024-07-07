import { sql } from "drizzle-orm";
import { createId } from "@paralleldrive/cuid2";
import { text, sqliteTable, real } from "drizzle-orm/sqlite-core";
import { usersTable } from "./users.schema";

export const transactionsTable = sqliteTable("transactions", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  name: text("name"),
  amount: real("amount").default(0),
  user_id: text("user_id").references(() => usersTable.id),
  created_at: text("timestamp").default(sql`(current_timestamp)`),
});
