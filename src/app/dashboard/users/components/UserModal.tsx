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
import { createUser } from '../actions/create.action';
import { updateUser } from '../actions/update.action';

interface Props {
	action: 'Add' | 'Edit';
	user?: any;
}

export type UserForm = {
	fullName: string;
	email: string;
	password: string;
	role: 'admin' | 'user';
};

const UserModal = ({ action = 'Add', user: item }: Props) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
		setValue,
		clearErrors,
	} = useForm<UserForm>({
		defaultValues: {
			fullName: item?.fullName || '',
			email: item?.email || '',
			password: '',
			role: item?.role || 'user',
		},
	});
	const [isDialogOpen, setIsDialogOpen] = useState(false);

	const onSubmit: SubmitHandler<UserForm> = async (data) => {
		if (action === 'Add') {
			await createUser(data);
		} else {
			await updateUser({ id: item.id, ...data });
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
				fullName: item.fullName || '',
				email: item.email || '',
				password: '',
				role: item.role || 'user',
			});
		} else {
			reset();
		}
	};

	const [clearRole, setClearRole] = useState(item?.role || 'user');

	const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const value = e.target.value as 'admin' | 'user';
		setClearRole(value);
		setValue('role', value);
		clearErrors('role');
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
						{action === 'Add' ? 'Crear Usuario' : 'Editar Usuario'}
					</DialogTitle>
					<DialogDescription>
						{action === 'Add'
							? 'Rellena el siguiente formulario para crear un nuevo usuario.'
							: 'Modifica los campos necesarios para editar el usuario.'}
					</DialogDescription>
				</DialogHeader>
				<CardContent>
					<div className="flex flex-col items-center gap-6 sm:flex-row">
						<div className="flex-1">
							<form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
								<div className="space-y-2">
									<Label>Nombre Completo</Label>
									<Input
										id="fullName"
										placeholder="Ingresa el nombre completo del usuario"
										className={clsx({ 'border-red-500': errors.fullName })}
										{...register('fullName', { required: 'Campo obligatorio' })}
									/>
									{errors.fullName && (
										<p className="text-red-500 text-sm mt-1">
											{errors.fullName.message}
										</p>
									)}
								</div>
								<div className="space-y-2">
									<Label>Correo Electrónico</Label>
									<Input
										id="email"
										type="email"
										placeholder="Ingresa el correo del usuario"
										className={clsx({ 'border-red-500': errors.email })}
										{...register('email', { required: 'Campo obligatorio' })}
									/>
									{errors.email && (
										<p className="text-red-500 text-sm mt-1">
											{errors.email.message}
										</p>
									)}
								</div>
								<div className="space-y-2">
									<Label>Contraseña</Label>
									<Input
										id="password"
										type="password"
										placeholder="Ingresa la contraseña del usuario"
										className={clsx({ 'border-red-500': errors.password })}
										{...register('password', { required: 'Campo obligatorio' })}
									/>
									{errors.password && (
										<p className="text-red-500 text-sm mt-1">
											{errors.password.message}
										</p>
									)}
								</div>
								<div className="space-y-2">
									<Label>Rol</Label>
									<div className="relative">
										<select
											{...register('role', { required: 'Campo obligatorio' })}
											className={clsx(
												'border border-gray-300 rounded-md p-2 w-full',
												{ 'border-red-500': errors.role }
											)}
											onChange={handleRoleChange}
											value={clearRole}
										>
											<option value="user">Usuario</option>
											<option value="admin">Administrador</option>
										</select>
										{errors.role && (
											<p className="text-red-500 text-sm mt-1">
												{errors.role.message}
											</p>
										)}
										{clearRole && (
											<IoCloseCircle
												size={25}
												className="absolute right-6 top-5 transform -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-600"
												onClick={() => {
													setClearRole('');
													setValue('role', 'user');
												}}
											/>
										)}
									</div>
								</div>
								<Button type="submit" className="w-full">
									{action === 'Add' ? 'Crear Usuario' : 'Guardar Cambios'}
								</Button>
							</form>
						</div>
					</div>
				</CardContent>
			</DialogContent>
		</Dialog>
	);
};

export default UserModal;
