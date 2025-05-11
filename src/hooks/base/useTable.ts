'use client';

import { useState } from 'react';

import {
  ColumnFiltersState,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getSortedRowModel,
  PaginationState,
  SortingState,
  TableOptions,
  useReactTable,
  VisibilityState
} from '@tanstack/react-table';

import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from 'constants/common';

interface ITableHook<TData> extends TableOptions<TData> {
  updatePagination?: (state: PaginationState) => void;
}

export function useTable<TData>({ updatePagination, state, ...props }: ITableHook<TData>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      ...(state || {})
    },
    enableRowSelection: true,
    manualPagination: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    onPaginationChange: updater => {
      if (typeof updater === 'function') {
        const newPagination = updater({
          pageIndex: state?.pagination?.pageIndex || DEFAULT_PAGE,
          pageSize: state?.pagination?.pageSize || DEFAULT_PAGE_SIZE
        });
        updatePagination?.({ pageIndex: newPagination.pageIndex + 1, pageSize: newPagination.pageSize });
      }
    },
    ...props,
    getCoreRowModel: getCoreRowModel()
  });

  return table;
}
