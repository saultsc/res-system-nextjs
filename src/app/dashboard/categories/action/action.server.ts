'use server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getPedidoById(pedidoId: number) {
	try {
		const pedido = await prisma.pedido.findUnique({
			where: { id: pedidoId },
			include: {
				productos: true,
			},
		});
		return pedido;
	} catch (error) {
		console.error('Error fetching pedido:', error);
		throw error;
	}
}

export const updatePedido = async (id: number, data: any) => {
	try {
		await prisma.pedido.update({
			where: { id: Number(id) },
			data: {
				...data,
				productos: {
					deleteMany: {}, // Elimina todos los productos actuales
					create: data.productos, // Crea los nuevos productos
				},
			},
		});
	} catch (error) {
		console.error('Error updating pedido:', error);
		throw error;
	}
};
