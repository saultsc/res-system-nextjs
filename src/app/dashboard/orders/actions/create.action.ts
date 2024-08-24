'use server';

import { revalidatePath } from 'next/cache';

import { prisma } from '@/lib/prisma';

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
	} catch (error) {
		console.log(error);
	}
};
