import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { Machine } from '@/machine/types';
import CreateMetrologyCallForm from '@/metrology-call/components/create-metrology-call-form';
import MetrologyCallDataTable from '@/metrology-call/components/metrology-call-data-table';
import { MetrologyCall } from '@/metrology-call/types';
import { Operation } from '@/operation/types';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { FileOutput, PlusIcon } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Chamados',
    href: '/metrology-calls',
  },
];

interface MetrologyCallProps {
  metrologyCalls: MetrologyCall[];
  machines: Machine[];
  operations: Operation[];
}
export default function MetrologyCalls({ metrologyCalls, machines, operations }: MetrologyCallProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Chamados" />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
        <div className="ml-auto flex gap-2">
          <Button
            className="w-fit"
            variant={'outline'}
            onClick={() => {
              setIsOpen(true);
            }}
          >
            <PlusIcon />
            Criar
          </Button>

          <Button variant={'outline'}>
            <FileOutput />
            Excel
          </Button>
        </div>
        <MetrologyCallDataTable metrologyCalls={metrologyCalls} machines={machines} operations={operations} />
      </div>

      <CreateMetrologyCallForm isOpen={isOpen} setIsOpen={setIsOpen} machines={machines} operations={operations} />
    </AppLayout>
  );
}
