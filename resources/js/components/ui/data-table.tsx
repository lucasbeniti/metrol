import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { flexRender, Table as TableType } from '@tanstack/react-table';
import { Button } from './button';
import { Input } from './input';

interface DataTableProps<T> {
  table: TableType<T>;
  data: T[];
  filterBy: string;
  placeholder: string;
}

const DataTable = <T,>({ table, data, filterBy, placeholder }: DataTableProps<T>) => {
  return (
    <div>
      <div className="flex items-center py-4">
        <Input
          placeholder={`Pesquise pelo ${placeholder}`}
          value={(table.getColumn(filterBy)?.getFilterValue() as string) ?? ''}
          onChange={(event) => table.getColumn(filterBy)?.setFilterValue(event.target.value)}
          className="max-w-sm"
        />
      </div>
      <div className="flex items-center rounded-lg border shadow-md">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>{flexRender(header.column.columnDef.header, header.getContext())}</TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={data.length} className="py-4 text-center">
                  Nenhum dado encontrado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
          Voltar
        </Button>
        <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
          Avançar
        </Button>
      </div>
    </div>
  );
};

export default DataTable;
