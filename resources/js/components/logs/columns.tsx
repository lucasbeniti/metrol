import { ACTIONS_MAP, TABLES_MAP } from '@/constants/logs';
import { ILog } from '@/types/logs';
import { getBadgeClassesFromLogAction } from '@/utils/logs';
import { ColumnDef } from '@tanstack/react-table';
import { Badge } from '../ui/badge';

export const logsColumns = (): ColumnDef<ILog>[] => [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'user',
    header: 'Usuário (Identificação)',
    cell: ({ row }) => {
      const user = row.original.user;
      return `${user.name} (${user.identification})`;
    },
  },
  {
    accessorKey: 'action.name',
    header: 'Ação',
    cell: ({ row }) => {
      const actionId = row.original.action?.id;
      return <Badge className={`text-white ${getBadgeClassesFromLogAction(actionId)}`}>{ACTIONS_MAP[actionId] || actionId}</Badge>;
    },
  },
  {
    accessorKey: 'description',
    header: 'Descrição',
  },
  {
    accessorKey: 'table.name',
    header: 'Tabela alterada',
    cell: ({ row }) => {
      const tableId = row.original.table?.id;
      return <Badge>{TABLES_MAP[tableId] || tableId}</Badge>;
    },
  },
  {
    accessorKey: 'created_at',
    header: 'Data',
    cell: ({ row }) => new Date(row.original.created_at).toLocaleString('pt-br'),
  },
];
