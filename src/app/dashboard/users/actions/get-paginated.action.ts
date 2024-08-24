'use server';

import { prisma } from '@/lib/prisma';

interface QueryParams {
	currentPage: number;
	query: any;
}

export const getPaginatedUsers = async (query: any, currentPage: number) => {
	const rowPerPage = 10; // Puedes ajustar este valor según tus necesidades

	try {
		const where = query
			? {
					OR: [{ fullName: { contains: query } }, { email: { contains: query } }],
			  }
			: {};

		const totalRecords = await prisma.user.count({ where });
		const users = await prisma.user.findMany({
			where,
			skip: (currentPage - 1) * rowPerPage,
			take: rowPerPage,
		});

		return {
			users,
			totalPages: Math.ceil(totalRecords / rowPerPage),
		};
	} catch (error) {
		console.error('Error fetching paginated users:', error);
		return {
			users: [],
			totalPages: 0,
		};
	}
};
