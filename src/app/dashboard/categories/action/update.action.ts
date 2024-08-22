'use server';

import { PrismaClient } from '@prisma/client';
import { CategoryForm } from '../components/CategoryModal';
import { revalidatePath } from 'next/cache';

const prisma = new PrismaClient();

export const updateCategory = async (id: number, data: CategoryForm) => {
	try {
		await prisma.categoria.update({
			where: {
				id,
			},
			data: {
				nombre: data.nombre,
			},
		});

		revalidatePath('/dashboard/categories');
	} catch (error) {
		console.error(error);
	}
};
