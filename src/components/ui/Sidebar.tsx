'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
	Button,
	Separator,
	Sheet,
	SheetClose,
	SheetContent,
	SheetTrigger,
	SheetHeader,
	SheetTitle,
	DialogDescription,
} from '..';
import clsx from 'clsx';
import { BiCategory } from 'react-icons/bi';
import { BsHouseAdd } from 'react-icons/bs';
import {
	IoChevronDownOutline,
	IoPersonOutline,
	IoPeopleOutline,
	IoLogOutOutline,
	IoFastFoodOutline,
	IoTicketOutline,
} from 'react-icons/io5';
import { MdTableBar } from 'react-icons/md';
import { useUserStore } from '@/store';

export const Sidebar = () => {
	const [isMantenimientosOpen, setIsMantenimientosOpen] = useState(false);
	const [isSheetOpen, setIsSheetOpen] = useState(false);
	const logout = useUserStore((state) => state.logout);

	const closeSheet = () => {
		setIsSheetOpen(false);
	};

	return (
		<Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
			<SheetTrigger asChild>
				<Button variant="ghost" size="icon" className="text-white">
					<MenuIcon className="size-6" />
				</Button>
			</SheetTrigger>

			<SheetContent>
				<div className="fixed p-5 right-0 top-0 w-[400px] h-screen bg-white z-20 shadow-2xl transform transition-all duration-200 overflow-y-auto flex flex-col">
					<SheetHeader>
						<SheetTitle>Menu</SheetTitle>
						<DialogDescription></DialogDescription> {/* Añade esto */}
					</SheetHeader>

					<SheetClose className="absolute top-4 right-4 rounded-md p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus:outline-none focus:ring-2 focus:ring-muted">
						<XIcon className="h-6 w-6" />
					</SheetClose>

					<div className="space-y-4">
						<Link
							href={'/dashboard/orders'}
							className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
							prefetch={false}
							onClick={closeSheet}
						>
							<IoTicketOutline size={20} />
							<span className="ml-3 text-xl">Pedidos</span>
						</Link>
						<Link
							href={'/dashboard/products'}
							className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
							prefetch={false}
							onClick={closeSheet}
						>
							<IoFastFoodOutline size={20} />
							<span className="ml-3 text-xl">Productos</span>
						</Link>
					</div>

					{/* Mantenimientos */}

					<Separator className="my-10" />

					<div className="mt-2 space-y-2 mb-10">
						<div
							className="flex items-center justify-between cursor-pointer bg-gray-200 text-gray-700 p-3 rounded-lg"
							onClick={() => setIsMantenimientosOpen(!isMantenimientosOpen)}
						>
							<h2 className="text-lg font-semibold transition-all">Mantenimientos</h2>
							<div
								className={clsx('transition-transform duration-300 ease-in-out', {
									'rotate-180': isMantenimientosOpen,
									'rotate-0': !isMantenimientosOpen,
								})}
							>
								<IoChevronDownOutline size={20} />
							</div>
						</div>
						<div
							className={clsx(
								'overflow-hidden transition-max-height duration-300 ease-in-out',
								{
									'max-h-0': !isMantenimientosOpen,
									'max-h-screen': isMantenimientosOpen,
								}
							)}
						>
							<div className="space-y-2 bg-gray-100 p-2 rounded-lg">
								<Link
									href={'/dashboard/categories'}
									className="flex items-center p-2 hover:bg-gray-200 rounded transition-all"
									prefetch={false}
									onClick={closeSheet}
								>
									<BiCategory size={20} />
									<span className="ml-3 text-xl">Categorias</span>
								</Link>
								{/* <Link
									href={'/dashboard/departaments'}
									className="flex items-center p-2 hover:bg-gray-200 rounded transition-all"
									prefetch={false}
									onClick={closeSheet}
								>
									<MdOutlineDepartureBoard size={20} />
									<span className="ml-3 text-xl">Departamentos</span>
								</Link> */}
								<Link
									href={'/dashboard/customers'}
									className="flex items-center p-2 hover:bg-gray-200 rounded transition-all"
									prefetch={false}
									onClick={closeSheet}
								>
									<IoPersonOutline size={20} />
									<span className="ml-3 text-xl">Clientes</span>
								</Link>
								<Link
									href={'/dashboard/tables'}
									className="flex items-center p-2 hover:bg-gray-200 rounded transition-all"
									onClick={closeSheet}
								>
									<MdTableBar size={20} />
									<span className="ml-3 text-xl">Mesas</span>
								</Link>
								<Link
									href={'/dashboard/rooms'}
									className="flex items-center p-2 hover:bg-gray-200 rounded transition-all"
									onClick={closeSheet}
								>
									<BsHouseAdd size={20} />
									<span className="ml-3 text-xl">Salas</span>
								</Link>

								<Link
									href={'/dashboard/users'}
									className="flex items-center p-2 hover:bg-gray-200 rounded transition-all"
									onClick={closeSheet}
								>
									<IoPeopleOutline size={20} />
									<span className="ml-3 text-xl">Usuarios</span>
								</Link>
							</div>
						</div>
					</div>
					<div className="mt-auto">
						<button
							onClick={logout}
							className="flex flex-row w-full h-12 items-center justify-center text-white bg-red-500 hover:bg-red-700 rounded-xl"
						>
							<IoLogOutOutline size={20} />
							<span className="ml-3 text-xl">Salir</span>
						</button>
					</div>
				</div>
			</SheetContent>
		</Sheet>
	);
};

function XIcon(props: any) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path d="M18 6 6 18" />
			<path d="m6 6 12 12" />
		</svg>
	);
}

function MenuIcon(props: any) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<line x1="4" x2="20" y1="12" y2="12" />
			<line x1="4" x2="20" y1="6" y2="6" />
			<line x1="4" x2="20" y1="18" y2="18" />
		</svg>
	);
}
