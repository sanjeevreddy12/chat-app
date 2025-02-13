/*
  Warnings:

  - You are about to drop the column `passcode` on the `chat_groups` table. All the data in the column will be lost.
  - Added the required column `password` to the `chat_groups` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "chat_groups" DROP COLUMN "passcode",
ADD COLUMN     "password" VARCHAR(20) NOT NULL;
