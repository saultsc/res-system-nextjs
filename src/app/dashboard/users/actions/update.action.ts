'use server';
import { prisma } from '@/lib/prisma';

interface UpdateUser {
	id: string | number;
	fullName: string;
	email: string;
	password: string;
	role: 'admin' | 'user';
}

export const updateUser = async ({ id, fullName, email, password, role }: UpdateUser) => {
	try {
		const updatedUser = await prisma.user.update({
			where: { id: Number(id) },
			data: {
				fullName,
				email,
				password,
				role,
			},
		});
		return updatedUser;
	} catch (error) {
		console.log('Error updating user:', error);
		throw error;
	} finally {
		await prisma.$disconnect();
	}
};
