import { useCustomTable } from '@/hooks/use-custom-table';
import { ICostCenter } from '@/types/cost-center';
import { IItem } from '@/types/item';
import { IOperation } from '@/types/operation';
import DataTable from '../ui/data-table';
import { operationColumns } from './columns';

export default function OperationDataTable({
  operations,
  costCenters,
  items,
}: {
  operations: IOperation[];
  costCenters: ICostCenter[];
  items: IItem[];
}) {
  const { table } = useCustomTable<IOperation>({
    columns: operationColumns(costCenters, items),
    data: operations,
  });

  return <DataTable table={table} data={operations} filterBy="item_name" placeholder="nome do item" />;
}
