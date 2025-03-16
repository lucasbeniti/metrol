import { handleExport } from '@/actions/export-file';
import CreateAndExportButtons from '@/components/create-and-export-buttons';
import MachineDataTable from '@/components/machine/table';
import { breadcrumbs } from '@/constants/breadcrumbs';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { IMachine } from '@/types/machine';
import { Head } from '@inertiajs/react';

const filteredBreadcrumbs = breadcrumbs.filter((breadcrumb: BreadcrumbItem) => breadcrumb.title === 'Máquinas');
interface MachinesProps {
  machines: IMachine[];
}

export default function Machines({ machines }: MachinesProps) {
  const handleExportClick = () => {
    handleExport('machines.export', 'máquinas');
  };

  return (
    <AppLayout breadcrumbs={filteredBreadcrumbs}>
      <Head title="Chamados" />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
        <CreateAndExportButtons handleCreateClick={() => {}} handleExportClick={handleExportClick} />
        <MachineDataTable machines={machines} />
      </div>
    </AppLayout>
  );
}
