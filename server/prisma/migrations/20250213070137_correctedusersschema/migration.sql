/*
  Warnings:

  - You are about to drop the column `password` on the `chat_groups` table. All the data in the column will be lost.
  - You are about to alter the column `title` on the `chat_groups` table. The data in that column could be lost. The data in that column will be cast from `VarChar(225)` to `VarChar(191)`.
  - You are about to drop the column `chat_id` on the `group_users` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `group_users` table. All the data in the column will be lost.
  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `name` on the `users` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.
  - The `id` column on the `users` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `messages` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `passcode` to the `chat_groups` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `user_id` on the `chat_groups` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `group_id` to the `group_users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "chat_groups" DROP CONSTRAINT "chat_groups_user_id_fkey";

-- DropForeignKey
ALTER TABLE "group_users" DROP CONSTRAINT "group_users_chat_id_fkey";

-- DropForeignKey
ALTER TABLE "group_users" DROP CONSTRAINT "group_users_user_id_fkey";

-- DropForeignKey
ALTER TABLE "messages" DROP CONSTRAINT "messages_roomId_fkey";

-- DropIndex
DROP INDEX "chat_groups_created_at_idx";

-- DropIndex
DROP INDEX "group_users_user_id_chat_id_key";

-- DropIndex
DROP INDEX "users_oauth_id_key";

-- AlterTable
ALTER TABLE "chat_groups" DROP COLUMN "password",
ADD COLUMN     "passcode" VARCHAR(20) NOT NULL,
DROP COLUMN "user_id",
ADD COLUMN     "user_id" INTEGER NOT NULL,
ALTER COLUMN "title" SET DATA TYPE VARCHAR(191);

-- AlterTable
ALTER TABLE "group_users" DROP COLUMN "chat_id",
DROP COLUMN "user_id",
ADD COLUMN     "group_id" UUID NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP CONSTRAINT "users_pkey",
ALTER COLUMN "name" SET DATA TYPE VARCHAR(191),
ALTER COLUMN "email" SET DATA TYPE TEXT,
ALTER COLUMN "provider" SET DATA TYPE TEXT,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "messages";

-- CreateTable
CREATE TABLE "chats" (
    "id" TEXT NOT NULL,
    "group_id" UUID NOT NULL,
    "message" TEXT,
    "name" TEXT NOT NULL,
    "file" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "chats_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "chats_created_at_idx" ON "chats"("created_at");

-- CreateIndex
CREATE INDEX "chat_groups_user_id_created_at_idx" ON "chat_groups"("user_id", "created_at");

-- AddForeignKey
ALTER TABLE "chat_groups" ADD CONSTRAINT "chat_groups_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "group_users" ADD CONSTRAINT "group_users_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "chat_groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chats" ADD CONSTRAINT "chats_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "chat_groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;
