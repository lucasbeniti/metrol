import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { ColumnDef } from '@tanstack/react-table';
import { PencilIcon, TrashIcon } from 'lucide-react';
import { STATUS_LABELS, TYPE_LABELS } from './contants';
import { MetrologyCall } from './types';

export const metrologyCallColumns: ColumnDef<MetrologyCall>[] = [
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
    cell: () => (
      <>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant={'ghost'}>
                <PencilIcon />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Editar</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant={'ghost'}>
                <TrashIcon />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Deletar</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </>
    ),
  },
];
