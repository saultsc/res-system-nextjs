'use server';

import {
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
import { getPaginatedCustomers } from '../actions/get-paginated.action';
import CustomerModal from './CustomerModal';
import { DeleteCostumer } from '@/app/dashboard/customers/components/DeleteCustomer';

interface QueryParams {
	query: string;
	currentPage: number;
}

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
									<TableHead className="text-center">Tipo Cliente</TableHead>
									<TableHead className="text-center">Documento</TableHead>
									<TableHead className="text-center">Nombre</TableHead>
									<TableHead className="text-center">Correo</TableHead>
									<TableHead className="text-center">Acciones</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{customers.map((cliente: any) => (
									<TableRow key={cliente.id}>
										<TableCell>{cliente.id}</TableCell>
										<TableCell className="text-center">
											{cliente.tipoCliente}
										</TableCell>
										<TableCell className="text-center">
											{cliente.documento}
										</TableCell>
										<TableCell className="text-center">
											{cliente.nombre || '-'}
										</TableCell>
										<TableCell className="text-center">
											{cliente.email || '-'}
										</TableCell>
										<TableCell className="flex gap-x-2 justify-center">
											<CustomerModal customer={cliente} action="Edit" />
											<DeleteCostumer id={cliente.id} />
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

export default CustomersTable;
