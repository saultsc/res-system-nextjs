'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

import { Input } from '@/components';

interface Props {
	placeholder: string;
}

export const Search = ({ placeholder }: Props) => {
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const { replace } = useRouter();

	const handleSearch = useDebouncedCallback((term) => {
		console.log(`Searching... ${term}`);

		const params = new URLSearchParams(searchParams);
		if (term) {
			params.set('query', term);
		} else {
			params.delete('query');
		}

		params.set('page', '1');

		replace(`${pathname}?${params.toString()}`);
	}, 300);

	return (
		<div>
			<div className="flex space-x-4">
				<Input
					onChange={(e) => handleSearch(e.target.value)}
					type="search"
					placeholder={placeholder}
					defaultValue={searchParams.get('query')?.toString()}
				/>
			</div>
		</div>
	);
};
