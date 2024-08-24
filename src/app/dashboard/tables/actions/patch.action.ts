'use server';

import { PrismaClient } from '@prisma/client';
import { TableForm } from '../components/TableModal';
import { revalidatePath } from 'next/cache';

import { prisma } from '@/lib/prisma';

export const updateTable = async (id: number, { nombre, capacidad, descripcion }: TableForm) => {
	try {
		const updatedMesa = await prisma.mesa.update({
			where: { id: Number(id) },
			data: {
				nombre,
				capacidad,
				descripcion,
			},
		});

		revalidatePath('/dashboard/tables');
		return updatedMesa;
	} catch (error) {
		console.log('Error updating mesa:', error);
		throw error;
	} finally {
		await prisma.$disconnect();
	}
};
