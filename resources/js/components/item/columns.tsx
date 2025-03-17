import { ICostCenter } from '@/types/cost-center';
import { IItem } from '@/types/item';
import { ColumnDef } from '@tanstack/react-table';
import UpdateAndDeleteButtons from '../update-and-delete-buttons';
import UpsertDialog from './upsert-dialog';

export const itemsColumns = (costCenters: ICostCenter[]): ColumnDef<IItem>[] => [
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
    accessorKey: 'cost_center.name',
    header: 'Centro de custo',
  },
  {
    accessorKey: 'actions',
    header: 'Ações',
    cell: ({ row }) => (
      <UpdateAndDeleteButtons
        row={row.original}
        description="Após deletar o item não será possível recuperá-lo."
        entityName="item"
        deleteRoute="items.destroy"
        UpsertDialog={(props) => <UpsertDialog {...props} existingItem={row.original} costCenters={costCenters} />}
      />
    ),
  },
];
