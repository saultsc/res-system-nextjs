'use server';

import { PrismaClient } from '@prisma/client';
import { TableForm } from '../components/TableModal';
import { revalidatePath } from 'next/cache';

import { prisma } from '@/lib/prisma';

interface PostMesa {
	nombre: string;
	descripcion: string;
	capacidad: number;
}

export const createTable = async ({ nombre, capacidad, descripcion }: TableForm) => {
	try {
		const newMesa = await prisma.mesa.create({
			data: {
				nombre,
				capacidad: +capacidad,
				descripcion: descripcion || '',
			},
		});

		revalidatePath('/dashboard/tables');
		return newMesa;
	} catch (error) {
		console.log('Error creating mesa:', error);
		throw error;
	} finally {
		await prisma.$disconnect();
	}
};
