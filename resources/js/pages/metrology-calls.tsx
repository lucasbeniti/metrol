import MetrologyCallDataTable from '@/components/metrology-call-data-table';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { MetrologyCall } from '@/metrology-call/types';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { FileOutput, PlusIcon } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Chamados',
    href: '/metrology-calls',
  },
];

interface MetrologyCallProps {
  metrologyCalls: MetrologyCall[];
}

export default function MetrologyCalls({ metrologyCalls }: MetrologyCallProps) {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Chamados" />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
        <div className="ml-auto flex gap-2">
          <Button className="w-fit" variant={'outline'}>
            <PlusIcon />
            Criar
          </Button>

          <Button variant={'outline'}>
            <FileOutput />
            Excel
          </Button>
        </div>
        <MetrologyCallDataTable metrologyCalls={metrologyCalls} />
      </div>
    </AppLayout>
  );
}
