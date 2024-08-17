'use client';

import { usePathname, useSearchParams } from 'next/navigation';

import {
	Pagination,
	PaginationContent,
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
		for (let i = 1; i <= totalPages; i++) {
			items.push(
				<PaginationItem key={i}>
					<PaginationLink href={createPageUrl(i)} isActive={i === currentPage}>
						{i}
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
							href={createPageUrl(currentPage - 1)}
							className={currentPage === 1 ? 'disabled' : ''}
							onClick={currentPage === 1 ? handleDisabledClick : undefined}
						/>
					</PaginationItem>
					{renderPaginationItems()}
					<PaginationItem>
						<PaginationNext
							href={createPageUrl(currentPage + 1)}
							className={currentPage === totalPages ? 'disabled' : ''}
							onClick={currentPage === totalPages ? handleDisabledClick : undefined}
						/>
					</PaginationItem>
				</PaginationContent>
			</Pagination>
		</div>
	);
};
