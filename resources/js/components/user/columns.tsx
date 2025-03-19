import { TYPE_LABELS } from '@/constants/user';
import { IUser } from '@/types/user';
import { ColumnDef } from '@tanstack/react-table';
import UpdateAndDeleteButtons from '../update-and-delete-buttons';
import UpsertDialog from './upsert-dialog';

export const usersColumns = (): ColumnDef<IUser>[] => [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'name',
    header: 'Nome',
  },
  {
    accessorKey: 'identification',
    header: 'Identificação',
  },
  {
    accessorKey: 'type',
    header: 'Tipo',
    cell: ({ row }) => TYPE_LABELS[row.original.type] || row.original.type,
  },
  {
    accessorKey: 'created_at',
    header: 'Data de criação',
    cell: ({ row }) => new Date(row.original.created_at).toLocaleString('pt-br'),
  },
  {
    accessorKey: 'actions',
    header: 'Ações',
    cell: ({ row }) => (
      <UpdateAndDeleteButtons
        row={row.original}
        description="Após deletar o usuário, não será possível recuperá-lo."
        entityName="usuário"
        deleteRoute="users.destroy"
        UpsertDialog={(props) => <UpsertDialog {...props} existingUser={row.original} />}
      />
    ),
  },
];
