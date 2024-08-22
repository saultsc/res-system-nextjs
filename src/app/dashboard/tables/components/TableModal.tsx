'use client';
import { IoAddOutline, IoCloseCircle } from 'react-icons/io5';
import {
	Button,
	CardContent,
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	Input,
	Label,
} from '@/components';
import clsx from 'clsx';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useState } from 'react';
import { FilePenIcon } from 'lucide-react';
import { createTable } from '../actions/post.action';
import { updateTable } from '../actions/patch.action';

interface Props {
	action: 'Add' | 'Edit';
	table?: { id: number; nombre: string; descripcion?: string; capacidad: number };
}

export type TableForm = {
	nombre: string;
	descripcion?: string;
	capacidad: number;
};

const TableModal = ({ action = 'Add', table: item }: Props) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<TableForm>({
		defaultValues: {
			nombre: item?.nombre || '',
			descripcion: item?.descripcion || '',
			capacidad: item?.capacidad || 1,
		},
	});
	const [isDialogOpen, setIsDialogOpen] = useState(false);

	const onSubmit: SubmitHandler<TableForm> = async (data) => {
		if (action === 'Add') {
			await createTable(data);
		} else {
			await updateTable(item?.id!, data);
		}
		setIsDialogOpen(false);
		setTimeout(() => {
			reset();
		}, 300);
	};

	const handleModalClose = (isOpen: boolean) => {
		setIsDialogOpen(isOpen);
		if (isOpen && item) {
			reset({
				nombre: item.nombre || '',
				descripcion: item.descripcion || '',
				capacidad: item.capacidad || 1,
			});
		} else {
			reset();
		}
	};

	return (
		<Dialog open={isDialogOpen} onOpenChange={handleModalClose}>
			<DialogTrigger asChild className="flex space-x-4">
				<Button
					variant="default"
					className={clsx('text-white', {
						'bg-green-600 hover:bg-green-700 ml-auto': action === 'Add',
						'bg-yellow-500 hover:bg-yellow-600 text-white mr-2': action === 'Edit',
					})}
				>
					{action === 'Add' ? (
						<>
							<IoAddOutline size={20} className="mr-2" />
							AGREGAR
						</>
					) : (
						<>
							<FilePenIcon size={25} />
						</>
					)}
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[900px]">
				<DialogHeader>
					<DialogTitle className="text-2xl font-bold">
						{action === 'Add' ? 'Crear Mesa' : 'Editar Mesa'}
					</DialogTitle>
					<DialogDescription>
						{action === 'Add'
							? 'Rellena el siguiente formulario para crear una nueva mesa.'
							: 'Modifica los campos necesarios para editar la mesa.'}
					</DialogDescription>
				</DialogHeader>
				<CardContent>
					<div className="flex flex-col items-center gap-6 sm:flex-row">
						<div className="flex-1">
							<form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
								<div className="space-y-2">
									<Label>Nombre</Label>
									<Input
										id="nombre"
										placeholder="Ingresa el nombre de la mesa"
										className={clsx({ 'border-red-500': errors.nombre })}
										{...register('nombre', {
											required: 'Campo obligatorio',
										})}
									/>
									{errors.nombre && (
										<p className="text-red-500 text-sm mt-1">
											{errors.nombre.message}
										</p>
									)}
								</div>
								<div className="space-y-2">
									<Label>Descripción</Label>
									<Input
										id="descripcion"
										placeholder="Ingresa la descripción de la mesa"
										{...register('descripcion')}
									/>
								</div>
								<div className="space-y-2">
									<Label>Capacidad</Label>
									<Input
										id="capacidad"
										type="number"
										placeholder="Ingresa la capacidad de la mesa"
										className={clsx({ 'border-red-500': errors.capacidad })}
										{...register('capacidad', {
											required: 'Campo obligatorio',
											min: { value: 1, message: 'La capacidad mínima es 1' },
											max: {
												value: 10,
												message: 'La capacidad máxima es 10',
											},
										})}
									/>
									{errors.capacidad && (
										<p className="text-red-500 text-sm mt-1">
											{errors.capacidad.message}
										</p>
									)}
								</div>
								<Button type="submit" className="w-full">
									{action === 'Add' ? 'Crear mesa' : 'Guardar cambios'}
								</Button>
							</form>
						</div>
					</div>
				</CardContent>
			</DialogContent>
		</Dialog>
	);
};

export default TableModal;
