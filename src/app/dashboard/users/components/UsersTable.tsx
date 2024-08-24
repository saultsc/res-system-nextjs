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
	Paginated,
} from '@/components';
import UserModal from './UserModal';
import { DeleteUser } from './DeleteUser';
import { getPaginatedUsers } from '../actions/get-paginated.action';

interface QueryParams {
	currentPage: number;
	query: any;
}

export const UsersTable = async ({ currentPage, query }: QueryParams) => {
	const { users, totalPages } = await getPaginatedUsers(query, currentPage);

	return (
		<div>
			<Card>
				<CardHeader className="bg-black/90 rounded-t-md text-white">
					<CardTitle>Usuarios</CardTitle>
				</CardHeader>
				<CardContent>
					<div className={'h-[560px] overflow-y-auto flex justify-center'}>
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Codigo</TableHead>
									<TableHead className="text-center">Nombre</TableHead>
									<TableHead className="text-center">Correo</TableHead>
									<TableHead className="text-center">Rol</TableHead>
									<TableHead className="text-center">Acciones</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{users.map((user: any) => (
									<TableRow key={user.id}>
										<TableCell>{user.id}</TableCell>
										<TableCell className="text-center">
											{user.fullName}
										</TableCell>
										<TableCell className="text-center">{user.email}</TableCell>
										<TableCell className="text-center">
											{user.role.toUpperCase()}
										</TableCell>
										<TableCell className="flex gap-x-2 justify-center">
											<UserModal user={user} action="Edit" />
											<DeleteUser id={user.id} />
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
