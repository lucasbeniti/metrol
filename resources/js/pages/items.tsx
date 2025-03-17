import { handleExport } from '@/actions/export-file';
import CreateAndExportButtons from '@/components/create-and-export-buttons';
import ItemsDataTable from '@/components/item/table';
import UpsertDialog from '@/components/item/upsert-dialog';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { ICostCenter } from '@/types/cost-center';
import { IItem } from '@/types/item';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Items',
    href: '/items',
  },
];

interface ItemProps {
  items: IItem[];
  costCenters: ICostCenter[];
}
export default function CostCenters({ items, costCenters }: ItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleExportClick = () => {
    handleExport('items.export', 'items');
  };

  const handleCreateClick = () => {
    setIsOpen(true);
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Items" />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
        <CreateAndExportButtons handleCreateClick={handleCreateClick} handleExportClick={handleExportClick} />
        <ItemsDataTable costCenters={costCenters} items={items} />
      </div>

      <UpsertDialog costCenters={costCenters} isOpen={isOpen} setIsOpen={setIsOpen} />
    </AppLayout>
  );
}
