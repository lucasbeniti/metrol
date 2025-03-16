import { handleExport } from '@/actions/export-file';
import ClientsListDataTable from '@/components/clients/table';
import UpsertDialog from '@/components/clients/upsert-dialog';
import CreateAndExportButtons from '@/components/create-and-export-buttons';
import { breadcrumbs } from '@/constants/breadcrumbs';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { IClient } from '@/types/client';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

const filteredBreadcrumbs = breadcrumbs.filter((breadcrumb: BreadcrumbItem) => breadcrumb.title === 'Clientes');

interface ClientsProps {
  clients: IClient[];
}
export default function ClientsList({ clients }: ClientsProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleExportClick = () => {
    handleExport('clients.export', 'clientes');
  };

  const handleCreateClick = () => {
    setIsOpen(true);
  };

  return (
    <AppLayout breadcrumbs={filteredBreadcrumbs}>
      <Head title="Clientes" />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
        <CreateAndExportButtons handleCreateClick={handleCreateClick} handleExportClick={handleExportClick} />
        <ClientsListDataTable clients={clients} />
      </div>

      <UpsertDialog isOpen={isOpen} setIsOpen={setIsOpen} />
    </AppLayout>
  );
}
