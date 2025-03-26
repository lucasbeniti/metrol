import { IMachine } from '@/types/machine';
import { IOperation } from '@/types/operation';
import { ITool } from '@/types/tool';
import { ColumnDef } from '@tanstack/react-table';
import UpdateAndDeleteButtons from '../update-and-delete-buttons';
import UpsertDialog from './upsert-dialog';

export const machineColumns = (operations: IOperation[],tools: ITool[]): ColumnDef<IMachine>[] => [
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
    accessorKey: 'tool_id',
    header: 'Ferramenta',
    cell: ({ row }) => {
      const toolId = row.original.tool_id;
      const tool = tools.find(t => t.id === toolId);  // Procura a ferramenta pelo tool_id
      return tool ? tool.name : 'Não se aplica';  // Se encontrar, mostra o nome, caso contrário, 'Não se aplica'
    },
  },
  {
    accessorKey: 'created_at',
    header: 'Data de criação',
    cell: ({ row }) => new Date(row.original.created_at).toLocaleString('pt-br'),
  },
  {
    accessorKey: 'actions',
    header: 'Ações',
    cell: ({ row }) => (
      <UpdateAndDeleteButtons
        row={row.original}
        description="Após deletar a máquina não será possível recuperá-la."
        entityName="máquina"
        deleteRoute="machines.destroy"
        UpsertDialog={(props) => <UpsertDialog {...props} existingMachine={row.original} operations={operations} tools={tools} />}
      />
    ),
  },
];
