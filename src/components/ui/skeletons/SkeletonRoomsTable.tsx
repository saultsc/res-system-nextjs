import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
	Skeleton,
} from '@/components';

export const RoomsTableSkeleton = () => {
	const skeletonRows = Array.from({ length: 8 }, (_, index) => (
		<TableRow key={index}>
			<TableCell>
				<Skeleton className="h-4 w-20" />
			</TableCell>
			<TableCell className="text-center">
				<Skeleton className="h-4 w-32" />
			</TableCell>
			<TableCell className="flex gap-x-2 justify-center">
				<Skeleton className="h-8 w-16" />
				<Skeleton className="h-8 w-16" />
			</TableCell>
		</TableRow>
	));

	return (
		<div>
			<Card>
				<CardHeader className="bg-black/90 rounded-t-md text-white">
					<CardTitle>Salas</CardTitle>
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
							<TableBody>{skeletonRows}</TableBody>
						</Table>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};
