'use server';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
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
