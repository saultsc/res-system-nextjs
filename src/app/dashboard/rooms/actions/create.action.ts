'use server';

import { PrismaClient } from '@prisma/client';
import { RoomForm } from '../components/RoomModal';
import { revalidatePath } from 'next/cache';

const prisma = new PrismaClient();

export const createRoom = async (data: RoomForm) => {
	try {
		await prisma.sala.create({
			data: {
				nombre: data.nombre,
			},
		});

		revalidatePath('/dashboard/rooms');
	} catch (error) {
		console.log(error);
	}
};
