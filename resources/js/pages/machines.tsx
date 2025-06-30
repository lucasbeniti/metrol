import CreateButton from '@/components/create-button';
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
        <div className="ml-auto flex gap-2">
          <CreateButton handleCreateClick={handleOpenDialog} />
        </div>

        <MachineDataTable machines={machines} operations={operations} />
      </div>
    </AppLayout>
  );
}
