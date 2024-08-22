'use server';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getPaginatedCategories = async (query: string, currentPage: number = 1) => {
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

		const [categories, totalItems] = await Promise.all([
			prisma.categoria.findMany({
				where: whereClause,
				take: rowsPerPage,
				skip,
			}),

			prisma.categoria.count({
				where: whereClause,
			}),
		]);

		const totalPages = Math.ceil(totalItems / rowsPerPage);

		return {
			categories,
			totalPages,
		};
	} catch (error) {
		return {
			categories: [],
			totalPages: 0,
		};
	}
};
