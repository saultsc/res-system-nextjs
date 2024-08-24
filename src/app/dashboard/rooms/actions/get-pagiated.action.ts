'use server';

import { PrismaClient } from '@prisma/client';

import { prisma } from '@/lib/prisma';

export const getPaginatedRooms = async (query: string, currentPage: number = 1) => {
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

		const [rooms, totalItems] = await Promise.all([
			prisma.sala.findMany({
				where: whereClause,
				take: rowsPerPage,
				skip,
			}),

			prisma.sala.count({
				where: whereClause,
			}),
		]);

		const totalPages = Math.ceil(totalItems / rowsPerPage);

		return {
			rooms,
			totalPages,
		};
	} catch (error) {
		return {
			rooms: [],
			totalPages: 0,
		};
	}
};
