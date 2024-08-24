'use server';

import { prisma } from '@/lib/prisma';

interface PatchMesa {
	id: string | number;
	nombre?: string;
	capacidad?: number;
	estado?: 'disponible' | 'ocupada' | 'reservada';
}

export const patchMesa = async ({ id, nombre, capacidad, estado }: PatchMesa) => {
	try {
		const updatedMesa = await prisma.mesa.update({
			where: { id: Number(id) },
			data: {
				nombre,
				capacidad,
			},
		});
		return updatedMesa;
	} catch (error) {
		console.log('Error updating mesa:', error);
		throw error;
	} finally {
		await prisma.$disconnect();
	}
};
