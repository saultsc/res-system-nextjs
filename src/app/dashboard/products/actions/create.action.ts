'use server';

import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { ProductForm } from '../components/ProductModal';

import { prisma } from '@/lib/prisma';

export const createProduct = async (input: ProductForm) => {
	try {
		await prisma.producto.create({
			data: {
				nombre: input.nombre,
				descripcion: input.descripcion!,
				cantidad: input.cantidad,
				precio: +input.precio,
				categoriaId: +input.categoriaId,
			},
		});

		revalidatePath('/dashboard/products');
	} catch (error) {
		console.log(error);
	}
};
