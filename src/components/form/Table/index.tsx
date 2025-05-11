'use client';

import { Table as TanstackTable } from '@tanstack/react-table';

import TableContent from './Content';
import TableFooter from './Footer';
import TableHeader from './Header';

interface ITable<TData> {
  table: TanstackTable<TData>;
  isLoading: boolean;
  hidePagination?: boolean;
}

function Table<TData>({ table, isLoading, hidePagination = true }: ITable<TData>) {
  return (
    <table className="w-full">
      <TableHeader table={table} />
      <TableContent table={table} isLoading={isLoading} />
      {!hidePagination && <TableFooter table={table} />}
    </table>
  );
}

export default Table;
