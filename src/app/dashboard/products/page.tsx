import { Suspense } from 'react';
import { Search, SkeletonCustomersTable } from '@/components';
import { CreateProduct } from './components/CreateProduct';
import { ProductsTable } from './components/ProductsTable';

export default async function ProductsPage({
	searchParams,
}: {
	searchParams: {
		query?: string;
		page?: string;
		category?: string;
	};
}) {
	const query = searchParams?.query || '';
	const currentPage = Number(searchParams?.page) || 1;
	const category = searchParams?.category || '';

	return (
		<div className="p-4 mt-6">
			<div className="flex items-center justify-between space-x-4 mb-4">
				<Search placeholder="Buscar productos..." />
				<CreateProduct />
			</div>

			<div>
				<Suspense
					key={query + currentPage + category}
					fallback={<SkeletonCustomersTable />}
				>
					<ProductsTable currentPage={currentPage} query={query} category={category} />
				</Suspense>
			</div>
		</div>
	);
}
