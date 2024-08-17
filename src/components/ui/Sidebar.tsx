'use client';

import { useState } from 'react';

import Link from 'next/link';
import { Button, Separator, Sheet, SheetClose, SheetContent, SheetTrigger } from '..';
import clsx from 'clsx';
import { BiCategory } from 'react-icons/bi';
import { BsHouseAdd } from 'react-icons/bs';
import {
	IoChevronDownOutline,
	IoPersonOutline,
	IoPeopleOutline,
	IoLogOutOutline,
} from 'react-icons/io5';
import { MdOutlineDepartureBoard, MdTableBar } from 'react-icons/md';

export const Sidebar = () => {
	const [isMantenimientosOpen, setIsMantenimientosOpen] = useState(false);

	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant="ghost" size="icon" className="text-white">
					<MenuIcon className="size-6" />
				</Button>
			</SheetTrigger>

			<SheetContent side="right" className="w-[400px] bg-background p-6">
				<div className="fixed p-5 right-0 top-0 w-[400px] h-screen bg-white z-20 shadow-2xl transform transition-all duration-200 overflow-y-auto flex flex-col">
					<SheetClose className="absolute top-4 right-4 rounded-md p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus:outline-none focus:ring-2 focus:ring-muted">
						<XIcon className="h-6 w-6" />
					</SheetClose>

					<h1 className="text-lg font-medium mt-10">Menu</h1>

					<div className="mt-10 space-y-4">
						<Link
							href="#"
							className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
							prefetch={false}
						>
							<HomeIcon className="h-5 w-5" />
							Inicio
						</Link>
						<Link
							href="#"
							className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
							prefetch={false}
						>
							<BriefcaseIcon className="h-5 w-5" />
							Servicios
						</Link>
						<Link
							href="#"
							className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
							prefetch={false}
						>
							<UserIcon className="h-5 w-5" />
							Acerca de
						</Link>
						<Link
							href="#"
							className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
							prefetch={false}
						>
							<MailIcon className="h-5 w-5" />
							Contacto
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
									href={'/categorias'}
									className="flex items-center p-2 hover:bg-gray-200 rounded transition-all"
								>
									<BiCategory size={20} />
									<span className="ml-3 text-xl">Categorias</span>
								</Link>
								<Link
									href={'/departamentos'}
									className="flex items-center p-2 hover:bg-gray-200 rounded transition-all"
								>
									<MdOutlineDepartureBoard size={20} />
									<span className="ml-3 text-xl">Departamentos</span>
								</Link>
								<Link
									href={'/clientes'}
									className="flex items-center p-2 hover:bg-gray-200 rounded transition-all"
								>
									<IoPersonOutline size={20} />
									<span className="ml-3 text-xl">Clientes</span>
								</Link>
								<Link
									href={'/mesas'}
									className="flex items-center p-2 hover:bg-gray-200 rounded transition-all"
								>
									<MdTableBar size={20} />
									<span className="ml-3 text-xl">Mesas</span>
								</Link>
								<Link
									href={'/salas'}
									className="flex items-center p-2 hover:bg-gray-200 rounded transition-all"
								>
									<BsHouseAdd size={20} />
									<span className="ml-3 text-xl">Salas</span>
								</Link>

								<Link
									href={'/users'}
									className="flex items-center p-2 hover:bg-gray-200 rounded transition-all"
								>
									<IoPeopleOutline size={20} />
									<span className="ml-3 text-xl">Usuarios</span>
								</Link>
							</div>
						</div>
					</div>
					<div className="mt-auto">
						<button className="flex flex-row w-full h-12 items-center justify-center text-white bg-red-500 hover:bg-red-700 rounded-xl">
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

function BriefcaseIcon(props: any) {
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
			<path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
			<rect width="20" height="14" x="2" y="6" rx="2" />
		</svg>
	);
}

function HomeIcon(props: any) {
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
			<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
			<polyline points="9 22 9 12 15 12 15 22" />
		</svg>
	);
}

function LogOutIcon(props: any) {
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
			<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
			<polyline points="16 17 21 12 16 7" />
			<line x1="21" x2="9" y1="12" y2="12" />
		</svg>
	);
}

function MailIcon(props: any) {
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
			<rect width="20" height="16" x="2" y="4" rx="2" />
			<path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
		</svg>
	);
}

function PenToolIcon(props: any) {
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
			<path d="M15.707 21.293a1 1 0 0 1-1.414 0l-1.586-1.586a1 1 0 0 1 0-1.414l5.586-5.586a1 1 0 0 1 1.414 0l1.586 1.586a1 1 0 0 1 0 1.414z" />
			<path d="m18 13-1.375-6.874a1 1 0 0 0-.746-.776L3.235 2.028a1 1 0 0 0-1.207 1.207L5.35 15.879a1 1 0 0 0 .776.746L13 18" />
			<path d="m2.3 2.3 7.286 7.286" />
			<circle cx="11" cy="11" r="2" />
		</svg>
	);
}

function UserIcon(props: any) {
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
			<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
			<circle cx="12" cy="7" r="4" />
		</svg>
	);
}
