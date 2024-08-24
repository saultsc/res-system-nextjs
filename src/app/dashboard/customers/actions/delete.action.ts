'use server';

import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';

import { prisma } from '@/lib/prisma';

export const deleteCustomer = async (id: number) => {
	try {
		await prisma.cliente.delete({ where: { id } });

		revalidatePath('/dashboard/customers');
	} catch (error) {
		console.error(error);
	}
};
