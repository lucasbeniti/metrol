import { ILog } from '@/types/logs';
import { ColumnDef } from '@tanstack/react-table';

const ACTIONS_MAP: Record<string, string> = {
  create: 'Criação',
  update: 'Atualização',
  delete: 'Exclusão',
};

const TABLES_MAP: Record<string, string> = {
  users: 'Usuários',
  metrologyCalls: 'Chamados de Metrologia',
  machines: 'Máquinas',
  clients: 'Clientes',
  cost_centers: 'Centros de Custo',
  operations: 'Operações',
  items: 'Peças',
};

export const logsColumns = (): ColumnDef<ILog>[] => [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'user.name',
    header: 'Usuário',
  },
  {
    accessorKey: 'action.name',
    header: 'Ação',
    cell: ({ row }) => {
      const action = row.original.action.name;
      return ACTIONS_MAP[action] || action;
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
      return TABLES_MAP[table] || table;
    },
  },
  {
    accessorKey: 'created_at',
    header: 'Data',
    cell: ({ row }) => new Date(row.original.created_at).toLocaleString('pt-br'),
  },
];
