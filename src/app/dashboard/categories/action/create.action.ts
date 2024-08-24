'use server';

import { PrismaClient } from '@prisma/client';
import { CategoryForm } from '../components/CategoryModal';
import { revalidatePath } from 'next/cache';

import { prisma } from '@/lib/prisma';

export const createCategory = async (data: CategoryForm) => {
	try {
		await prisma.categoria.create({
			data: {
				nombre: data.nombre,
			},
		});

		revalidatePath('/dashboard/categories');
	} catch (error) {
		console.log(error);
	}
};
