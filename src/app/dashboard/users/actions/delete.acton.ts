'use server';

import { prisma } from '@/lib/prisma';

export const deleteUser = async (id: number) => {
	try {
		await prisma.user.delete({
			where: { id },
		});
	} catch (error) {
		console.log('Error deleting user:', error);
		throw error;
	} finally {
		await prisma.$disconnect();
	}
};
