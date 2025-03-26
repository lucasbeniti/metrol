import { useCustomTable } from '@/hooks/use-custom-table';
import { IMachine } from '@/types/machine';
import { IOperation } from '@/types/operation';
import { ITool } from '@/types/tool';
import DataTable from '../ui/data-table';
import { machineColumns } from './columns';

export default function MachineDataTable({ machines, operations, tools }: { machines: IMachine[]; operations: IOperation[]; tools: ITool[] }) {
  const { table } = useCustomTable<IMachine>({
    columns: machineColumns(operations, tools),
    data: machines,
  });

  return <DataTable table={table} data={machines} filterBy="name" placeholder="nome da máquina" />;
}
