-- CreateTable
CREATE TABLE "servings" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "user_id" TEXT NOT NULL,
    "food_id" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "quantity" REAL,
    CONSTRAINT "servings_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "servings_food_id_fkey" FOREIGN KEY ("food_id") REFERENCES "foods" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
