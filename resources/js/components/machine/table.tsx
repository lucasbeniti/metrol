import { useCustomTable } from '@/hooks/use-custom-table';
import { IMachine } from '@/types/machine';
import { IOperation } from '@/types/operation';
import DataTable from '../ui/data-table';
import { machineColumns } from './columns';

export default function MachineDataTable({ machines, operations }: { machines: IMachine[]; operations: IOperation[] }) {
  const { table } = useCustomTable<IMachine>({
    columns: machineColumns(operations),
    data: machines,
  });

  return <DataTable table={table} filterBy="name" placeholder="nome da máquina" />;
}
