import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	Paginated,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components';

import CustomerModal from '../../customers/components/CustomerModal';
import { getPaginatedCategories } from '../action/get-paginated.action';
import { DeleteCategory } from './DeleteCategory';
import CategoryModal from './CategoryModal';

interface QueryParams {
	query: string;
	currentPage: number;
}

export const CategoriesTable = async ({ currentPage, query }: QueryParams) => {
	const { categories, totalPages } = await getPaginatedCategories(query, currentPage);

	return (
		<div>
			<Card>
				<CardHeader className="bg-black/90 rounded-t-md text-white">
					<CardTitle>Categorias</CardTitle>
				</CardHeader>
				<CardContent>
					<div className={'h-[560px] overflow-y-auto flex justify-center'}>
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Codigo</TableHead>
									<TableHead className="text-center">Nombre</TableHead>
									<TableHead className="text-center">Acciones</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{categories.map((category: any) => (
									<TableRow key={category.id}>
										<TableCell>{category.id}</TableCell>
										<TableCell className="text-center">
											{category.nombre}
										</TableCell>
										<TableCell className="flex gap-x-2 justify-center">
											<CategoryModal category={category} action="Edit" />
											<DeleteCategory id={category.id} />
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</div>
					<Paginated totalPages={totalPages} />
				</CardContent>
			</Card>
		</div>
	);
};
