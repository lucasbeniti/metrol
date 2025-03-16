import UpdateAndDeleteButtons from '@/clients/components/update-and-delete-buttons';
import { ColumnDef } from '@tanstack/react-table';
import { Clients } from './types';

export const ClientsColumns = (): ColumnDef<Clients>[] => [
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
