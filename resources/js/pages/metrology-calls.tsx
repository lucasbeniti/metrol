import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { Machine } from '@/machine/types';
import MetrologyCallDataTable from '@/metrology-call/components/metrology-call-data-table';
import UpsertMetrologyCallForm from '@/metrology-call/components/upsert-metrology-call-form';
import { MetrologyCall } from '@/metrology-call/types';
import { Operation } from '@/operation/types';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { FileOutput, PlusIcon } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

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

  const handleExport = async () => {
    try {
      const response = await fetch(route('metrology-calls.export'));

      if (!response.ok) {
        throw new Error('Não foi possível exportar a planilha!');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'chamados_metrologia.xlsx');
      document.body.appendChild(link);
      link.click();
      link.remove();

      toast.success('Planilha exportada com sucesso!');
    } catch (error) {
      toast.error('Não foi possível exportar a planilha!');
      console.error(error);
    }
  };

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

          <Button variant={'outline'} onClick={handleExport}>
            <FileOutput />
            Excel
          </Button>
        </div>
        <MetrologyCallDataTable metrologyCalls={metrologyCalls} machines={machines} operations={operations} />
      </div>

      <UpsertMetrologyCallForm isOpen={isOpen} setIsOpen={setIsOpen} machines={machines} operations={operations} />
    </AppLayout>
  );
}
