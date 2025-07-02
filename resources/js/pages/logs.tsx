import FilterDialog from '@/components/logs/filter-dialog';
import LogsDataTable from '@/components/logs/table';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { ILog } from '@/types/logs';
import { IUser } from '@/types/user';
import { Head, router } from '@inertiajs/react';
import { Filter, FilterX } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Logs',
    href: '/logs',
  },
];

import { IFilterLog } from '@/types/logs';
import { toast } from 'sonner';

interface LogsProps {
  logs: ILog[];
  users: IUser[];
  filters: Partial<IFilterLog>;
}

const Logs = ({ logs, users, filters }: LogsProps) => {
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);

  const handleOpenFilterClick = () => {
    setIsFilterDialogOpen(true);
  };

  const handleClearFilters = () => {
    router.get(
      route('logs.index'),
      {},
      {
        onSuccess: () => {
          toast.success('Filtros removidos com sucesso!');
        },
        onError: (errors) => {
          toast.error('Não foi possível limpar os filtros.');
          console.error(errors);
        },
      },
    );
  };

  const hasActiveFilters = () => {
    return (
      (filters.user_id && filters.user_id !== 'all') ||
      (filters.action_id && filters.action_id !== 'all') ||
      (filters.table_id && filters.table_id !== 'all')
    );
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Logs" />

      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
        <div className="ml-auto flex gap-2">
          <Button className="w-fit" variant={'outline'} onClick={handleOpenFilterClick}>
            <Filter />
            Filtrar
          </Button>
          <Button variant={'outline'} onClick={handleClearFilters} disabled={!hasActiveFilters()}>
            <FilterX />
            Limpar Filtros
          </Button>
        </div>
        <LogsDataTable logs={logs} />
      </div>

      {isFilterDialogOpen && <FilterDialog users={users} isOpen={isFilterDialogOpen} onOpenChange={setIsFilterDialogOpen} filters={filters} />}
    </AppLayout>
  );
};

export default Logs;
