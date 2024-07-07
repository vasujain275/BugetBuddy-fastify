import { createId } from "@paralleldrive/cuid2";
import { text, sqliteTable, primaryKey } from "drizzle-orm/sqlite-core";
import { transactionsTable } from "./transactions.schema";

export const categoriesTable = sqliteTable("categories", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  name: text("name").unique(),
});

export const transactionCateogryTable = sqliteTable(
  "transactionCategory",
  {
    transactionId: text("transactionId").references(() => transactionsTable.id),
    categoryId: text("categoryId").references(() => categoriesTable.id),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.categoryId, table.transactionId] }),
    };
  }
);
