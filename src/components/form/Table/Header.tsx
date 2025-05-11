'use client';

import { flexRender, Header, HeaderGroup, Table } from '@tanstack/react-table';

export default function TableHeader<TData>({ table }: { table: Table<TData> }) {
  const renderColumn = (item: Header<TData, unknown>) => {
    const { id, colSpan, isPlaceholder, column, getContext } = item || {};
    return (
      <th key={id} className="p-3 text-center text-base font-semibold text-text-on-primary" colSpan={colSpan}>
        <div className="flex items-center justify-center">
          {isPlaceholder ? null : flexRender(column.columnDef.header, getContext())}
        </div>
      </th>
    );
  };

  const renderTab = (item: HeaderGroup<TData>) => {
    const { id, headers } = item || {};

    return (
      <tr key={id} className="bg-primary transition-colors">
        {headers.map(renderColumn)}
      </tr>
    );
  };

  return <tbody>{table?.getHeaderGroups?.()?.map?.(renderTab)}</tbody>;
}
