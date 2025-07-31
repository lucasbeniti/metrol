import DataTable from '@/components/ui/data-table';
import { useCustomTable } from '@/hooks/use-custom-table';
import { IClient } from '@/types/client';
import { clientColumns } from './columns';

export default function ClientsDataTable({ clients }: { clients: IClient[] }) {
  const { table } = useCustomTable<IClient>({
    columns: clientColumns(),
    data: clients,
  });

  return <DataTable table={table} filterBy="name" placeholder="nome do cliente" />;
}
