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
      const action = row.original.action.name;
      return <Badge className={`text-white ${getBadgeClassesFromLogAction(action)}`}>{ACTIONS_MAP[action] || action}</Badge>;
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
      const table = row.original.table.name;
      return <Badge>{TABLES_MAP[table] || table}</Badge>;
    },
  },
  {
    accessorKey: 'created_at',
    header: 'Data',
    cell: ({ row }) => new Date(row.original.created_at).toLocaleString('pt-br'),
  },
];
