'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useProductStore } from '@/store/useProductStore';
import { createPedido } from '@/app/dashboard/orders/actions/create.action';
import { IoCloseCircle } from 'react-icons/io5';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type OrderSummaryProps = {
	products: any[];
	salas: { id: number; nombre: string }[];
	mesas: { id: number; nombre: string; salaId: number }[];
};

export default function OrderSummary({ products, salas, mesas }: OrderSummaryProps) {
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

	const handleConfirmOrder = async () => {
		if (selectedSala === null || selectedMesa === null) {
			toast.error('Por favor selecciona una sala y una mesa.');
			return;
		}

		const pedidoData = {
			cantidadProductos: selectedProducts.length,
			estado: 'pendiente',
			monto: totalAmount,
			salaId: selectedSala,
			mesaId: selectedMesa,
			productos: selectedProducts.map((product) => ({
				productoId: product.id,
				cantidad: productSelections[product.id].quantity,
			})),
		};

		try {
			await createPedido(pedidoData);
			toast.success('Pedido confirmado');
			router.push('/dashboard/orders'); // Reemplaza con la ruta correcta
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
					<Button className="w-full" onClick={handleConfirmOrder}>
						Confirmar Pedido
					</Button>
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
								>
									<option value="" disabled>
										Selecciona una sala
									</option>
									{salas.map((sala) => (
										<option key={sala.id} value={sala.id}>
											{sala.nombre}
										</option>
									))}
								</select>
								{selectedSala !== null && (
									<IoCloseCircle
										size={25}
										className="absolute right-6 top-5 transform -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-600"
										onClick={() => setSelectedSala(null)}
									/>
								)}
							</div>
						</div>
						<div className="space-y-2 mt-6">
							<label>Mesa</label>
							<div className="relative">
								<select
									value={selectedMesa ?? ''}
									onChange={(e) => setSelectedMesa(Number(e.target.value))}
									className="border border-gray-300 rounded-md p-2 w-full"
								>
									<option value="" disabled>
										Selecciona una mesa
									</option>
									{mesas
										.filter((mesa) => mesa.salaId === selectedSala)
										.map((mesa) => (
											<option key={mesa.id} value={mesa.id}>
												{mesa.nombre}
											</option>
										))}
								</select>
								{selectedMesa !== null && (
									<IoCloseCircle
										size={25}
										className="absolute right-6 top-5 transform -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-600"
										onClick={() => setSelectedMesa(null)}
									/>
								)}
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
