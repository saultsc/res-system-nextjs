'use server';

import { PrismaClient } from '@prisma/client';
import { RoomForm } from '../components/RoomModal';
import { revalidatePath } from 'next/cache';

const prisma = new PrismaClient();

export const updateRoom = async (id: number, data: RoomForm) => {
	try {
		await prisma.sala.update({
			where: {
				id: id,
			},
			data: {
				nombre: data.nombre,
				// Agregar otros campos necesarios aquí
			},
		});

		revalidatePath('/dashboard/rooms');
	} catch (error) {
		console.log(error);
	}
};
