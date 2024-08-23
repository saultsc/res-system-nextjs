import ProductList from '../components/ProductList';
import { getPaginatedProducts } from '../../products/actions/get-paginated';
import { getSalasMesas } from '../actions/get-mesa-sala';
import { getPedidoById } from '../../categories/action/action.server';
import EditSummary from '../components/EditSummary';

export default async function EditOrderPage({ params }: { params: { id: string } }) {
	const { products } = await getPaginatedProducts('', '');
	const salasMesas = await getSalasMesas();
	const pedido = params.id ? await getPedidoById(Number(params.id)) : null; // Obtener el pedido si existe

	const salas = salasMesas.map((sm) => sm.sala);
	const mesas = salasMesas.map((sm) => ({
		...sm.mesa,
		salaId: sm.salaId,
	}));

	return (
		<div className="container mx-auto p-4">
			<h1 className="text-2xl font-bold mb-6">Página de Pedidos</h1>
			<div className="flex flex-col lg:flex-row gap-6">
				<EditSummary products={products} salas={salas} mesas={mesas} pedido={pedido} />
				<ProductList products={products} pedido={pedido} />
			</div>
		</div>
	);
}
