import { handleExport } from '@/actions/export-file';
import ClientsDataTable from '@/components/client/table';
import UpsertDialog from '@/components/client/upsert-dialog';
import CreateAndExportButtons from '@/components/create-and-export-buttons';
import { useUpsertDialog } from '@/contexts/upsert-dialog-context';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { IClient } from '@/types/client';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Clientes',
    href: '/clients',
  },
];

interface ClientsProps {
  clients: IClient[];
}
export default function Clients({ clients }: ClientsProps) {
  const handleExportClick = () => {
    handleExport('clients.export', 'clientes');
  };

  const { openUpsertDialog } = useUpsertDialog();

  const handleOpenDialog = () => {
    openUpsertDialog({
      UpsertDialogComponent: UpsertDialog,
      props: {
        clients,
      },
    });
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Clientes" />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
        <CreateAndExportButtons handleCreateClick={handleOpenDialog} handleExportClick={handleExportClick} />
        <ClientsDataTable clients={clients} />
      </div>
    </AppLayout>
  );
}
