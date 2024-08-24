'use server';

import { PrismaClient } from '@prisma/client';

import { prisma } from '@/lib/prisma';

export const getPaginatedOrders = async (
	query: string,
	status: string,
	currentPage: number = 1
) => {
	const pageSize = 10;
	const skip = (currentPage - 1) * pageSize;

	try {
		const parsedId = parseInt(query);
		const isIdValid = !isNaN(parsedId);

		const whereClause = {
			AND: [
				{
					OR: [
						isIdValid ? { id: parsedId } : null,
						{ estado: { contains: query } },
					].filter((clause) => clause !== null),
				},
				status ? { estado: { equals: status } } : {},
			],
		};

		const [orders, totalOrders] = await Promise.all([
			prisma.pedido.findMany({
				where: whereClause,
				skip,
				take: pageSize,
				include: {
					salamesa: {
						include: {
							sala: true,
							mesa: true,
						},
					},
					productos: {
						include: {
							producto: true,
						},
					},
				},
			}),
			prisma.pedido.count({ where: whereClause }),
		]);

		const totalPages = Math.ceil(totalOrders / pageSize);

		return { orders, totalPages };
	} catch (error) {
		console.error(error);
		return { orders: [], totalPages: 0 };
	}
};
