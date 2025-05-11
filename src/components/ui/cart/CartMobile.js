'use client';

import { flexRender } from '@tanstack/react-table';

import { Button, CheckBox } from 'components/form';
import { VND } from 'constants/common';
import { formatMoney } from 'utils';

const CartMobile = ({ table, disabled, total, loading, onPay }) => {
  const renderProduct = row => {
    const Cell = ({ name }) => {
      const cell = row.getVisibleCells().find(x => x.column.id === name);
      return flexRender(cell.column.columnDef.cell, cell.getContext());
    };

    return (
      <div className="flex items-center gap-4 border-b border-border-primary py-4 last:border-none">
        <Cell name="checkbox" />
        <Cell name="image" />
        <div className="flex flex-1 flex-col gap-2">
          <Cell name="name" />
          <Cell name="price" />
          <Cell name="quantity" />
          <Cell name="note" />
        </div>
        <Cell name="action" />
      </div>
    );
  };

  return (
    <div>
      <div className="flex flex-col pb-20">{table?.getRowModel?.()?.rows?.map?.(renderProduct)}</div>
      <div className="fixed inset-x-0 bottom-0 z-10 border-t border-border-primary p-4">
        <div className="flex items-center justify-between gap-4">
          <CheckBox
            checked={table.getIsAllRowsSelected()}
            onCheckedChange={value => table.toggleAllPageRowsSelected(value)}
            label="Chọn tất cả"
          />
          <div className="flex items-center gap-4">
            <span className="text-base font-medium">
              Tổng cộng: <span className="font-bold text-state-error">{formatMoney(total)}</span>
              <span className="text-accent-2 underline">{VND}</span>
            </span>
            <Button label="Thanh toán" disabled={disabled} loading={loading} onClick={onPay} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartMobile;
