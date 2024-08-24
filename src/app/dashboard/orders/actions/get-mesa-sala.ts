'use server';

import { prisma } from '@/lib/prisma';

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
