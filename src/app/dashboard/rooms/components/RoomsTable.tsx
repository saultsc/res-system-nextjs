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
import RoomModal from './RoomModal';
import { getPaginatedRooms } from '../actions/get-pagiated.action';
import { DeleteRoom } from './DeleteRoom';
import { MesasAssign } from './MesasAssign';

interface Room {
	id: number;
	nombre: string;
}

interface QueryParams {
	query: string;
	currentPage: number;
}

export const RoomsTable = async ({ currentPage, query }: QueryParams) => {
	const { rooms, totalPages } = await getPaginatedRooms(query, currentPage);

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
									<TableHead className="text-center">Asignar</TableHead>
									<TableHead className="text-center">Acciones</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{rooms.map((room: any) => (
									<TableRow key={room.id}>
										<TableCell>{room.id}</TableCell>
										<TableCell className="text-center">{room.nombre}</TableCell>
										<TableCell className="text-center">
											<MesasAssign room={room} />
										</TableCell>
										<TableCell className="flex gap-x-2 justify-center">
											<RoomModal room={room} action="Edit" />
											<DeleteRoom id={room.id} />
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
