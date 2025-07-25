import { Suspense } from 'react';

import { Search, SkeletonCustomersTable } from '@/components';
import CreateCustomers from './components/CreateCustomers';
import { CustomersTable } from './components/CustomersTable';

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
				<Search placeholder="Buscar clientes..." />
				<CreateCustomers />
			</div>

			<div>
				<Suspense key={query + currentPage} fallback={<SkeletonCustomersTable />}>
					<CustomersTable currentPage={currentPage} query={query} />
				</Suspense>
			</div>
		</div>
	);
}
