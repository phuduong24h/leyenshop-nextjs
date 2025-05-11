'use client';

import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import { Table } from '@tanstack/react-table';
import { LuChevronsLeft, LuChevronsRight } from 'react-icons/lu';

import Button from '../Button';
import Select from '../Select';

const ARRAY_PAGE_SIZE = [
  {
    label: '2',
    value: 2
  },
  {
    label: '5',
    value: 5
  },
  {
    label: '10',
    value: 10
  },
  {
    label: '20',
    value: 20
  },
  {
    label: '50',
    value: 50
  }
];

export default function TableFooter<TData>({ table }: { table: Table<TData> }) {
  const onRowPerPageChange = (value: string) => {
    const newPageSize = Number(value);
    table.setPageSize(newPageSize);
  };

  const onFirstPage = () => {
    table.setPageIndex(0);
  };

  const onPreviousPage = () => {
    table.previousPage();
  };

  const onNextPage = () => {
    table.nextPage();
  };

  const onLastPage = () => {
    table.setPageIndex(table.getPageCount() - 1);
  };

  return (
    <div className="flex w-full items-center justify-between px-2 py-4">
      <div>
        <span>{table.getSelectedRowModel().rows.length}</span>
        <span> row(s) selected</span>
      </div>
      <div className="flex items-center justify-end gap-6">
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium">Rows per page</p>
          <Select
            options={ARRAY_PAGE_SIZE}
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={onRowPerPageChange}
          />
        </div>
        <div className="flex items-center justify-center font-medium">
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            className="flex items-center justify-center"
            onClick={onFirstPage}
            disabled={!table.getCanPreviousPage()}>
            <span className="sr-only">Go to first page</span>
            <LuChevronsLeft className="size-4" />
          </Button>
          <Button
            variant="outline"
            className="flex items-center justify-center"
            onClick={onPreviousPage}
            disabled={!table.getCanPreviousPage()}>
            <span className="sr-only">Go to previous page</span>
            <ChevronLeftIcon className="size-4" />
          </Button>
          <Button
            variant="outline"
            className="flex items-center justify-center"
            onClick={onNextPage}
            disabled={!table.getCanNextPage()}>
            <span className="sr-only">Go to next page</span>
            <ChevronRightIcon className="size-4" />
          </Button>
          <Button
            variant="outline"
            className="flex items-center justify-center"
            onClick={onLastPage}
            disabled={!table.getCanNextPage()}>
            <span className="sr-only">Go to last page</span>
            <LuChevronsRight className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
