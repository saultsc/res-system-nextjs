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
import { createProduct } from '../actions/create.action';
import { updateProduct } from '../actions/update.action';

interface Props {
	action: 'Add' | 'Edit';
	product?: {
		id: number;
		nombre: string;
		cantidad: number;
		descripcion?: string;
		categoriaId: number;
		precio: number; // Agregar el campo precio aquí
	};
	categories: { id: number; nombre: string }[];
}

export type ProductForm = {
	nombre: string;
	cantidad: number;
	descripcion?: string;
	categoriaId: string | number;
	precio: number; // Agregar el campo precio aquí
};

const ProductModal = ({ action = 'Add', product: item, categories }: Props) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
		setValue,
		clearErrors,
	} = useForm<ProductForm>({
		defaultValues: {
			nombre: item?.nombre || '',
			cantidad: item?.cantidad || 0,
			descripcion: item?.descripcion || '',
			categoriaId: item?.categoriaId || '',
			precio: item?.precio || 0, // Agregar el campo precio aquí
		},
	});
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [clearCategoriaId, setClearCategoriaId] = useState(item?.categoriaId || '');

	const onSubmit: SubmitHandler<ProductForm> = async (data) => {
		if (action === 'Add') {
			await createProduct(data);
		} else {
			await updateProduct({ id: item?.id!, ...data, categoriaId: Number(data.categoriaId) });
		}
		setIsDialogOpen(false);
		setTimeout(() => {
			setClearCategoriaId('');
			reset();
		}, 300);
	};

	const handleCategoriaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const value = e.target.value;
		setClearCategoriaId(value);
		setValue('categoriaId', value);
		clearErrors('categoriaId');
	};

	const handleModalClose = (isOpen: boolean) => {
		setIsDialogOpen(isOpen);
		if (isOpen && item) {
			reset({
				nombre: item.nombre || '',
				cantidad: item.cantidad || 0,
				descripcion: item.descripcion || '',
				categoriaId: item.categoriaId || '',
				precio: item.precio || 0, // Agregar el campo precio aquí
			});
			setClearCategoriaId(item.categoriaId || '');
		} else {
			reset();
			setClearCategoriaId('');
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
						{action === 'Add' ? 'Crear Producto' : 'Editar Producto'}
					</DialogTitle>
					<DialogDescription>
						{action === 'Add'
							? 'Rellena el siguiente formulario para crear un nuevo producto.'
							: 'Modifica los campos necesarios para editar el producto.'}
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
										placeholder="Ingresa el nombre del producto"
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
									<Label>Cantidad</Label>
									<Input
										id="cantidad"
										type="number"
										placeholder="Ingresa la cantidad del producto"
										className={clsx({ 'border-red-500': errors.cantidad })}
										{...register('cantidad', {
											required: 'Campo obligatorio',
											valueAsNumber: true,
										})}
									/>
									{errors.cantidad && (
										<p className="text-red-500 text-sm mt-1">
											{errors.cantidad.message}
										</p>
									)}
								</div>
								<div className="space-y-2">
									<Label>Descripción</Label>
									<Input
										id="descripcion"
										placeholder="Ingresa la descripción del producto"
										className={clsx({ 'border-red-500': errors.descripcion })}
										{...register('descripcion')}
									/>
								</div>
								<div className="space-y-2">
									<Label>Precio</Label>
									<Input
										id="precio"
										type="number"
										placeholder="Ingresa el precio del producto"
										className={clsx({ 'border-red-500': errors.precio })}
										{...register('precio', {
											required: 'Campo obligatorio',
											valueAsNumber: true,
											min: {
												value: 0,
												message: 'El precio no puede ser negativo',
											},
										})}
									/>
									{errors.precio && (
										<p className="text-red-500 text-sm mt-1">
											{errors.precio.message}
										</p>
									)}
								</div>
								<div className="space-y-2">
									<Label>Categoría</Label>
									<div className="relative">
										<select
											{...register('categoriaId', {
												required: 'Campo obligatorio',
											})}
											value={clearCategoriaId}
											onChange={handleCategoriaChange}
											className={clsx(
												'border border-gray-300 rounded-md p-2 w-full',
												{ 'border-red-500': errors.categoriaId }
											)}
										>
											<option value="" disabled>
												Selecciona una categoría
											</option>
											{categories.map((category) => (
												<option
													key={category.id}
													value={category.id.toString()}
												>
													{category.nombre}
												</option>
											))}
										</select>
										{errors.categoriaId && (
											<p className="text-red-500 text-sm mt-1">
												{errors.categoriaId.message}
											</p>
										)}
										{clearCategoriaId && (
											<IoCloseCircle
												size={25}
												className="absolute right-6 top-5 transform -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-600"
												onClick={() => {
													setClearCategoriaId('');
													setValue('categoriaId', '');
												}}
											/>
										)}
									</div>
								</div>
								<Button type="submit" className="w-full">
									{action === 'Add' ? 'Crear Producto' : 'Guardar Cambios'}
								</Button>
							</form>
						</div>
					</div>
				</CardContent>
			</DialogContent>
		</Dialog>
	);
};

export default ProductModal;
