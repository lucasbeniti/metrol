import { metrologyCallColumns } from '@/components/metrology-call/columns';
import { useCustomTable } from '@/hooks/use-custom-table';
import { IMachine } from '@/types/machine';
import { IMetrologyCall } from '@/types/metrology-call';
import { IOperation } from '@/types/operation';
import DataTable from '../ui/data-table';

export default function MetrologyCallDataTable({
  metrologyCalls,
  machines,
  operations,
}: {
  metrologyCalls: IMetrologyCall[];
  machines: IMachine[];
  operations: IOperation[];
}) {
  const { table } = useCustomTable<IMetrologyCall>({
    columns: metrologyCallColumns(machines, operations),
    data: metrologyCalls,
  });

  return <DataTable table={table} data={metrologyCalls} filterBy="item_name" placeholder="nome do item" />;
}
