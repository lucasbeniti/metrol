import { STATUS_MAP, TYPES_MAP } from '@/constants/metrology-call';
import { UserRole } from '@/constants/user-roles';
import { IItem } from '@/types/item';
import { IMachine } from '@/types/machine';
import { IMetrologyCall } from '@/types/metrology-call';
import { IOperation } from '@/types/operation';
import { getBadgeClassesFromMetrologyCallStatus, getBadgeClassesFromMetrologyCallType, isEditableByOperator } from '@/utils/metrology_calls';
import { ColumnDef } from '@tanstack/react-table';
import MetrologistActionsButtonsProps from '../metrologist-action-buttons';
import { Badge } from '../ui/badge';
import UpdateAndDeleteButtons from '../update-and-delete-buttons';
import UpsertDialog from './upsert-dialog';

export const metrologyCallColumns = (
  items: IItem[],
  machines: IMachine[],
  operations: IOperation[],
  userRole: UserRole,
): ColumnDef<IMetrologyCall>[] => [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'operation.item.name',
    id: 'operation.item.name',
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
    cell: ({ row }) => (
      <Badge className={`dark:text-white ${getBadgeClassesFromMetrologyCallType(row.original.metrology_call_type_id)}`}>
        {TYPES_MAP[row.original.metrology_call_type_id]}
      </Badge>
    ),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => (
      <Badge className={`dark:text-white ${getBadgeClassesFromMetrologyCallStatus(row.original.metrology_call_status_id)}`}>
        {STATUS_MAP[row.original.metrology_call_status_id]}
      </Badge>
    ),
  },
  {
    accessorKey: 'created_at',
    header: 'Data de criação',
    cell: ({ row }) => new Date(row.original.created_at).toLocaleString('pt-br'),
  },
  {
    accessorKey: 'actions',
    header: 'Ações',
    cell: ({ row }) => {
      const statusId = row.original.metrology_call_status_id;

      if (userRole === UserRole.OPERATOR) {
        if (isEditableByOperator(statusId)) {
          return (
            <UpdateAndDeleteButtons
              row={row.original}
              description="Após deletar o chamado, não será possível recuperá-lo."
              entityName="chamado"
              deleteRoute="metrology-calls.destroy"
              UpsertDialog={(props) => (
                <UpsertDialog
                  {...props}
                  items={items}
                  existingMetrologyCall={{ ...row.original, item_id: row.original.operation?.item_id }}
                  machines={machines}
                  operations={operations}
                />
              )}
            />
          );
        } else {
          return <div className="flex h-8 items-center">Não disponível</div>;
        }
      }

      if (userRole === UserRole.METROLOGIST) {
        return <MetrologistActionsButtonsProps call={row.original} />;
      }

      return <div className="flex h-8 items-center">Não disponível</div>;
    },
  },
];
