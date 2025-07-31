import { useCustomTable } from '@/hooks/use-custom-table';
import { ICostCenter } from '@/types/cost-center';
import { IItem } from '@/types/item';
import DataTable from '../ui/data-table';
import { itemsColumns } from './columns';

export default function ItemsDataTable({ costCenters, items }: { costCenters: ICostCenter[]; items: IItem[] }) {
  const { table } = useCustomTable<IItem>({
    columns: itemsColumns(costCenters),
    data: items,
  });

  return <DataTable table={table} filterBy="name" placeholder="nome do item" />;
}
