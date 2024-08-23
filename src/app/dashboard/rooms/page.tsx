import { Suspense } from 'react';
import { Search } from '@/components';
import { CreateRoom } from './components/CreateRoom';
import { RoomsTable } from './components/RoomsTable';
import { RoomsTableSkeleton } from '@/components/ui/skeletons/SkeletonRoomsTable';

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
				<CreateRoom />
			</div>

			<div>
				<Suspense key={query + currentPage} fallback={<RoomsTableSkeleton />}>
					<RoomsTable currentPage={currentPage} query={query} />
				</Suspense>
			</div>
		</div>
	);
}
