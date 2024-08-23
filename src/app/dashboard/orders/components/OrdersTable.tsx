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
	Button,
} from '@/components';
import Link from 'next/link';
import { getPaginatedOrders } from '../actions/get-paginated.action';
import { IoEyeOutline, IoCashOutline } from 'react-icons/io5';

interface QueryParams {
	query: string;
	currentPage: number;
	status: string;
}

export const OrdersTable = async ({ currentPage, query, status }: QueryParams) => {
	const { orders, totalPages } = await getPaginatedOrders(query, status, currentPage);

	return (
		<div>
			<Card>
				<CardHeader className="bg-black/90 rounded-t-md text-white">
					<CardTitle>Órdenes</CardTitle>
				</CardHeader>
				<CardContent>
					<div className={'h-[560px] overflow-y-auto flex justify-center'}>
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>ID Pedido</TableHead>
									<TableHead className="text-center">Sala</TableHead>
									<TableHead className="text-center">Mesa</TableHead>
									<TableHead className="text-center">
										Cantidad de Productos
									</TableHead>
									<TableHead className="text-center">Monto</TableHead>
									<TableHead className="text-center">Estado</TableHead>
									<TableHead className="text-center">Acciones</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{orders.map((order) => (
									<TableRow key={order.id}>
										<TableCell>{order.id}</TableCell>
										<TableCell className="text-center">
											{order.salamesa.sala.nombre}
										</TableCell>
										<TableCell className="text-center">
											{order.salamesa.mesa.nombre}
										</TableCell>
										<TableCell className="text-center">
											{order.cantidadProductos}
										</TableCell>
										<TableCell className="text-center">{order.monto}</TableCell>
										<TableCell className="text-center">
											{order.estado}
										</TableCell>
										<TableCell className="flex gap-x-2 justify-center">
											{order.estado !== 'pagado' && (
												<Link href={`orders/${order.id}`}>
													<Button variant="secondary">
														<IoEyeOutline size={20} />
													</Button>
												</Link>
											)}
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
