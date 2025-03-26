import { useCustomTable } from '@/hooks/use-custom-table';
import { ITool } from '@/types/tool';
import DataTable from '../ui/data-table';
import { toolColumns } from './columns';

export default function ToolDataTable({ tools }: { tools: ITool[] }) {
  const { table } = useCustomTable<ITool>({
    columns: toolColumns(),
    data: tools,
  });

  return <DataTable table={table} data={tools} filterBy="name" placeholder="nome da ferramenta" />;
}
