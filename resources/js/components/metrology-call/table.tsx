import { metrologyCallColumns } from '@/components/metrology-call/columns';
import { UserRole } from '@/constants/user-roles';
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
  userRole,
}: {
  metrologyCalls: IMetrologyCall[];
  items: IItem[];
  machines: IMachine[];
  operations: IOperation[];
  userRole: UserRole;
}) {
  const { table } = useCustomTable<IMetrologyCall>({
    columns: metrologyCallColumns(items, machines, operations, userRole),
    data: metrologyCalls,
  });

  return <DataTable table={table} filterBy="operation.item.name" placeholder="nome do item" />;
}
