import { handleExport } from '@/actions/export-file';
import CreateButton from '@/components/create-button';
import ExportButton from '@/components/export-button';
import MetrologyCallDataTable from '@/components/metrology-call/table';
import UpsertDialog from '@/components/metrology-call/upsert-dialog';
import { UserRole } from '@/constants/user-roles';
import { useUpsertDialog } from '@/contexts/upsert-dialog-context';
import AppLayout from '@/layouts/app-layout';
import { SharedData, type BreadcrumbItem } from '@/types';
import { IItem } from '@/types/item';
import { IMachine } from '@/types/machine';
import { IMetrologyCall } from '@/types/metrology-call';
import { IOperation } from '@/types/operation';
import { Head, usePage } from '@inertiajs/react';
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
  items: IItem[];
}

export default function MetrologyCalls({ metrologyCalls, items, machines, operations }: MetrologyCallProps) {
  const [isExporting, setIsExporting] = useState(false);

  const page = usePage<SharedData>();
  const { auth } = page.props;

  const handleExportClick = async () => {
    setIsExporting(true);

    await handleExport('metrology-calls.export', 'chamados_metrologia');

    setIsExporting(false);
  };

  const { openUpsertDialog } = useUpsertDialog();

  const handleOpenDialog = () => {
    openUpsertDialog({
      UpsertDialogComponent: UpsertDialog,
      props: {
        metrologyCalls,
        items,
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
          {auth.user.user_role_id === UserRole.OPERATOR && <CreateButton handleCreateClick={handleOpenDialog} />}
          {auth.user.user_role_id === UserRole.ADMIN && <ExportButton handleExportClick={handleExportClick} isExporting={isExporting} />}
        </div>

        <MetrologyCallDataTable
          metrologyCalls={metrologyCalls}
          items={items}
          machines={machines}
          operations={operations}
          userRole={auth.user.user_role_id as UserRole}
        />
      </div>
    </AppLayout>
  );
}
