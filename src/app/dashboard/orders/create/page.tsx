import OrderSummary from '../components/OrderSummary';
import ProductList from '../components/ProductList';
import { getPaginatedProducts } from '../../products/actions/get-paginated';
import { getSalasMesas } from '../actions/get-mesa-sala';

export default async function CreateOrderPage() {
	const { products } = await getPaginatedProducts('', '');
	const salasMesas = await getSalasMesas();

	const salas = salasMesas.map((sm) => sm.sala);
	const mesas = salasMesas.map((sm) => ({
		...sm.mesa,
		salaId: sm.salaId,
	}));

	return (
		<div className="container mx-auto p-4">
			<h1 className="text-2xl font-bold mb-6">Página de Pedidos</h1>
			<div className="flex flex-col lg:flex-row gap-6">
				<OrderSummary products={products} salas={salas} mesas={mesas} />
				<ProductList products={products} />
			</div>
		</div>
	);
}
