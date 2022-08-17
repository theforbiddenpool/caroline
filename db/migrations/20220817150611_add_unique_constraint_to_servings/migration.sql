/*
  Warnings:

  - A unique constraint covering the columns `[user_id,food_id,date]` on the table `servings` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "servings_user_id_food_id_date_key" ON "servings"("user_id", "food_id", "date");
