import DataTable from '@/components/ui/data-table';
import { useCustomTable } from '@/hooks/use-custom-table';
import { ILog } from '@/types/logs';
import { logsColumns } from './columns';

export default function LogsDataTable({ logs }: { logs: ILog[] }) {
  const { table } = useCustomTable<ILog>({
    columns: logsColumns(),
    data: logs,
  });

  return <DataTable table={table} data={logs} />;
}
