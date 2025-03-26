import { handleExport } from '@/actions/export-file';
import CreateAndExportButtons from '@/components/create-and-export-buttons';
import ToolDataTable from '@/components/tool/table';
import UpsertDialog from '@/components/tool/upsert-dialog';
import { useUpsertDialog } from '@/contexts/upsert-dialog-context';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { ITool } from '@/types/tool';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Ferramentas',
    href: '/tools',
  },
];

interface ToolProps {
  tools: ITool[];
}
export default function Tools({ tools }: ToolProps) {
  const handleExportClick = () => {
    handleExport('tools.export', 'tools');
  };

  const { openUpsertDialog } = useUpsertDialog();

  const handleOpenDialog = () => {
    openUpsertDialog({
      UpsertDialogComponent: UpsertDialog,
      props: {
        tools,
      },
    });
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Ferramentas" />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
        <CreateAndExportButtons handleCreateClick={handleOpenDialog} handleExportClick={handleExportClick} />
        <ToolDataTable  tools={tools} />
      </div>
    </AppLayout>
  );
}
