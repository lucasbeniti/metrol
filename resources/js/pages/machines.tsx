import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import MachineDataTable from '@/machine/components/machines-data-table';
import { Machine } from '@/machine/types';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { FileOutput, PlusIcon } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Máquinas',
    href: '/machines',
  },
];

interface MachinesProps {
  machines: Machine[];
}

export default function Machines({ machines }: MachinesProps) {
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

        <MachineDataTable machines={machines} />
      </div>
    </AppLayout>
  );
}
