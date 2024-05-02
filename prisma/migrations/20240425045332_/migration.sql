/*
  Warnings:

  - A unique constraint covering the columns `[identifier,token]` on the table `verification_requests` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `verification_requests_identifier_token_key` ON `verification_requests`(`identifier`, `token`);
