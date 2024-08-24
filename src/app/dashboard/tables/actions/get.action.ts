'use server';

import { PrismaClient } from '@prisma/client';

import { prisma } from '@/lib/prisma';

export const getPaginatedTables = async (query: string, currentPage: number = 1) => {
	const rowsPerPage = 10;
	const skip = (currentPage - 1) * rowsPerPage;

	try {
		const parsedId = parseInt(query);
		const isIdValid = !isNaN(parsedId);

		const whereClause = {
			OR: [{ nombre: { contains: query } }, isIdValid ? { id: parsedId } : null].filter(
				(clause) => clause !== null
			),
		};

		const [tables, totalItems] = await Promise.all([
			prisma.mesa.findMany({
				where: whereClause,
				take: rowsPerPage,
				skip,
			}),

			prisma.mesa.count({
				where: whereClause,
			}),
		]);

		const totalPages = Math.ceil(totalItems / rowsPerPage);

		return {
			tables,
			totalPages,
		};
	} catch (error) {
		console.log(error);
		return {
			tables: [],
			totalPages: 0,
		};
	}
};
