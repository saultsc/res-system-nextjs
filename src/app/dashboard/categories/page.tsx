import { Search, SkeletonCategoriesTable } from '@/components';
import { Suspense } from 'react';
import { CreateCategory } from './components/CreateCategory';
import { CategoriesTable } from './components/CategoriesTable';

export default async function CustomersPage({
	searchParams,
}: {
	searchParams: {
		query?: string;
		page?: string;
	};
}) {
	const query = searchParams?.query || '';
	const currentPage = Number(searchParams?.page) || 1;

	return (
		<div className="p-4 mt-6">
			<div className="flex items-center justify-between space-x-4 mb-4">
				<Search placeholder="Buscar categorias..." />
				<CreateCategory />
			</div>

			<div>
				<Suspense key={query + currentPage} fallback={<SkeletonCategoriesTable />}>
					<CategoriesTable currentPage={currentPage} query={query} />
				</Suspense>
			</div>
		</div>
	);
}
