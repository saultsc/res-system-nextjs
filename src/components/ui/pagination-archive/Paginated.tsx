'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from '@/components';

interface Props {
	totalPages: number;
}

export const Paginated = ({ totalPages }: Props) => {
	const searchParams = useSearchParams();
	const currentPage = Number(searchParams.get('page')) || 1;
	const pathname = usePathname();

	const createPageUrl = (page: number) => {
		const params = new URLSearchParams(searchParams.toString());
		params.set('page', page.toString());
		return `${pathname}?${params.toString()}`;
	};

	const renderPaginationItems = () => {
		const items = [];

		// Always show the first page
		items.push(
			<PaginationItem key={1}>
				<PaginationLink href={createPageUrl(1)} isActive={1 === currentPage}>
					1
				</PaginationLink>
			</PaginationItem>
		);

		// Ellipsis if necessary
		if (currentPage > 4) {
			items.push(
				<PaginationItem key="start-ellipsis">
					<PaginationEllipsis />
				</PaginationItem>
			);
		}

		// Pages around the current page, maximum of 3 pages in the middle
		for (
			let i = Math.max(2, currentPage - 1);
			i <= Math.min(totalPages - 1, currentPage + 1);
			i++
		) {
			items.push(
				<PaginationItem key={i}>
					<PaginationLink href={createPageUrl(i)} isActive={i === currentPage}>
						{i}
					</PaginationLink>
				</PaginationItem>
			);
		}

		// Ellipsis if necessary
		if (currentPage < totalPages - 3) {
			items.push(
				<PaginationItem key="end-ellipsis">
					<PaginationEllipsis />
				</PaginationItem>
			);
		}

		// Always show the last page
		if (totalPages > 1) {
			items.push(
				<PaginationItem key={totalPages}>
					<PaginationLink
						href={createPageUrl(totalPages)}
						isActive={totalPages === currentPage}
					>
						{totalPages}
					</PaginationLink>
				</PaginationItem>
			);
		}

		return items;
	};

	const handleDisabledClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
		e.preventDefault();
	};

	return (
		<div>
			<Pagination className="mt-4">
				<PaginationContent>
					<PaginationItem>
						<PaginationPrevious
							href={currentPage > 1 ? createPageUrl(currentPage - 1) : '#'}
							onClick={currentPage === 1 ? handleDisabledClick : undefined}
						/>
					</PaginationItem>
					{renderPaginationItems()}
					<PaginationItem>
						<PaginationNext
							href={currentPage < totalPages ? createPageUrl(currentPage + 1) : '#'}
							onClick={currentPage === totalPages ? handleDisabledClick : undefined}
						/>
					</PaginationItem>
				</PaginationContent>
			</Pagination>
		</div>
	);
};
