import { useCustomTable } from '@/hooks/use-custom-table';
import { IClient } from '@/types/client';
import { ICostCenter } from '@/types/cost-center';
import DataTable from '../ui/data-table';
import { costCenterColumns } from './columns';

export default function CostCenterDataTable({ costCenters, clients }: { costCenters: ICostCenter[]; clients: IClient[] }) {
  const { table } = useCustomTable<ICostCenter>({
    columns: costCenterColumns(clients),
    data: costCenters,
  });

  return <DataTable table={table} filterBy="name" placeholder="nome do centro de custo" />;
}
