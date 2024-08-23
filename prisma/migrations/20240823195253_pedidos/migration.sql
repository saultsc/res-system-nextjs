-- CreateTable
CREATE TABLE `pedido` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cantidadProductos` INTEGER NOT NULL,
    `estado` VARCHAR(191) NOT NULL,
    `monto` DOUBLE NOT NULL,
    `salaId` INTEGER NOT NULL,
    `mesaId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `pedido` ADD CONSTRAINT `pedido_salaId_mesaId_fkey` FOREIGN KEY (`salaId`, `mesaId`) REFERENCES `salamesa`(`salaId`, `mesaId`) ON DELETE RESTRICT ON UPDATE CASCADE;
