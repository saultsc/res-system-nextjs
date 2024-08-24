'use server';

import { PrismaClient } from '@prisma/client';

import { prisma } from '@/lib/prisma';

export const deleteMesa = async (id: string | number) => {
	try {
		const deletedMesa = await prisma.mesa.delete({
			where: { id: Number(id) },
		});
		return deletedMesa;
	} catch (error) {
		console.log('Error deleting mesa:', error);
		throw error;
	} finally {
		await prisma.$disconnect();
	}
};
