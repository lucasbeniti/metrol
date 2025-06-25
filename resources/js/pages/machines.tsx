import { handleExport } from '@/actions/export-file';
import CreateAndExportButtons from '@/components/create-and-export-buttons';
import MachineDataTable from '@/components/machine/table';
import UpsertDialog from '@/components/machine/upsert-dialog';
import { useUpsertDialog } from '@/contexts/upsert-dialog-context';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { IMachine } from '@/types/machine';
import { IOperation } from '@/types/operation';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Máquinas',
    href: '/machines',
  },
];
interface MachinesProps {
  machines: IMachine[];
  operations: IOperation[];
}

export default function Machines({ machines, operations }: MachinesProps) {
  const handleExportClick = () => {
    handleExport('machines.export', 'máquinas');
  };

  const { openUpsertDialog } = useUpsertDialog();

  const handleOpenDialog = () => {
    openUpsertDialog({
      UpsertDialogComponent: UpsertDialog,
      props: {
        machines,
        operations,
      },
    });
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Máquinas" />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
        <CreateAndExportButtons handleCreateClick={handleOpenDialog} handleExportClick={handleExportClick} />
        <MachineDataTable machines={machines} operations={operations} />
      </div>
    </AppLayout>
  );
}
