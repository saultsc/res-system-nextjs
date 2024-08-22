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
import { createCategory } from '../action/create.action';
import { updateCategory } from '../action/update.action';

interface Props {
	action: 'Add' | 'Edit';
	category?: { id: number; nombre: string };
}

export type CategoryForm = {
	nombre: string;
};

const CategoryModal = ({ action = 'Add', category: item }: Props) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<CategoryForm>({
		defaultValues: {
			nombre: item?.nombre || '',
		},
	});
	const [isDialogOpen, setIsDialogOpen] = useState(false);

	const onSubmit: SubmitHandler<CategoryForm> = async (data) => {
		if (action === 'Add') {
			await createCategory(data);
		} else {
			await updateCategory(item?.id!, data);
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
						{action === 'Add' ? 'Crear Categoría' : 'Editar Categoría'}
					</DialogTitle>
					<DialogDescription>
						{action === 'Add'
							? 'Rellena el siguiente formulario para crear una nueva categoría.'
							: 'Modifica los campos necesarios para editar la categoría.'}
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
										placeholder="Ingresa el nombre de la categoría"
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
								<Button type="submit" className="w-full">
									{action === 'Add' ? 'Crear Categoría' : 'Guardar Cambios'}
								</Button>
							</form>
						</div>
					</div>
				</CardContent>
			</DialogContent>
		</Dialog>
	);
};

export default CategoryModal;
