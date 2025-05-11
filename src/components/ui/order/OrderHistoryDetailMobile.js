'use client';

import { flexRender } from '@tanstack/react-table';

import { Empty } from 'components/common';

const OrderHistoryDetailMobile = ({ table, isLoading }) => {
  const renderProduct = row => {
    const Cell = ({ name }) => {
      const cell = row.getVisibleCells().find(x => x.column.id === name);
      return flexRender(cell.column.columnDef.cell, cell.getContext());
    };
    const Header = ({ name }) => {
      const cell = row.getAllCells().find(x => x.column.id === name);
      return flexRender(cell.column.columnDef.header, cell.getContext());
    };

    return (
      <div className="flex items-center gap-4 border-b border-border-primary py-4 last:border-none">
        <Cell name="image" />
        <div className="flex flex-1 flex-col">
          <div className="text-base">
            <Cell name="name" />
          </div>
          <div className="flex items-center gap-2">
            <div className="font-semibold">
              <Header name="id" />
            </div>
            <span>:</span>
            <Cell name="id" />
          </div>
          <div className="flex items-center gap-2">
            <div className="font-semibold">
              <Header name="quantity" />
            </div>
            <span>:</span>
            <Cell name="quantity" />
          </div>
          <div className="flex items-center gap-2">
            <div className="font-semibold">
              <Header name="total" />
            </div>
            <span>:</span>
            <Cell name="total" />
          </div>
        </div>
        <Cell name="action" />
      </div>
    );
  };

  const rows = table?.getRowModel?.()?.rows ?? [];

  if (!rows.length && !isLoading) {
    return <Empty />;
  }

  return <div className="flex flex-col">{rows?.map?.(renderProduct)}</div>;
};

export default OrderHistoryDetailMobile;
