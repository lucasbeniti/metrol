import { useCustomTable } from '@/hooks/use-custom-table';
import { IItem } from '@/types/item';
import { IOperation } from '@/types/operation';
import DataTable from '../ui/data-table';
import { operationColumns } from './columns';

export default function OperationDataTable({
  operations,
  items,
}: {
  operations: IOperation[];
  items: IItem[];
}) {
  const { table } = useCustomTable<IOperation>({
    columns: operationColumns(items),
    data: operations,
  });

  return <DataTable table={table} data={operations} filterBy="id" placeholder="nome do item" />;
}
