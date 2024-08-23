'use client';

import { useMemo, useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useProductStore } from '@/store/useProductStore';
import { Search } from 'lucide-react';

type Product = {
	id: number;
	nombre: string;
	descripcion: string;
	cantidad: number;
	precio: number;
	categoriaId: number;
	categoria: { id: number; nombre: string };
};

type ProductListProps = {
	products: Product[];
	pedido?: any;
};

export default function ProductList({ products, pedido }: ProductListProps) {
	const { productSelections, updateProductSelection, updateProductQuantity } = useProductStore();
	const [searchTerm, setSearchTerm] = useState('');

	useEffect(() => {
		const initialSelections = products.reduce((acc, product) => {
			acc[product.id] = { selected: false, quantity: 1 };
			return acc;
		}, {} as any);

		if (pedido) {
			pedido.productos.forEach((producto: any) => {
				initialSelections[producto.productoId] = {
					selected: true,
					quantity: producto.cantidad,
				};
			});
		}

		useProductStore.getState().setProductSelections(initialSelections);
	}, [products, pedido]);

	const handleProductSelect = (productId: number) => {
		updateProductSelection(productId, !productSelections[productId].selected);
	};

	const handleQuantityChange = (productId: number, quantity: number) => {
		updateProductQuantity(productId, Math.max(1, quantity));
	};

	const filteredProducts = useMemo(() => {
		return products.filter(
			(product) =>
				product.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
				product.descripcion?.toLowerCase().includes(searchTerm.toLowerCase())
		);
	}, [searchTerm, products]);

	return (
		<Card className="w-full lg:w-2/3">
			<CardHeader>
				<CardTitle>Lista de Productos</CardTitle>
				<div className="relative">
					<Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
					<Input
						type="text"
						placeholder="Buscar productos..."
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						className="pl-8"
					/>
				</div>
			</CardHeader>
			<CardContent>
				<div className="max-h-[600px] overflow-y-auto pr-2">
					<ul className="space-y-4">
						{filteredProducts.map((product) => (
							<li key={product.id}>
								<div className="flex items-center justify-between">
									<div className="flex items-center space-x-3">
										<Checkbox
											id={`product-${product.id}`}
											checked={
												productSelections[product.id]?.selected || false
											}
											onCheckedChange={() => handleProductSelect(product.id)}
										/>
										<Label
											htmlFor={`product-${product.id}`}
											className="font-medium"
										>
											{product.nombre}
										</Label>
									</div>
									<div className="flex items-center space-x-2">
										<span className="text-sm font-semibold">
											${product.precio.toFixed(2)}
										</span>
										<Input
											type="number"
											min="1"
											value={productSelections[product.id]?.quantity || 1}
											onChange={(e) =>
												handleQuantityChange(
													product.id,
													parseInt(e.target.value) || 1
												)
											}
											className="w-20 text-right"
											aria-label={`Cantidad de ${product.nombre}`}
										/>
									</div>
								</div>
								<p className="text-sm text-muted-foreground ml-8">
									{product.descripcion}
								</p>
							</li>
						))}
					</ul>
				</div>
			</CardContent>
		</Card>
	);
}
