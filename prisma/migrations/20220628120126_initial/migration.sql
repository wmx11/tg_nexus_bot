-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "joined" DATETIME NOT NULL,
    "message_count" INTEGER NOT NULL,
    "last_message" DATETIME NOT NULL,
    "warnings" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
