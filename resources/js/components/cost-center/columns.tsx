import { IClient } from '@/types/client';
import { ICostCenter } from '@/types/cost-center';
import { ColumnDef } from '@tanstack/react-table';
import UpdateAndDeleteButtons from '../update-and-delete-buttons';
import UpsertDialog from './upsert-dialog';

export const costCenterColumns = (clients: IClient[]): ColumnDef<ICostCenter>[] => [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'name',
    header: 'Nome',
  },
  {
    accessorKey: 'code',
    header: 'Código',
  },
  {
    accessorKey: 'client.name',
    header: 'Cliente',
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
        description="Após deletar o centro de custo não será possível recuperá-lo."
        entityName="centro de custo"
        deleteRoute="cost-centers.destroy"
        UpsertDialog={(props) => <UpsertDialog {...props} existingCostCenter={row.original} clients={clients} />}
      />
    ),
  },
];
