import TableModal from './TableModal';
import {
	Card,
	CardHeader,
	CardTitle,
	CardContent,
	Table,
	TableHeader,
	TableRow,
	TableHead,
	TableBody,
	TableCell,
	Paginated,
} from '@/components';
import { getPaginatedTables } from '../actions/get.action';
import { DeleteTable } from './DeleteTable';

interface QueryParams {
	currentPage: number;
	query: string;
}

export const TablesTable = async ({ currentPage, query }: QueryParams) => {
	const { tables, totalPages } = await getPaginatedTables(query, currentPage);

	return (
		<div>
			<Card>
				<CardHeader className="bg-black/90 rounded-t-md text-white">
					<CardTitle>Mesas</CardTitle>
				</CardHeader>
				<CardContent>
					<div className={'h-[560px] overflow-y-auto flex justify-center'}>
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Codigo</TableHead>
									<TableHead className="text-center">Nombre</TableHead>
									<TableHead className="text-center">Descripción</TableHead>
									<TableHead className="text-center">Capacidad</TableHead>
									<TableHead className="text-center">Acciones</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{tables.map((table: any) => (
									<TableRow key={table.id}>
										<TableCell>{table.id}</TableCell>
										<TableCell className="text-center">
											{table.nombre}
										</TableCell>
										<TableCell className="text-center">
											{table.descripcion}
										</TableCell>
										<TableCell className="text-center">
											{table.capacidad}
										</TableCell>
										<TableCell className="flex gap-x-2 justify-center">
											<TableModal table={table} action="Edit" />
											<DeleteTable id={table.id} />
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
