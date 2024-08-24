'use server';

import { PrismaClient } from '@prisma/client';
import { RoomForm } from '../components/RoomModal';
import { revalidatePath } from 'next/cache';

import { prisma } from '@/lib/prisma';

export const createRoom = async (data: RoomForm) => {
	try {
		await prisma.sala.create({
			data: {
				nombre: data.nombre,
			},
		});

		revalidatePath('/dashboard/rooms');
	} catch (error) {
		console.log(error);
	}
};

export const postAssignMesa = async (salaId: number, mesasId: number[]) => {
	try {
		// Obtener las mesas actualmente asignadas a la sala
		const currentAssignments = await prisma.salamesa.findMany({
			where: { salaId },
			select: { mesaId: true },
		});
		const currentMesaIds = currentAssignments.map((assignment) => assignment.mesaId);

		// Determinar mesas a asignar y desasignar
		const mesasToAssign = mesasId.filter((mesaId) => !currentMesaIds.includes(mesaId));
		const mesasToUnassign = currentMesaIds.filter((mesaId) => !mesasId.includes(mesaId));

		// Asignar mesas
		if (mesasToAssign.length > 0) {
			await prisma.salamesa.createMany({
				data: mesasToAssign.map((mesaId) => ({
					salaId,
					mesaId,
				})),
			});
		}

		// Desasignar mesas
		if (mesasToUnassign.length > 0) {
			await prisma.salamesa.deleteMany({
				where: {
					salaId,
					mesaId: {
						in: mesasToUnassign,
					},
				},
			});
		}

		return { ok: true, message: 'Mesas asignadas y desasignadas correctamente' };
	} catch (error) {
		console.log('Error managing mesa assignments:', error);
		return { ok: false, message: 'Error al asignar o desasignar mesas' };
	} finally {
		await prisma.$disconnect();
	}
};
