import { handleExport } from '@/actions/export-file';
import CreateAndExportButtons from '@/components/create-and-export-buttons';
import OperationDataTable from '@/components/operation/table';
import UpsertDialog from '@/components/operation/upsert-dialog';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { ICostCenter } from '@/types/cost-center';
import { IItem } from '@/types/item';
import { IOperation } from '@/types/operation';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Operações',
    href: '/operations',
  },
];

interface OperationsProps {
  operations: IOperation[];
  costCenters: ICostCenter[];
  items: IItem[];
}
export default function ClientsList({ operations, costCenters, items }: OperationsProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleExportClick = () => {
    handleExport('operations.export', 'operações');
  };

  const handleCreateClick = () => {
    setIsOpen(true);
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Clientes" />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
        <CreateAndExportButtons handleCreateClick={handleCreateClick} handleExportClick={handleExportClick} />
        <OperationDataTable operations={operations} costCenters={costCenters} items={items} />
      </div>

      <UpsertDialog isOpen={isOpen} setIsOpen={setIsOpen} costCenters={costCenters} items={items} />
    </AppLayout>
  );
}
