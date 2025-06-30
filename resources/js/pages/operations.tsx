import CreateButton from '@/components/create-button';
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

  const handleOpenDialog = () => {
    openUpsertDialog({
      UpsertDialogComponent: UpsertDialog,
      props: {
        operations,
        item,
      },
    });
  };

  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: `Operações`,
      href: '/operations',
    },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Operações" />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
        <div className="ml-auto flex gap-2">
          <CreateButton handleCreateClick={handleOpenDialog} />
        </div>

        <OperationDataTable operations={operations} item={item} />
      </div>
    </AppLayout>
  );
}
