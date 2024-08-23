import Header from '@/components/ui/Header';
import { ToastContainer } from 'react-toastify';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
	return (
		<main className="min-h-screen bg-gray-100">
			<Header />

			<div className="px-0 sm:px-10">{children}</div>
			<ToastContainer />
		</main>
	);
}
