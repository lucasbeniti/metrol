import CostCenterDataTable from '@/components/cost-center/table';
import UpsertDialog from '@/components/cost-center/upsert-dialog';
import CreateButton from '@/components/create-button';
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
        <div className="ml-auto flex gap-2">
          <CreateButton handleCreateClick={handleOpenDialog} />
        </div>

        <CostCenterDataTable costCenters={costCenters} clients={clients} />
      </div>
    </AppLayout>
  );
}
