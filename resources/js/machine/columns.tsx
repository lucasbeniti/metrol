import { Machine } from '@/machine/types';
import { ColumnDef } from '@tanstack/react-table';

export const machineColumns: ColumnDef<Machine>[] = [
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
    accessorKey: 'actions',
    header: 'Ações',
  },
];
