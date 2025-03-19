import { handleExport } from '@/actions/export-file';
import CostCenterDataTable from '@/components/cost-center/table';
import UpsertDialog from '@/components/cost-center/upsert-dialog';
import CreateAndExportButtons from '@/components/create-and-export-buttons';
import { useUpsertDialog } from '@/contexts/upsert-dialog-context';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { IClient } from '@/types/client';
import { ICostCenter } from '@/types/cost-center';
import { Head } from '@inertiajs/react';

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
  const handleExportClick = () => {
    handleExport('cost-centers.export', 'centros_de_custo');
  };

  const { openUpsertDialog } = useUpsertDialog();

  const handleOpenDialog = () => {
    openUpsertDialog({
      UpsertDialogComponent: UpsertDialog,
      props: {
        costCenters,
        clients,
      },
    });
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Centros de Custo" />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
        <CreateAndExportButtons handleCreateClick={handleOpenDialog} handleExportClick={handleExportClick} />
        <CostCenterDataTable costCenters={costCenters} clients={clients} />
      </div>
    </AppLayout>
  );
}
