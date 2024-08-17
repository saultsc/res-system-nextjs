import Link from 'next/link';

import { Sidebar } from '@/components';

const Header = () => {
	return (
		<header className="bg-blue-600 text-white py-4 px-6 flex items-center justify-between">
			<Link href="/dashboard" className="flex items-center gap-2" prefetch={false}>
				<MountainIcon className="h-6 w-6" />
				<span className="text-lg font-semibold">Restaurant | App</span>
			</Link>
			<Sidebar />
		</header>
	);
};

export default Header;

function MenuIcon(props: any) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<line x1="4" x2="20" y1="12" y2="12" />
			<line x1="4" x2="20" y1="6" y2="6" />
			<line x1="4" x2="20" y1="18" y2="18" />
		</svg>
	);
}

function MountainIcon(props: any) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path d="m8 3 4 8 5-5 5 15H2L8 3z" />
		</svg>
	);
}
