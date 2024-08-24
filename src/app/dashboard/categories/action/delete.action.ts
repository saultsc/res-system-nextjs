'use server';

import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';

import { prisma } from '@/lib/prisma';

export const deleteCategory = async (id: number) => {
	try {
		await prisma.categoria.delete({ where: { id } });

		revalidatePath('/dashboard/categories');
	} catch (error) {
		console.error(error);
	}
};
