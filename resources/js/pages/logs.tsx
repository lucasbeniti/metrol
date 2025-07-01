import LogsDataTable from '@/components/logs/table';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { ILog } from '@/types/logs';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Logs',
    href: '/logs',
  },
];

interface LogsProps {
  logs: ILog[];
}

const Logs = ({ logs }: LogsProps) => {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Logs" />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
        <LogsDataTable logs={logs} />
      </div>
    </AppLayout>
  );
};

export default Logs;
