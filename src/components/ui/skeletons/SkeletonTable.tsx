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

export const SkeletonTable = () => {
	const skeletonRows = Array.from({ length: 7 }); // Generar 10 filas de esqueleto

	return (
		<div>
			<Card>
				<CardHeader className="bg-black/90 rounded-t-md text-white">
					<CardTitle>Cargando..</CardTitle>
				</CardHeader>
				<CardContent>
					<div className={'h-[560px] overflow-y-auto flex justify-center'}>
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Codigo</TableHead>
									<TableHead>Tipo Cliente</TableHead>
									<TableHead>Documento</TableHead>
									<TableHead>Nombre</TableHead>
									<TableHead>Correo</TableHead>
									<TableHead>Acciones</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{skeletonRows.map((_, index) => (
									<TableRow key={index}>
										<TableCell>
											<Skeleton className="h-4 w-full" />
										</TableCell>
										<TableCell>
											<Skeleton className="h-4 w-full" />
										</TableCell>
										<TableCell>
											<Skeleton className="h-4 w-full" />
										</TableCell>
										<TableCell>
											<Skeleton className="h-4 w-full" />
										</TableCell>
										<TableCell>
											<Skeleton className="h-4 w-full" />
										</TableCell>
										<TableCell className="flex gap-2">
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
