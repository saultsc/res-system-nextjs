'use server';
import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { UserForm } from '../components/UserModal';

export const createUser = async (user: UserForm) => {
	try {
		await prisma.user.create({
			data: {
				fullName: user.fullName,
				email: user.email,
				password: user.password,
				role: user.role,
			},
		});

		revalidatePath('/dashboard/users');
	} catch (error) {
		console.error('Error creating user:', error);
	}
};
