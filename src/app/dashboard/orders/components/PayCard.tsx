'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { useProductStore } from '@/store/useProductStore';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { updatePedido } from '../../categories/action/action.server';
import { CreditCard, Trash2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

type PaySummaryProps = {
	products: any[];
	salas: { id: number; nombre: string }[];
	mesas: { id: number; nombre: string; salaId: number }[];
	pedido?: any;
};

export default function PaySummary({ products, salas, mesas, pedido }: PaySummaryProps) {
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

	const handleConfirmPayment = async () => {
		if (selectedProducts.length === 0) {
			toast.error('Por favor agrega productos al pedido para proceder al pago.');
			return;
		}

		if (selectedSala === null || selectedMesa === null) {
			toast.error('Por favor selecciona una sala y una mesa.');
			return;
		}

		const pedidoData = {
			cantidadProductos: selectedProducts.length,
			estado: 'Pagado',
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
			toast.success('Pedido pagado');
			router.push('/dashboard/orders');
		} catch (error) {
			toast.error('Error al confirmar el pago');
			console.error('Error al confirmar el pago:', error);
		}
	};

	const filteredMesas = useMemo(() => {
		return mesas?.filter((mesa) => mesa.salaId === selectedSala) || [];
	}, [mesas, selectedSala]);

	const removeProduct = (productId: number) => {
		const newSelections = { ...productSelections };
		delete newSelections[productId];
		useProductStore.getState().setProductSelections(newSelections);
	};

	return (
		<Card className="w-full max-w-3xl mx-auto">
			<CardHeader>
				<CardTitle>Pago de Pedido</CardTitle>
				<CardDescription>Revisa tu pedido y procede al pago</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="space-y-6">
					<div>
						<h3 className="text-lg font-medium">Detalle del Pedido</h3>
						<div className="mt-3 space-y-4">
							{selectedProducts.map((product) => (
								<div key={product.id} className="flex justify-between items-center">
									<div>
										<p className="font-medium">{product.nombre}</p>
										<p className="text-sm text-muted-foreground">
											Cantidad: {productSelections[product.id].quantity} x $
											{product.precio.toFixed(2)}
										</p>
									</div>
									<div className="flex items-center">
										<p className="font-medium mr-4">
											$
											{(
												productSelections[product.id].quantity *
												product.precio
											).toFixed(2)}
										</p>
										<Button
											variant="ghost"
											size="icon"
											onClick={() => removeProduct(product.id)}
											aria-label={`Eliminar ${product.nombre} del pedido`}
										>
											<Trash2 className="h-4 w-4" />
										</Button>
									</div>
								</div>
							))}
						</div>
					</div>
					<Separator />
					<div className="flex justify-between items-center">
						<h3 className="text-lg font-medium">Total a Pagar</h3>
						<p className="text-2xl font-bold">${totalAmount.toFixed(2)}</p>
					</div>
					<Separator />
					<div>
						<h3 className="text-lg font-medium mb-4">Información de Pago</h3>
						<form className="space-y-4">
							<div className="grid grid-cols-2 gap-4">
								<div className="space-y-2">
									<Label htmlFor="cardName">Nombre en la Tarjeta</Label>
									<Input id="cardName" placeholder="John Doe" />
								</div>
								<div className="space-y-2">
									<Label htmlFor="cardNumber">Número de Tarjeta</Label>
									<Input id="cardNumber" placeholder="1234 5678 9012 3456" />
								</div>
							</div>
							<div className="grid grid-cols-3 gap-4">
								<div className="space-y-2">
									<Label htmlFor="expiryMonth">Mes de Expiración</Label>
									<Input id="expiryMonth" placeholder="MM" />
								</div>
								<div className="space-y-2">
									<Label htmlFor="expiryYear">Año de Expiración</Label>
									<Input id="expiryYear" placeholder="YYYY" />
								</div>
								<div className="space-y-2">
									<Label htmlFor="cvv">CVV</Label>
									<Input id="cvv" placeholder="123" />
								</div>
							</div>
						</form>
					</div>
				</div>
			</CardContent>
			<CardFooter>
				<Button
					className="w-full bg-green-500 hover:bg-green-700"
					onClick={handleConfirmPayment}
				>
					<CreditCard className="mr-2 h-4 w-4 " /> Pagar ${totalAmount.toFixed(2)}
				</Button>
			</CardFooter>
		</Card>
	);
}
