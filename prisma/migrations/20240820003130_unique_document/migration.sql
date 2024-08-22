/*
  Warnings:

  - A unique constraint covering the columns `[documento]` on the table `cliente` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `cliente_documento_key` ON `cliente`(`documento`);
