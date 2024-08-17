'use client';

import React, { useState } from 'react';

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
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components';

const CustomerModal: React.FC = () => {
	const [selectedValue, setSelectedValue] = useState<string | null>(null);

	const handleClearSelection = (event: React.MouseEvent) => {
		event.stopPropagation(); // Evitar que el evento se propague al SelectTrigger
		setSelectedValue(null);
	};

	return (
		<Dialog>
			<DialogTrigger asChild className="flex space-x-4">
				<Button
					variant="default"
					className="ml-auto bg-green-600 hover:bg-green-700 text-white"
				>
					<IoAddOutline size={20} className="mr-2" />
					AGREGAR
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[800px]">
				<DialogHeader>
					<DialogTitle className="text-2xl font-bold">Crear Cliente</DialogTitle>
					<DialogDescription>
						Rellena el siguiente formulario para crear un nuevo cliente.
					</DialogDescription>
				</DialogHeader>
				<CardContent>
					<div className="flex flex-col items-center gap-6 sm:flex-row">
						<div className="flex-1">
							<form className="space-y-4" action={''}>
								<div className="grid grid-cols-2 gap-4">
									<div className="space-y-2">
										<Label htmlFor="tipoCliente">Tipo de Cliente</Label>
										<Select
											value={selectedValue || ''}
											onValueChange={setSelectedValue}
											required
										>
											<SelectTrigger className="relative">
												<SelectValue placeholder="Selecciona el tipo de cliente" />
												{selectedValue && (
													<IoCloseCircle
														size={20}
														className="absolute right-8 top-1/2 transform -translate-y-1/2 cursor-pointer z-30 transition-all"
														onClick={handleClearSelection}
													/>
												)}
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="persona">Persona</SelectItem>
												<SelectItem value="empresa">Empresa</SelectItem>
											</SelectContent>
										</Select>
									</div>
									<div className="space-y-2">
										<Label htmlFor="documento">Documento</Label>
										<Input
											required
											id="documento"
											type="number"
											placeholder="Ingresa el documento del cliente"
										/>
									</div>
								</div>
								<div className="space-y-2">
									<Label htmlFor="nombre">Nombre</Label>
									<Input
										id="nombre"
										placeholder="Ingresa el nombre del cliente"
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="email">Correo electrónico</Label>
									<Input
										id="email"
										type="email"
										placeholder="Ingresa el correo del cliente"
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="limiteCredito">Límite de Crédito</Label>
									<Input
										id="limiteCredito"
										type="number"
										placeholder="Ingresa el límite de crédito del cliente"
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="rnc">RNC</Label>
									<Input id="rnc" placeholder="Ingresa el RNC del cliente" />
								</div>
								<Button type="submit" className="w-full">
									Crear Cliente
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
