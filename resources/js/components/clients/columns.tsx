import UpdateAndDeleteButtons from '@/components/clients/update-and-delete-buttons';
import { IClient } from '@/types/client';
import { ColumnDef } from '@tanstack/react-table';

export const clientColumns = (): ColumnDef<IClient>[] => [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'name',
    header: 'Nome',
  },
  {
    accessorKey: 'created_at',
    header: 'Data de criação',
    cell: ({ row }) => new Date(row.original.created_at).toLocaleString('pt-br'),
  },
  {
    accessorKey: 'updated_at',
    header: 'Data de atualização',
    cell: ({ row }) => new Date(row.original.updated_at).toLocaleString('pt-br'),
  },
  {
    accessorKey: 'actions',
    header: 'Ações',
    cell: ({ row }) => <UpdateAndDeleteButtons row={row} />,
  },
];
