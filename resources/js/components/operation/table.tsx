import { useCustomTable } from '@/hooks/use-custom-table';
import { IItem } from '@/types/item';
import { IOperation } from '@/types/operation';
import DataTable from '../ui/data-table';
import { operationColumns } from './columns';

export default function OperationDataTable({ operations, item }: { operations: IOperation[]; item: IItem }) {
  const { table } = useCustomTable<IOperation>({
    columns: operationColumns(item),
    data: operations,
  });

  return <DataTable table={table} filterBy="id" placeholder="nome da operação" />;
}
