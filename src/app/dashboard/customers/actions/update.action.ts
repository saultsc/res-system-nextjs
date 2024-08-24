'use server';

import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { CustomerForm } from '../components/CustomerModal';

import { prisma } from '@/lib/prisma';

export const updateCustomer = async (id: number, data: CustomerForm) => {
	try {
		await prisma.cliente.update({
			where: {
				id,
			},
			data: {
				tipoCliente: data.tipoCliente,
				documento: data.documento,
				rnc: data.rnc,
				nombre: data.nombre,
				dirrecion: data.dirrecion,
				email: data.email,
				limiteCredito: data.limiteCredito,
			},
		});

		revalidatePath('/dashboard/customers');
	} catch (error) {
		console.error(error);
	}
};
