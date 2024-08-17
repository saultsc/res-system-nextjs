'use server';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getCustomersTotalPages = async (query: string): Promise<number> => {
	try {
		const totalPages = await prisma.cliente.count({
			where: {
				OR: [
					{
						nombre: {
							contains: query,
						},
					},
					{
						email: {
							contains: query,
						},
					},
				],
			},
		});

		return totalPages || 1;
	} catch (error) {
		console.error('Error fetching total pages:', error);
		return 1;
	}
};
