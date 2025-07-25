'use server';

import { PrismaClient } from '@prisma/client';

import { prisma } from '@/lib/prisma';

export const deleteSala = async (id: string | number) => {
	try {
		const deletedSala = await prisma.sala.delete({
			where: { id: Number(id) },
		});
		return deletedSala;
	} catch (error) {
		console.log('Error deleting sala:', error);
		throw error;
	} finally {
		await prisma.$disconnect();
	}
};
