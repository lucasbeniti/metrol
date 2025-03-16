import { handleExport } from '@/actions/export-file';
import CostCenterDataTable from '@/components/cost-center/table';
import UpsertDialog from '@/components/cost-center/upsert-dialog';
import CreateAndExportButtons from '@/components/create-and-export-buttons';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { IClient } from '@/types/client';
import { ICostCenter } from '@/types/cost-center';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Centros de Custo',
    href: '/cost-centers',
  },
];

interface CostCenterProps {
  costCenters: ICostCenter[];
  clients: IClient[];
}
export default function CostCenters({ costCenters, clients }: CostCenterProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleExportClick = () => {
    handleExport('cost-centers.export', 'centros_de_custo');
  };

  const handleCreateClick = () => {
    setIsOpen(true);
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Centros de Custo" />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
        <CreateAndExportButtons handleCreateClick={handleCreateClick} handleExportClick={handleExportClick} />
        <CostCenterDataTable costCenters={costCenters} clients={clients} />
      </div>

      <UpsertDialog clients={clients} isOpen={isOpen} setIsOpen={setIsOpen} />
    </AppLayout>
  );
}
