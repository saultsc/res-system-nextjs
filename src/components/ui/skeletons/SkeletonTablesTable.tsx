import {
	Card,
	CardHeader,
	CardTitle,
	CardContent,
	Table,
	TableHeader,
	TableRow,
	TableHead,
	TableBody,
	TableCell,
	Skeleton,
} from '@/components';

export const SkeletonTablesTable = () => {
	const skeletonRows = Array.from({ length: 10 }).map((_, index) => (
		<TableRow key={index}>
			<TableCell>
				<Skeleton className="h-4 w-16" />
			</TableCell>
			<TableCell className="text-center">
				<Skeleton className="h-4 w-24" />
			</TableCell>
			<TableCell className="text-center">
				<Skeleton className="h-4 w-32" />
			</TableCell>
			<TableCell className="text-center">
				<Skeleton className="h-4 w-16" />
			</TableCell>
			<TableCell className="flex gap-x-2 justify-center">
				<Skeleton className="h-8 w-8" />
				<Skeleton className="h-8 w-8" />
			</TableCell>
		</TableRow>
	));

	return (
		<div>
			<Card>
				<CardHeader className="bg-black/90 rounded-t-md text-white">
					<CardTitle>Mesas</CardTitle>
				</CardHeader>
				<CardContent>
					<div className={'h-[560px] overflow-y-auto flex justify-center'}>
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Codigo</TableHead>
									<TableHead className="text-center">Nombre</TableHead>
									<TableHead className="text-center">Descripción</TableHead>
									<TableHead className="text-center">Capacidad</TableHead>
									<TableHead className="text-center">Acciones</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>{skeletonRows}</TableBody>
						</Table>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};
