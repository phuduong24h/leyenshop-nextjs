'use client';

import { Cell, flexRender, Row, Table } from '@tanstack/react-table';

import { Empty, Skeleton } from 'components/common';

export default function TableContent<TData>({ table, isLoading }: { table: Table<TData>; isLoading?: boolean }) {
  const renderColumn = (item: Cell<TData, unknown>) => {
    const { id, getContext, column } = item || {};

    return (
      <td key={id} className="p-3">
        {isLoading ? (
          <Skeleton />
        ) : (
          <div className="flex items-center justify-center">{flexRender(column.columnDef.cell, getContext())}</div>
        )}
      </td>
    );
  };

  const renderTab = (item: Row<TData>) => {
    const { id, getIsSelected, getVisibleCells } = item || {};

    return (
      <tr key={id} className="transition-colors hover:bg-slate-300/50" data-state={getIsSelected()}>
        {getVisibleCells().map(renderColumn)}
      </tr>
    );
  };

  const rows = table?.getRowModel?.()?.rows ?? [];

  if (!rows.length && !isLoading) {
    return (
      <tbody>
        <tr>
          <td colSpan={table.getAllColumns().length}>
            <Empty />
          </td>
        </tr>
      </tbody>
    );
  }

  return <tbody className="border-x border-b border-border-primary">{rows?.map?.(renderTab)}</tbody>;
}
