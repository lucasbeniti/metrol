import { useCustomTable } from '@/hooks/use-custom-table';
import { IMachine } from '@/types/machine';
import DataTable from '../ui/data-table';
import { machineColumns } from './columns';

export default function MachineDataTable({ machines }: { machines: IMachine[] }) {
  const { table } = useCustomTable<IMachine>({
    columns: machineColumns,
    data: machines,
  });

  return <DataTable table={table} data={machines} filterBy="name" placeholder="nome da máquina" />;
}
