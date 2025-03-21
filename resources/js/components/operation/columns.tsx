import { IItem } from '@/types/item';
import { IOperation } from '@/types/operation';
import { ColumnDef } from '@tanstack/react-table';
import UpdateAndDeleteButtons from '../update-and-delete-buttons';
import UpsertDialog from './upsert-dialog';

export const operationColumns = (item: IItem): ColumnDef<IOperation>[] => [
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
        description="Após deletar a operação, não será possível recuperá-la."
        entityName="operação"
        deleteRoute="items.operations.destroy"
        parentId={item.id}
        UpsertDialog={(props) => <UpsertDialog {...props} existingOperation={row.original} item={item} />}
      />
    ),
  },
];
