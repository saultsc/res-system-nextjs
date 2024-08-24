'use server';

import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';

import { prisma } from '@/lib/prisma';

export const deleteTable = async (id: string | number) => {
	try {
		const deletedMesa = await prisma.mesa.delete({
			where: { id: Number(id) },
		});

		revalidatePath('/dashboard/tables');
		return deletedMesa;
	} catch (error) {
		console.log('Error deleting mesa:', error);
		throw error;
	} finally {
		await prisma.$disconnect();
	}
};
