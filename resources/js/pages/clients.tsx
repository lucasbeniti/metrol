import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import ClientsListDataTable from '@/clients/components/clients-data-table';
import CreateClientsForm from '@/clients/components/upsert-clients-form';
import  {Clients}  from '@/clients/types';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { FileOutput, PlusIcon } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Clientes',
    href: '/clients',
  },
];

interface ClientsProps {
  ClientsList: Clients[];
}
export default function ClientsList({ ClientsList }: ClientsProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Clientes" />
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

        </div>
        <ClientsListDataTable Clients={ClientsList} />
      </div>

      <CreateClientsForm isOpen={isOpen} setIsOpen={setIsOpen}  />
    </AppLayout>
  );
}
