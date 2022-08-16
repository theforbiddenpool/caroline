/*
  Warnings:

  - The primary key for the `foods` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_foods" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "order_weight" INTEGER
);
INSERT INTO "new_foods" ("id", "name", "order_weight", "quantity") SELECT "id", "name", "order_weight", "quantity" FROM "foods";
DROP TABLE "foods";
ALTER TABLE "new_foods" RENAME TO "foods";
CREATE UNIQUE INDEX "foods_name_key" ON "foods"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
