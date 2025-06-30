import { handleExport } from '@/actions/export-file';
import CreateButton from '@/components/create-button';
import ExportButton from '@/components/export-button';
import UsersDataTable from '@/components/user/table';
import UpsertDialog from '@/components/user/upsert-dialog';
import { useUpsertDialog } from '@/contexts/upsert-dialog-context';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { IUser } from '@/types/user';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Usuários',
    href: '/users',
  },
];

interface UsersProps {
  users: IUser[];
}
export default function Users({ users }: UsersProps) {
  const handleExportClick = () => {
    handleExport('users.export', 'usuários');
  };

  const { openUpsertDialog } = useUpsertDialog();

  const handleOpenDialog = () => {
    openUpsertDialog({
      UpsertDialogComponent: UpsertDialog,
      props: {
        users,
      },
    });
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Usuários" />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
        <div className="ml-auto flex gap-2">
          <CreateButton handleCreateClick={handleOpenDialog} />
          <ExportButton handleExportClick={handleExportClick} />
        </div>

        <UsersDataTable users={users} />
      </div>
    </AppLayout>
  );
}
