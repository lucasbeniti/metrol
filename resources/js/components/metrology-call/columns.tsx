import { STATUS_MAP, TYPES_MAP } from '@/constants/metrology-call';
import { IItem } from '@/types/item';
import { IMachine } from '@/types/machine';
import { IMetrologyCall } from '@/types/metrology-call';
import { IOperation } from '@/types/operation';
import { isEditableStatus } from '@/utils/metrology_calls';
import { ColumnDef } from '@tanstack/react-table';
import UpdateAndDeleteButtons from '../update-and-delete-buttons';
import UpsertDialog from './upsert-dialog';

export const metrologyCallColumns = (items: IItem[], machines: IMachine[], operations: IOperation[]): ColumnDef<IMetrologyCall>[] => [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'operation.item.name',
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
    cell: ({ row }) => {
      return TYPES_MAP[row.original.metrology_call_type_id];
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => STATUS_MAP[row.original.metrology_call_status_id],
  },
  {
    accessorKey: 'created_at',
    header: 'Data de criação',
    cell: ({ row }) => new Date(row.original.created_at).toLocaleString('pt-br'),
  },
  {
    accessorKey: 'actions',
    header: 'Ações',
    cell: ({ row }) =>
      isEditableStatus(row.original.metrology_call_status_id) ? (
        <UpdateAndDeleteButtons
          row={row.original}
          description="Após deletar o chamado, não será possível recuperá-lo."
          entityName="chamado"
          deleteRoute="metrology-calls.destroy"
          UpsertDialog={(props) => (
            <UpsertDialog {...props} items={items} existingMetrologyCall={row.original} machines={machines} operations={operations} />
          )}
        />
      ) : (
        <div className="flex h-8 items-center">Não disponível</div>
      ),
  },
];
