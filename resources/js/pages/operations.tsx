import { handleExport } from '@/actions/export-file';
import CreateAndExportButtons from '@/components/create-and-export-buttons';
import OperationDataTable from '@/components/operation/table';
import UpsertDialog from '@/components/operation/upsert-dialog';
import { useUpsertDialog } from '@/contexts/upsert-dialog-context';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { IItem } from '@/types/item';
import { IOperation } from '@/types/operation';
import { Head } from '@inertiajs/react';

interface OperationsProps {
  operations: IOperation[];
  item: IItem; 
}

export default function Operations({ operations, item }: OperationsProps) {
  const { openUpsertDialog } = useUpsertDialog();

  const handleExportClick = () => handleExport('operations.export', 'operações');

  const handleOpenDialog = () => {
    openUpsertDialog({
      UpsertDialogComponent: UpsertDialog,
      props: { 
        item,
        operations,
      },
    });
  };

  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: `Operações de ${item?.name || 'Indefinido'}`,
      href: '/operations',
    },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title={`Operações do item ${item?.name || 'Indefinido'}`} />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
        <CreateAndExportButtons 
          handleCreateClick={handleOpenDialog} 
          handleExportClick={handleExportClick} 
        />
        <OperationDataTable operations={operations} items={[item]} />
      </div>
    </AppLayout>
  );
}
