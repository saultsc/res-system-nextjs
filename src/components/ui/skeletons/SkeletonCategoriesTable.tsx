import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	Skeleton,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components';

export const SkeletonCategoriesTable = () => {
	const skeletonRows = Array.from({ length: 8 }); // Generar 8 filas de esqueleto

	return (
		<div>
			<Card>
				<CardHeader className="bg-black/90 rounded-t-md text-white">
					<CardTitle>Cargando..</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="flex justify-center">
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Codigo</TableHead>
									<TableHead className="text-center">Nombre</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{skeletonRows.map((_, index) => (
									<TableRow key={index}>
										<TableCell>
											<Skeleton className="h-4 w-full" />
										</TableCell>
										<TableCell className="text-center">
											<Skeleton className="h-4 w-full" />
										</TableCell>
										<TableCell className="text-center flex gap-2">
											<Skeleton className="h-8 w-8" />
											<Skeleton className="h-8 w-8" />
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};
