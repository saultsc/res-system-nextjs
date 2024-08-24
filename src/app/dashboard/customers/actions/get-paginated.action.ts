'use server';

import { PrismaClient } from '@prisma/client';

import { prisma } from '@/lib/prisma';

export const getPaginatedCustomers = async (query: string, currentPage: number = 1) => {
	const rowsPerPage = 10;
	const skip = (currentPage - 1) * rowsPerPage;

	try {
		const [customers, totalItems] = await Promise.all([
			prisma.cliente.findMany({
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
			}),
			prisma.cliente.count({
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
			}),
		]);

		const totalPages = Math.ceil(totalItems / rowsPerPage);

		return {
			customers,
			totalPages,
		};
	} catch (error) {
		return {
			customers: [],
			totalPages: 0,
		};
	}
};
