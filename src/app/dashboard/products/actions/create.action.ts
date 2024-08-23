'use server';

import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { ProductForm } from '../components/ProductModal';

const prisma = new PrismaClient();

export const createProduct = async (input: ProductForm) => {
	try {
		await prisma.producto.create({
			data: {
				nombre: input.nombre,
				descripcion: input.descripcion!,
				cantidad: input.cantidad,
				categoriaId: +input.categoriaId,
			},
		});

		revalidatePath('/dashboard/products');
	} catch (error) {
		console.log(error);
	}
};
