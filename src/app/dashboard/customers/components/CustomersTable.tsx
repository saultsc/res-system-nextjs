import {
	Button,
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	Paginated,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components';
import { HiPencil } from 'react-icons/hi';
import { getPaginatedCustomers } from '../actions/get-paginated.action';
import { IoTrashOutline } from 'react-icons/io5';

interface QueryParams {
	query: string;
	currentPage: number;
}

type Customer = {
	id: number;
	tipoCliente: string;
	documento: number;
	rnc: string | null;
	nombre: string | null;
	dirrecion: string | null;
	email: string | null;
	limiteCredito: number;
	telefonno: string | null;
};

export const CustomersTable = async ({ currentPage, query }: QueryParams) => {
	const { customers, totalPages } = await getPaginatedCustomers(query, currentPage);

	return (
		<div>
			<Card>
				<CardHeader className="bg-black/90 rounded-t-md text-white">
					<CardTitle>Clientes</CardTitle>
				</CardHeader>
				<CardContent>
					<div className={'h-[560px] overflow-y-auto flex justify-center'}>
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Codigo</TableHead>
									<TableHead>Tipo Cliente</TableHead>
									<TableHead>Documento</TableHead>
									<TableHead>Nombre</TableHead>
									<TableHead>Correo</TableHead>
									<TableHead>Acciones</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{customers.map((cliente: any) => (
									<TableRow key={cliente.id}>
										<TableCell>{cliente.id}</TableCell>
										<TableCell>{cliente.tipoCliente}</TableCell>
										<TableCell>{cliente.documento}</TableCell>
										<TableCell>{cliente.nombre || '-----'}</TableCell>
										<TableCell>{cliente.email || '-----'}</TableCell>
										<TableCell>
											<Button
												variant="default"
												className="bg-yellow-500 hover:bg-yellow-600 text-white mr-2"
											>
												<FilePenIcon size={16} />
											</Button>
											<Button
												variant="default"
												className="bg-red-500 hover:bg-red-600 text-white"
											>
												<Trash2Icon size={16} />
											</Button>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</div>
					<Paginated totalPages={totalPages} />
				</CardContent>
			</Card>
		</div>
	);
};

function FilePenIcon(props: any) {
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
			<path d="M12 22h6a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v10" />
			<path d="M14 2v4a2 2 0 0 0 2 2h4" />
			<path d="M10.4 12.6a2 2 0 1 1 3 3L8 21l-4 1 1-4Z" />
		</svg>
	);
}

function Trash2Icon(props: any) {
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
			<path d="M3 6h18" />
			<path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
			<path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
			<line x1="10" x2="10" y1="11" y2="17" />
			<line x1="14" x2="14" y1="11" y2="17" />
		</svg>
	);
}

export default CustomersTable;
