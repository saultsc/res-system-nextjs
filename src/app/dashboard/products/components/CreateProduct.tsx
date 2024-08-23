import { getPaginatedCategories } from '@/app/dashboard/categories/action/get-paginated.action';
import ProductModal from './ProductModal';

export const CreateProduct = async () => {
	const { categories } = await getPaginatedCategories('');

	return (
		<div>
			<ProductModal action="Add" categories={categories} />
		</div>
	);
};
