import { handleExport } from '@/actions/export-file';
import CreateAndExportButtons from '@/components/create-and-export-buttons';
import MachineDataTable from '@/components/machine/table';
import UpsertDialog from '@/components/machine/upsert-dialog';
import { breadcrumbs } from '@/constants/breadcrumbs';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { IMachine } from '@/types/machine';
import { IOperation } from '@/types/operation';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

const filteredBreadcrumbs = breadcrumbs.filter((breadcrumb: BreadcrumbItem) => breadcrumb.title === 'Máquinas');
interface MachinesProps {
  machines: IMachine[];
  operations: IOperation[];
}

export default function Machines({ machines, operations }: MachinesProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleExportClick = () => {
    handleExport('machines.export', 'máquinas');
  };

  const handleCreateClick = () => {
    setIsOpen(true);
  };

  return (
    <AppLayout breadcrumbs={filteredBreadcrumbs}>
      <Head title="Chamados" />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
        <CreateAndExportButtons handleCreateClick={handleCreateClick} handleExportClick={handleExportClick} />
        <MachineDataTable machines={machines} operations={operations} />
      </div>

      <UpsertDialog isOpen={isOpen} setIsOpen={setIsOpen} operations={operations} />
    </AppLayout>
  );
}
