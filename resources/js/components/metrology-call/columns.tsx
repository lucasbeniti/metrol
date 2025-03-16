import UpdateAndDeleteButtons from '@/components/metrology-call/update-and-delete-buttons';
import { STATUS_LABELS, TYPE_LABELS } from '@/constants/metrology-call';
import { IMachine } from '@/types/machine';
import { IMetrologyCall } from '@/types/metrology-call';
import { IOperation } from '@/types/operation';
import { ColumnDef } from '@tanstack/react-table';

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
    cell: ({ row }) => <UpdateAndDeleteButtons row={row} machines={machines} operations={operations} />,
  },
];
