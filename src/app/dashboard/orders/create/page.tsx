import OrderSummary from '../components/OrderSummary';
import ProductList from '../components/ProductList';
import { getPaginatedProducts } from '../../products/actions/get-paginated';
import { getSalasMesas } from '../actions/get-mesa-sala';
import { getPaginatedRooms } from '../../rooms/actions/get-pagiated.action';
import Link from 'next/link';
import { FaArrowLeft, FaEdit } from 'react-icons/fa'; // Asegúrate de tener un componente Button
import { Button } from '@/components';

export default async function CreateOrderPage() {
	const { products } = await getPaginatedProducts('', '');
	const salasMesas = await getSalasMesas();
	const { rooms } = await getPaginatedRooms('');

	const mesas = salasMesas.map((sm) => ({
		...sm.mesa,
		salaId: sm.salaId,
	}));

	return (
		<div className="container mx-auto p-4">
			<h1 className="text-2xl font-bold mb-6">Página de Pedidos</h1>
			<div className="flex flex-col lg:flex-row gap-6">
				<OrderSummary products={products} salas={rooms} mesas={mesas} />
				<ProductList products={products} />
			</div>
			<div className="flex justify-center w-full lg:w-auto mt-6">
				<Link href="/dashboard/orders">
					<Button
						variant={'secondary'}
						className="inline-flex items-center text-blue-500 hover:text-blue-700 mb-4 text-lg py-3 px-6"
					>
						<FaArrowLeft className="mr-2" />
						<span>Volver a Pedidos</span>
					</Button>
				</Link>
			</div>
		</div>
	);
}
