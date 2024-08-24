'use server';

import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';

import { prisma } from '@/lib/prisma';

export const deleteRoom = async (id: number) => {
	try {
		await prisma.cliente.delete({
			where: {
				id: id,
			},
		});

		revalidatePath('/dashboard/rooms');
	} catch (error) {
		console.log(error);
	}
};
