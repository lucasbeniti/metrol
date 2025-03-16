import { IMachine } from '@/types/machine';
import { ColumnDef } from '@tanstack/react-table';

export const machineColumns: ColumnDef<IMachine>[] = [
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
];
