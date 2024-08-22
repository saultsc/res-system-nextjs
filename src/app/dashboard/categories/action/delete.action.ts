'use server';

import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';

const prisma = new PrismaClient();

export const deleteCategory = async (id: number) => {
	try {
		await prisma.categoria.delete({ where: { id } });

		revalidatePath('/dashboard/categories');
	} catch (error) {
		console.error(error);
	}
};
