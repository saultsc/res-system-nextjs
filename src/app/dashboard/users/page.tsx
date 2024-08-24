import { Suspense } from 'react';

import { Search, SkeletonCategoriesTable } from '@/components';
import { UsersTable } from './components/UsersTable';
import { CreateUser } from './components/CreateUser';

export default async function UsersPage({
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
				<Search placeholder="Buscar usuarios..." />
				<CreateUser />
			</div>

			<div>
				<Suspense key={query + currentPage} fallback={<SkeletonCategoriesTable />}>
					<UsersTable currentPage={currentPage} query={query} />
				</Suspense>
			</div>
		</div>
	);
}
