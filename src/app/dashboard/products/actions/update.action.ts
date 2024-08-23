'use server';

import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';

const prisma = new PrismaClient();

interface UpdateProductInput {
	id: number;
	nombre?: string;
	descripcion?: string;
	cantidad?: number;
	categoriaId?: number;
	precio?: number; // Agregar el campo precio aquí
}

export const updateProduct = async (input: UpdateProductInput) => {
	try {
		await prisma.producto.update({
			where: {
				id: input.id,
			},
			data: {
				nombre: input.nombre,
				descripcion: input.descripcion,
				cantidad: input.cantidad,
				categoriaId: input.categoriaId,
				precio: input.precio, // Agregar el campo precio aquí
			},
		});

		revalidatePath('/dashboard/products');
	} catch (error) {
		console.log(error);
	}
};
