-- CreateTable
CREATE TABLE `categoria` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `categoria_nombre_key`(`nombre`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cliente` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tipoCliente` VARCHAR(191) NOT NULL,
    `documento` INTEGER NOT NULL,
    `rnc` VARCHAR(191) NULL,
    `nombre` VARCHAR(191) NULL,
    `dirrecion` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `limiteCredito` DOUBLE NOT NULL,
    `telefonno` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `departamento` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `provincia` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `departamento_nombre_key`(`nombre`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `medida` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `medida_nombre_key`(`nombre`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `mesa` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `estado` ENUM('reservada', 'ocupada', 'disponible') NOT NULL DEFAULT 'disponible',
    `capacidad` INTEGER NOT NULL,

    UNIQUE INDEX `mesa_nombre_key`(`nombre`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sala` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `sala_nombre_key`(`nombre`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `salamesa` (
    `salaId` INTEGER NOT NULL,
    `mesaId` INTEGER NOT NULL,

    INDEX `SalaMesa_mesaId_fkey`(`mesaId`),
    PRIMARY KEY (`salaId`, `mesaId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fullName` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `role` ENUM('admin', 'user') NOT NULL DEFAULT 'user',

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `salamesa` ADD CONSTRAINT `SalaMesa_mesaId_fkey` FOREIGN KEY (`mesaId`) REFERENCES `mesa`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `salamesa` ADD CONSTRAINT `SalaMesa_salaId_fkey` FOREIGN KEY (`salaId`) REFERENCES `sala`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
