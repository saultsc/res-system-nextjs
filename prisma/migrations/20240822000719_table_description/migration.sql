/*
  Warnings:

  - You are about to drop the column `estado` on the `mesa` table. All the data in the column will be lost.
  - You are about to drop the `medida` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `descripcion` to the `mesa` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `mesa` DROP COLUMN `estado`,
    ADD COLUMN `descripcion` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `medida`;
