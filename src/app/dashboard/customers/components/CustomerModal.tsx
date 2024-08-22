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
import { Customer } from '@/interfaces';
import clsx from 'clsx';
import { useForm, SubmitHandler, set } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { FilePenIcon } from 'lucide-react';
import { createCustomer } from '../actions/create.action';
import { updateCustomer } from '../actions/update.action';

interface Props {
	action: 'Add' | 'Edit';
	customer?: Customer;
}

export type CustomerForm = {
	tipoCliente: string;
	documento: string;
	rnc?: string;
	nombre?: string;
	dirrecion?: string;
	email?: string;
	limiteCredito: string;
};

const CustomerModal = ({ action = 'Add', customer: item }: Props) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
		reset,
		clearErrors,
	} = useForm<CustomerForm>({
		defaultValues: {
			tipoCliente: item?.tipoCliente || '',
			documento: item?.documento || '',
			rnc: item?.rnc || '',
			nombre: item?.nombre || '',
			dirrecion: item?.dirrecion || '',
			email: item?.email || '',
			limiteCredito: item?.limiteCredito || '',
		},
	});
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [clearTipoCliente, setClearTipoCliente] = useState(item?.tipoCliente || '');

	const onSubmit: SubmitHandler<CustomerForm> = async (data) => {
		if (action === 'Add') {
			await createCustomer(data);
		} else {
			await updateCustomer(item?.id!, data);
		}
		setIsDialogOpen(false);
		setTimeout(() => {
			setClearTipoCliente('');
			reset();
		}, 300);
	};
	const handleTipoClienteChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const value = e.target.value;
		setClearTipoCliente(value);
		setValue('tipoCliente', clearTipoCliente);
		clearErrors('tipoCliente');
	};

	const handleModalClose = (isOpen: boolean) => {
		setIsDialogOpen(isOpen);
		if (isOpen && item) {
			reset({
				tipoCliente: item.tipoCliente || '',
				documento: item.documento || '',
				rnc: item.rnc || '',
				nombre: item.nombre || '',
				dirrecion: item.dirrecion || '',
				email: item.email || '',
				limiteCredito: item.limiteCredito || '',
			});
			setClearTipoCliente(item.tipoCliente || '');
		} else {
			reset();
			setClearTipoCliente('');
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
						{action === 'Add' ? 'Crear Cliente' : 'Editar Cliente'}
					</DialogTitle>
					<DialogDescription>
						{action === 'Add'
							? 'Rellena el siguiente formulario para crear un nuevo cliente.'
							: 'Modifica los campos necesarios para editar el cliente.'}
					</DialogDescription>
				</DialogHeader>
				<CardContent>
					<div className="flex flex-col items-center gap-6 sm:flex-row">
						<div className="flex-1">
							<form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
								<div className="grid grid-cols-2 gap-6">
									<div className="space-y-2">
										<Label>Tipo de Cliente</Label>
										<div className="relative">
											<select
												{...register('tipoCliente', {
													required: 'Campo obligatorio',
												})}
												value={clearTipoCliente}
												onChange={handleTipoClienteChange}
												className={clsx(
													'border border-gray-300 rounded-md p-2 w-full',
													{ 'border-red-500': errors.tipoCliente }
												)}
											>
												<option value="" disabled>
													Selecciona el tipo de cliente
												</option>
												<option value="Persona">Persona</option>
												<option value="Empresa">Empresa</option>
												<option value="No especificado">
													No especificado
												</option>
											</select>
											{errors.tipoCliente && (
												<p className="text-red-500 text-sm mt-1">
													{errors.tipoCliente.message}
												</p>
											)}
											{clearTipoCliente && (
												<IoCloseCircle
													size={25}
													className="absolute right-6 top-5 transform -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-600"
													onClick={() => {
														setClearTipoCliente('');
														setValue('tipoCliente', '');
													}}
												/>
											)}
										</div>
									</div>
									<div className="space-y-2">
										<Label>Documento</Label>
										<Input
											id="documento"
											type="text"
											placeholder="Ingresa el documento del cliente"
											className={clsx({ 'border-red-500': errors.documento })}
											{...register('documento', {
												required: 'Campo obligatorio',
												pattern: {
													value: /^\d{11}$/,
													message:
														'El documento debe ser un numerico y de 11 caracteres',
												},
											})}
										/>
										{errors.documento && (
											<p className="text-red-500 text-sm mt-1">
												{errors.documento.message}
											</p>
										)}
									</div>
								</div>
								<div className="grid grid-cols-2 gap-6">
									<div className="space-y-2">
										<Label>Nombre</Label>
										<Input
											id="nombre"
											placeholder="Ingresa el nombre del cliente"
											className={clsx({ 'border-red-500': errors.nombre })}
											{...register('nombre')}
										/>
										{errors.nombre && (
											<p className="text-red-500 text-sm mt-1">
												{errors.nombre.message}
											</p>
										)}
									</div>
									<div className="space-y-2">
										<Label>Correo electrónico</Label>
										<Input
											id="email"
											type="email"
											placeholder="Ingresa el correo del cliente"
											className={clsx({ 'border-red-500': errors.email })}
											{...register('email')}
										/>
										{errors.email && (
											<p className="text-red-500 text-sm mt-1">
												{errors.email.message}
											</p>
										)}
									</div>
								</div>
								<div className="space-y-2">
									<Label>Dirección</Label>
									<Input
										type="text"
										placeholder="Ingresa la dirección del cliente"
										className={clsx({ 'border-red-500': errors.dirrecion })}
										{...register('dirrecion')}
									/>
									{errors.dirrecion && (
										<p className="text-red-500 text-sm mt-1">
											{errors.dirrecion.message}
										</p>
									)}
								</div>
								<div className="grid grid-cols-2 gap-6">
									<div className="space-y-2">
										<Label>Límite de Crédito</Label>
										<Input
											id="limiteCredito"
											type="text"
											placeholder="Ingresa el límite de crédito del cliente"
											className={clsx({
												'border-red-500': errors.limiteCredito,
											})}
											{...register('limiteCredito', {
												required: 'Campo obligatorio',
												maxLength: {
													value: 30,
													message: 'Maximo 30 caracteres',
												},
												pattern: {
													value: /^\d+$/,
													message: 'El documento debe ser numérico',
												},
											})}
										/>
										{errors.limiteCredito && (
											<p className="text-red-500 text-sm mt-1">
												{errors.limiteCredito.message}
											</p>
										)}
									</div>
									<div className="space-y-2">
										<Label>RNC</Label>
										<Input
											id="rnc"
											placeholder="Ingresa el RNC del cliente"
											className={clsx({ 'border-red-500': errors.rnc })}
											{...register('rnc')}
										/>
										{errors.rnc && (
											<p className="text-red-500 text-sm mt-1">
												{errors.rnc.message}
											</p>
										)}
									</div>
								</div>
								<Button type="submit" className="w-full">
									{action === 'Add' ? 'Crear Cliente' : 'Guardar Cambios'}
								</Button>
							</form>
						</div>
					</div>
				</CardContent>
			</DialogContent>
		</Dialog>
	);
};

export default CustomerModal;
