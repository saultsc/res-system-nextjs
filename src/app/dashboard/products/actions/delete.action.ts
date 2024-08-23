'use server';

import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';

const prisma = new PrismaClient();

export const deleteProduct = async (id: number) => {
	try {
		await prisma.producto.delete({
			where: {
				id: id,
			},
		});

		revalidatePath('/dashboard/products');
	} catch (error) {
		console.log(error);
	}
};
