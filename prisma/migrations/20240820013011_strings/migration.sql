/*
  Warnings:

  - You are about to alter the column `limiteCredito` on the `cliente` table. The data in that column could be lost. The data in that column will be cast from `Double` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `cliente` MODIFY `limiteCredito` VARCHAR(191) NOT NULL;
