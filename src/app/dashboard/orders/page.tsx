import { Suspense } from 'react';
import { Search } from '@/components';
import { SkeletonCustomersTable } from '../../../components/ui/skeletons/SkeletonCustomersTable';
import { OrdersTable } from './components/OrdersTable';
import AddOrderButton from './components/CreateOrder';

export default async function OrdersPage({
	searchParams,
}: {
	searchParams: {
		query?: string;
		page?: string;
		status?: string;
	};
}) {
	const query = searchParams?.query || '';
	const currentPage = Number(searchParams?.page) || 1;
	const status = searchParams?.status || '';

	return (
		<div className="p-4 mt-6">
			<div className="flex items-center justify-between space-x-4 mb-4">
				<Search placeholder="Buscar órdenes..." />
				<AddOrderButton />
			</div>

			<div>
				<Suspense key={query + currentPage + status} fallback={<SkeletonCustomersTable />}>
					<OrdersTable currentPage={currentPage} query={query} status={status} />
				</Suspense>
			</div>
		</div>
	);
}
