'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useProductStore } from '@/store/useProductStore';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { updatePedido } from '../../categories/action/action.server';

type OrderSummaryProps = {
	products: any[];
	salas: { id: number; nombre: string }[];
	mesas: { id: number; nombre: string; salaId: number }[];
	pedido?: any;
};

export default function EditSummary({ products, salas, mesas, pedido }: OrderSummaryProps) {
	const router = useRouter();
	const productSelections = useProductStore((state) => state.productSelections);
	const [selectedSala, setSelectedSala] = useState<number | null>(null);
	const [selectedMesa, setSelectedMesa] = useState<number | null>(null);

	const selectedProducts = useMemo(() => {
		return products.filter((product) => productSelections[product.id]?.selected);
	}, [productSelections, products]);

	const totalAmount = useMemo(() => {
		return selectedProducts.reduce((total, product) => {
			return total + product.precio * productSelections[product.id].quantity;
		}, 0);
	}, [selectedProducts, productSelections]);

	useEffect(() => {
		if (pedido) {
			// Inicializar el estado con los productos del pedido
			const initialSelections = pedido.productos.reduce((acc: any, producto: any) => {
				acc[producto.productoId] = { selected: true, quantity: producto.cantidad };
				return acc;
			}, {});
			useProductStore.getState().setProductSelections(initialSelections);
			setSelectedSala(pedido.salaId);
			setSelectedMesa(pedido.mesaId);
		}
	}, [pedido]);

	const handleConfirmOrder = async () => {
		if (selectedSala === null || selectedMesa === null) {
			toast.error('Por favor selecciona una sala y una mesa.');
			return;
		}

		const pedidoData = {
			cantidadProductos: selectedProducts.length,
			estado: 'Pendiente',
			monto: totalAmount,
			salaId: selectedSala,
			mesaId: selectedMesa,
			productos: selectedProducts.map((product) => ({
				productoId: product.id,
				cantidad: productSelections[product.id].quantity,
			})),
		};

		try {
			await updatePedido(pedido.id, pedidoData);
			toast.success('Pedido pendiente');
			router.push('/dashboard/orders');
		} catch (error) {
			toast.error('Error al confirmar el pedido');
			console.error('Error al confirmar el pedido:', error);
		}
	};

	const filteredMesas = useMemo(() => {
		return mesas?.filter((mesa) => mesa.salaId === selectedSala) || [];
	}, [mesas, selectedSala]);

	return (
		<>
			<Card className="w-full lg:w-1/3 flex flex-col justify-between h-full">
				<div>
					<CardHeader>
						<CardTitle>Resumen del Pedido</CardTitle>
					</CardHeader>
					<CardContent>
						<ul className="space-y-2">
							{selectedProducts.length > 0 ? (
								selectedProducts.map((product) => (
									<li
										key={product.id}
										className="flex justify-between items-center"
									>
										<span>
											{product.nombre} x
											{productSelections[product.id].quantity}
										</span>
										<span>
											$
											{(
												product.precio *
												productSelections[product.id].quantity
											).toFixed(2)}
										</span>
									</li>
								))
							) : (
								<li>No hay productos seleccionados.</li>
							)}
						</ul>
					</CardContent>
				</div>
				<CardFooter className="flex flex-col space-y-4">
					{pedido.estado !== 'Pagado' && (
						<Button className="w-full" onClick={handleConfirmOrder}>
							Confirmar Pedido
						</Button>
					)}
					<div className="w-full">
						<label htmlFor="sala" className="block mb-2">
							Selecciona una sala:
						</label>
						<div className="space-y-2">
							<label>Sala</label>
							<div className="relative">
								<select
									value={selectedSala ?? ''}
									onChange={(e) => setSelectedSala(Number(e.target.value))}
									className="border border-gray-300 rounded-md p-2 w-full"
									disabled
								>
									<option value="" disabled>
										Selecciona una sala
									</option>
									{salas.map((sala) => (
										<option value={sala.id}>{sala.nombre}</option>
									))}
								</select>
							</div>
						</div>
						<div className="space-y-2 mt-6">
							<label>Mesa</label>
							<div className="relative">
								<select
									value={selectedMesa ?? ''}
									onChange={(e) => setSelectedMesa(Number(e.target.value))}
									className="border border-gray-300 rounded-md p-2 w-full"
									disabled
								>
									<option value="" disabled>
										Selecciona una mesa
									</option>
									{mesas
										.filter((mesa) => mesa.salaId === selectedSala)
										.map((mesa) => (
											<option value={mesa.id}>{mesa.nombre}</option>
										))}
								</select>
							</div>
						</div>
					</div>
					<div className="flex justify-between items-center">
						<span className="font-bold">Total:</span>
						<span className="font-bold">${totalAmount.toFixed(2)}</span>
					</div>
				</CardFooter>
			</Card>
		</>
	);
}
