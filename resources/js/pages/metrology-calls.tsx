import { handleExport } from '@/actions/export-file';
import CreateButton from '@/components/create-button';
import ExportButton from '@/components/export-button';
import MetrologyCallDataTable from '@/components/metrology-call/table';
import UpsertDialog from '@/components/metrology-call/upsert-dialog';
import { useUpsertDialog } from '@/contexts/upsert-dialog-context';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { IMachine } from '@/types/machine';
import { IMetrologyCall } from '@/types/metrology-call';
import { IOperation } from '@/types/operation';
import { Head } from '@inertiajs/react';

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
  const handleExportClick = () => {
    handleExport('metrology-calls.export', 'chamados_metrologia');
  };

  const { openUpsertDialog } = useUpsertDialog();

  const handleOpenDialog = () => {
    openUpsertDialog({
      UpsertDialogComponent: UpsertDialog,
      props: {
        metrologyCalls,
        machines,
        operations,
      },
    });
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Chamados" />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
        <div className="ml-auto flex gap-2">
          <CreateButton handleCreateClick={handleOpenDialog} />
          <ExportButton handleExportClick={handleExportClick} />
        </div>

        <MetrologyCallDataTable metrologyCalls={metrologyCalls} machines={machines} operations={operations} />
      </div>
    </AppLayout>
  );
}
