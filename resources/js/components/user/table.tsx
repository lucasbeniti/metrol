import { useCustomTable } from '@/hooks/use-custom-table';
import { IUser } from '@/types/user';
import DataTable from '../ui/data-table';
import { usersColumns } from './columns';

export default function UsersDataTable({ users }: { users: IUser[] }) {
  const { table } = useCustomTable<IUser>({
    columns: usersColumns(),
    data: users,
  });

  return <DataTable table={table} data={users} filterBy="name" placeholder="nome do usuário" />;
}
