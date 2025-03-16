import { handleExport } from '@/actions/export-file';
import CreateAndExportButtons from '@/components/create-and-export-buttons';
import MetrologyCallDataTable from '@/components/metrology-call/table';
import UpsertDialog from '@/components/metrology-call/upsert-dialog';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { IMachine } from '@/types/machine';
import { IMetrologyCall } from '@/types/metrology-call';
import { IOperation } from '@/types/operation';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Chamados',
    href: '/metrology-calls',
  },
];

interface MetrologyCallProps {
  metrologyCalls: IMetrologyCall[];
  machines: IMachine[];
  operations: IOperation[];
}
export default function MetrologyCalls({ metrologyCalls, machines, operations }: MetrologyCallProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleExportClick = () => {
    handleExport('metrology-calls.export', 'chamados_metrologia');
  };

  const handleCreateClick = () => {
    setIsOpen(true);
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Chamados" />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
        <CreateAndExportButtons handleCreateClick={handleCreateClick} handleExportClick={handleExportClick} />
        <MetrologyCallDataTable metrologyCalls={metrologyCalls} machines={machines} operations={operations} />
      </div>

      <UpsertDialog isOpen={isOpen} setIsOpen={setIsOpen} machines={machines} operations={operations} />
    </AppLayout>
  );
}
