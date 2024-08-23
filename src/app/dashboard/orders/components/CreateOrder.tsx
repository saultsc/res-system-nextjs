import Link from 'next/link';
import { IoAddOutline } from 'react-icons/io5';
import clsx from 'clsx';
import { Button } from '@/components';

const AddOrderButton = () => {
	return (
		<Link href={'orders/create'}>
			<Button
				variant="default"
				className={clsx('text-white', 'bg-green-600 hover:bg-green-700 ml-auto')}
			>
				<IoAddOutline size={20} className="mr-2" />
				AGREGAR
			</Button>
		</Link>
	);
};

export default AddOrderButton;
