import { Suspense } from 'react';
import { Search } from '@/components';
import { CreateTable } from './components/CreateTable';
import { TablesTable } from './components/TablesTable';
import { SkeletonTablesTable } from '@/components/ui/skeletons/SkeletonTablesTable';

export default async function TablePage({
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
				<Search placeholder="Buscar mesas..." />
				<CreateTable />
			</div>

			<div>
				<Suspense key={query + currentPage} fallback={<SkeletonTablesTable />}>
					<TablesTable currentPage={currentPage} query={query} />
				</Suspense>
			</div>
		</div>
	);
}
