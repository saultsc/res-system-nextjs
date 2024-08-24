import { getPaginatedProducts } from '@/app/dashboard/products/actions/get-paginated';
import PaySummary from '../../components/PayCard';
import { getSalasMesas } from '../../actions/get-mesa-sala';
import { getPedidoById } from '@/app/dashboard/categories/action/action.server';
import Link from 'next/link';
import { FaArrowLeft, FaEdit } from 'react-icons/fa'; // Asegúrate de tener un componente Button
import { Button } from '@/components';

interface Props {
	params: {
		id: string;
	};
}

export default async function PayOrdersPage({ params }: Props) {
	const { products } = await getPaginatedProducts('', '');
	const salasMesas = await getSalasMesas();
	const pedido = params.id ? await getPedidoById(Number(params.id)) : null; // Obtener el pedido si existe

	const salas = salasMesas.map((sm) => sm.sala);
	const mesas = salasMesas.map((sm) => ({
		...sm.mesa,
		salaId: sm.salaId,
	}));

	return (
		<div className="flex flex-col items-center justify-center min-h-[800px]">
			<PaySummary mesas={mesas} salas={salas} products={products} pedido={pedido} />
			<div className="flex justify-between mt-4 w-full max-w-3xl">
				<Link href="/dashboard/orders">
					<Button
						variant={'secondary'}
						className="inline-flex items-center text-blue-500 hover:text-blue-700 mb-4 text-xl py-3 px-6"
					>
						<FaArrowLeft className="mr-2" />
						<span>Volver a Pedidos</span>
					</Button>
				</Link>
				<Link href={`/dashboard/orders/${params.id}`}>
					<Button
						variant={'secondary'}
						className="inline-flex items-center text-blue-500 hover:text-blue-700 mb-4 text-xl py-3 px-6"
					>
						<FaEdit className="mr-2" />
						<span>Editar Pedido</span>
					</Button>
				</Link>
			</div>
		</div>
	);
}
