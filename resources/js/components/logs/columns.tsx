import { ACTIONS_MAP, ENTITY_NAME_MAP, TABLES_MAP } from '@/constants/logs';
import { ILog } from '@/types/logs';
import { getBadgeClassesFromLogAction } from '@/utils/logs';
import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';
import { useState } from 'react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import LogDetailsDialog from './log-details-dialog';

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
  {
    accessorKey: 'details',
    header: 'Detalhes',
    cell: ({ row }) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [isOpen, setIsOpen] = useState(false);
      const details: Record<string, unknown> = row.original.details || {};

      const tableId = row.original.table?.id;
      const entityName = ENTITY_NAME_MAP[tableId];

      return (
        <>
          <Button variant="ghost" onClick={() => setIsOpen(true)}>
            <MoreHorizontal />
          </Button>

          <LogDetailsDialog isOpen={isOpen} setIsOpen={setIsOpen} details={details} entityName={entityName} />
        </>
      );
    },
  },
];
