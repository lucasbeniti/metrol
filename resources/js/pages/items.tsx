import CreateButton from '@/components/create-button';
import ItemsDataTable from '@/components/item/table';
import UpsertDialog from '@/components/item/upsert-dialog';
import { useUpsertDialog } from '@/contexts/upsert-dialog-context';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { ICostCenter } from '@/types/cost-center';
import { IItem } from '@/types/item';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Peças',
    href: '/items',
  },
];

interface ItemProps {
  items: IItem[];
  costCenters: ICostCenter[];
}
export default function CostCenters({ items, costCenters }: ItemProps) {
  const { openUpsertDialog } = useUpsertDialog();

  const handleOpenDialog = () => {
    openUpsertDialog({
      UpsertDialogComponent: UpsertDialog,
      props: {
        costCenters,
        items,
      },
    });
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Peças" />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
        <div className="ml-auto flex gap-2">
          <CreateButton handleCreateClick={handleOpenDialog} />
        </div>

        <ItemsDataTable costCenters={costCenters} items={items} />
      </div>
    </AppLayout>
  );
}
