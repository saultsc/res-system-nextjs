'use server';

import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { CustomerForm } from '../components/CustomerModal';

const prisma = new PrismaClient();

export const createCustomer = async (customer: CustomerForm) => {
	try {
		await prisma.cliente.create({
			data: {
				tipoCliente: customer.tipoCliente,
				documento: customer.documento,
				rnc: customer.rnc,
				nombre: customer.nombre,
				dirrecion: customer.dirrecion,
				email: customer.email,
				limiteCredito: customer.limiteCredito,
			},
		});

		revalidatePath('/dashboard/customers');
	} catch (error) {
		console.error('Error creating customer:', error);
	}
};
