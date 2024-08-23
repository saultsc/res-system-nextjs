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
} from '@/components';
import ProductModal from './ProductModal';
import { PrismaClient } from '@prisma/client';
import { getPaginatedCategories } from '@/app/dashboard/categories/action/get-paginated.action';
import DeleteProduct from './DeleteProduct';
import { getPaginatedProducts } from '../actions/get-paginated';

interface Product {
	id: number;
	nombre: string;
	cantidad: number;
	descripcion?: string;
	categoriaId: number;
	precio: number; // Agregar el campo precio aquí
}

interface QueryParams {
	query: string;
	category: string;
	currentPage: number;
}

const prisma = new PrismaClient();

export const ProductsTable = async ({ currentPage, query, category }: QueryParams) => {
	const { products, totalPages } = await getPaginatedProducts(query, category, currentPage);
	const { categories } = await getPaginatedCategories('');

	return (
		<div>
			<Card>
				<CardHeader className="bg-black/90 rounded-t-md text-white">
					<CardTitle>Productos</CardTitle>
				</CardHeader>
				<CardContent>
					<div className={'h-[560px] overflow-y-auto flex justify-center'}>
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Codigo</TableHead>
									<TableHead className="text-center">Nombre</TableHead>
									<TableHead className="text-center">Cantidad</TableHead>
									<TableHead className="text-center">Descripción</TableHead>
									<TableHead className="text-center">Categoría</TableHead>
									<TableHead className="text-center">Precio</TableHead>{' '}
									{/* Nueva columna */}
									<TableHead className="text-center">Acciones</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{products.map(async (product: any) => (
									<TableRow key={product.id}>
										<TableCell>{product.id}</TableCell>
										<TableCell className="text-center">
											{product.nombre}
										</TableCell>
										<TableCell className="text-center">
											{product.cantidad}
										</TableCell>
										<TableCell className="text-center">
											{product.descripcion}
										</TableCell>
										<TableCell className="text-center">
											{product.categoria.nombre}
										</TableCell>
										<TableCell className="text-center">
											{product.precio} {/* Mostrar el precio */}
										</TableCell>
										<TableCell className="flex gap-x-2 justify-center">
											<ProductModal
												product={product}
												action="Edit"
												categories={categories}
											/>
											<DeleteProduct productId={product.id} />
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
