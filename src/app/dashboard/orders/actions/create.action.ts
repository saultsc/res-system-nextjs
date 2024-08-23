'use server';

import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const prisma = new PrismaClient();

type PedidoForm = {
	cantidadProductos: number;
	estado: string;
	monto: number;
	salaId: number;
	mesaId: number;
	productos: { productoId: number; cantidad: number }[];
};

export const createPedido = async (input: PedidoForm) => {
	try {
		await prisma.pedido.create({
			data: {
				cantidadProductos: input.cantidadProductos,
				estado: input.estado,
				monto: input.monto,
				salaId: input.salaId,
				mesaId: input.mesaId,
				productos: {
					create: input.productos.map((producto) => ({
						productoId: producto.productoId,
						cantidad: producto.cantidad,
					})),
				},
			},
		});

		revalidatePath('/dashboard/orders');
		redirect('/dashboard/orders');
	} catch (error) {
		console.log(error);
	}
};
