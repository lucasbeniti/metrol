import { metrologyCallColumns } from '@/components/metrology-call/columns';
import { useCustomTable } from '@/hooks/use-custom-table';
import { IItem } from '@/types/item';
import { IMachine } from '@/types/machine';
import { IMetrologyCall } from '@/types/metrology-call';
import { IOperation } from '@/types/operation';
import DataTable from '../ui/data-table';

export default function MetrologyCallDataTable({
  metrologyCalls,
  items,
  machines,
  operations,
}: {
  metrologyCalls: IMetrologyCall[];
  items: IItem[];
  machines: IMachine[];
  operations: IOperation[];
}) {
  const { table } = useCustomTable<IMetrologyCall>({
    columns: metrologyCallColumns(items, machines, operations),
    data: metrologyCalls,
  });

  return <DataTable table={table} data={metrologyCalls} filterBy="item_name" placeholder="nome do item" />;
}
