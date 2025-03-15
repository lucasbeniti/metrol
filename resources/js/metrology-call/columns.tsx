import { Machine } from '@/machine/types';
import UpdateAndDeleteButtons from '@/metrology-call/components/update-and-delete-buttons';
import { Operation } from '@/operation/types';
import { ColumnDef } from '@tanstack/react-table';
import { STATUS_LABELS, TYPE_LABELS } from './contants';
import { MetrologyCall } from './types';

export const metrologyCallColumns = (machines: Machine[], operations: Operation[]): ColumnDef<MetrologyCall>[] => [
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
    accessorKey: 'actions',
    header: 'Ações',
    cell: ({ row }) => <UpdateAndDeleteButtons row={row} machines={machines} operations={operations} />,
  },
];
