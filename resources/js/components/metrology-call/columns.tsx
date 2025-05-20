import { STATUS_LABELS, TYPE_LABELS } from '@/constants/metrology-call';
import { IMachine } from '@/types/machine';
import { IMetrologyCall, MetrologyCallStatus } from '@/types/metrology-call';
import { IOperation } from '@/types/operation';
import { ColumnDef } from '@tanstack/react-table';
import UpdateAndDeleteButtons from '../update-and-delete-buttons';
import UpsertDialog from './upsert-dialog';

export const metrologyCallColumns = (machines: IMachine[], operations: IOperation[]): ColumnDef<IMetrologyCall>[] => [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'item_name',
    header: 'Nome do item',
  },
  {
    accessorKey: 'machine.name',
    header: 'Máquina',
  },
  {
    accessorKey: 'operation.name',
    header: 'Operação',
  },
  {
    accessorKey: 'type',
    header: 'Tipo',
    cell: ({ row }) => TYPE_LABELS[row.original.type] || row.original.type,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => STATUS_LABELS[row.original.status] || row.original.status,
  },
  {
    accessorKey: 'created_at',
    header: 'Data de criação',
    cell: ({ row }) => new Date(row.original.created_at).toLocaleString('pt-br'),
  },
  {
    accessorKey: 'actions',
    header: 'Ações',
    cell: ({ row }) =>
      row.original.status === ('waiting_receive' as MetrologyCallStatus) ? (
        <UpdateAndDeleteButtons
          row={row.original}
          description="Após deletar o chamado, não será possível recuperá-lo."
          entityName="chamado"
          deleteRoute="metrology-calls.destroy"
          UpsertDialog={(props) => <UpsertDialog {...props} machines={machines} operations={operations} existingMetrologyCall={row.original} />}
        />
      ) : (
        <div className="flex h-8 items-center">Não disponível</div>
      ),
  },
];
