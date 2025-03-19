import { IMachine } from '@/types/machine';
import { IOperation } from '@/types/operation';
import { ColumnDef } from '@tanstack/react-table';
import UpdateAndDeleteButtons from '../update-and-delete-buttons';
import UpsertDialog from './upsert-dialog';

export const machineColumns = (operations: IOperation[]): ColumnDef<IMachine>[] => [
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
    accessorKey: 'operation.name',
    header: 'Operação',
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
        description="Após deletar a máquina não será possível recuperá-la."
        entityName="máquina"
        deleteRoute="machines.destroy"
        UpsertDialog={(props) => <UpsertDialog {...props} existingMachine={row.original} operations={operations} />}
      />
    ),
  },
];
