'use server';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getPaginatedCustomers = async (query: string, currentPage: number) => {
	const rowsPerPage = 10;
	const skip = (currentPage - 1) * rowsPerPage;

	const customers = await prisma.cliente.findMany({
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
		take: rowsPerPage,
		skip,
	});

	return {
		customers,
	};
};
