import { ICostCenter } from '@/types/cost-center';
import { IItem } from '@/types/item';
import { ColumnDef } from '@tanstack/react-table';
import UpdateAndDeleteButtons from '../update-and-delete-buttons';
import UpsertDialog from './upsert-dialog';
import { Link } from '@inertiajs/react';
import { List  } from 'lucide-react';
import TooltipButton from '@/components/tooltip-button';


export const itemsColumns = (costCenters: ICostCenter[]): ColumnDef<IItem>[] => [
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
    accessorKey: 'cost_center.name',
    header: 'Centro de custo',
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
      <div className="flex gap-1">
        <Link href={route('items.operations.index', row.original.id)}>
          <TooltipButton variant="ghost" icon={<List className="text-blue-800" />} text="Operações" />
        </Link>
        <UpdateAndDeleteButtons
          row={row.original}
          description="Após deletar o item não será possível recuperá-lo."
          entityName="item"
          deleteRoute="items.destroy"
          UpsertDialog={(props) => <UpsertDialog {...props} existingItem={row.original} costCenters={costCenters} />}
        />

      </div>
    ),
  },
];
