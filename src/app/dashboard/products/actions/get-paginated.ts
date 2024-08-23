'use server';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getPaginatedProducts = async (
	query: string,
	category: string,
	currentPage: number = 1
) => {
	const rowsPerPage = 10;
	const skip = (currentPage - 1) * rowsPerPage;

	try {
		const parsedId = parseInt(query);
		const isIdValid = !isNaN(parsedId);

		const whereClause = {
			OR: [
				{ nombre: { contains: query } },
				isIdValid ? { id: parsedId } : null,
				{ categoria: { nombre: { contains: category } } },
			].filter((clause) => clause !== null),
		};

		const [products, totalItems] = await Promise.all([
			prisma.producto.findMany({
				where: whereClause,
				take: rowsPerPage,
				skip,
				include: {
					categoria: true,
				},
			}),

			prisma.producto.count({
				where: whereClause,
			}),
		]);

		const totalPages = Math.ceil(totalItems / rowsPerPage);

		return {
			products,
			totalPages,
		};
	} catch (error) {
		return {
			products: [],
			totalPages: 0,
		};
	}
};
