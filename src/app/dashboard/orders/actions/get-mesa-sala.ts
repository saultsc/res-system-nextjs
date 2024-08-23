'use server';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getSalasMesas() {
	try {
		const salasMesas = await prisma.salamesa.findMany({
			include: {
				sala: true,
				mesa: true,
			},
		});
		return salasMesas;
	} catch (error) {
		console.error('Error fetching salasMesas:', error);
		throw error;
	}
}
