import ClientsDataTable from '@/components/client/table';
import UpsertDialog from '@/components/client/upsert-dialog';
import CreateButton from '@/components/create-button';
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
        <div className="ml-auto flex gap-2">
          <CreateButton handleCreateClick={handleOpenDialog} />
        </div>

        <ClientsDataTable clients={clients} />
      </div>
    </AppLayout>
  );
}
