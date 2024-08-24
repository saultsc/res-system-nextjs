'use server';

import { PrismaClient } from '@prisma/client';

import { prisma } from '@/lib/prisma';

export const getByIdCustomer = async (id: number) => {
	try {
		return await prisma.cliente.findUnique({
			where: {
				id,
			},
		});
	} catch (error) {
		console.log(error);
	}
};
