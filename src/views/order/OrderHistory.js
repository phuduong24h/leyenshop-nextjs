'use client';

import { useState } from 'react';

import dayjs from 'dayjs';
import Link from 'next/link';

import { BreadCrumbs } from 'components/common';
import { DatePicker, Table } from 'components/form';
import { OrderHistoryMobile, OrderStatus } from 'components/ui';
import { VND } from 'constants/common';
import { DATE_FORMAT } from 'constants/custom';
import { useOrderHistory } from 'hooks/api';
import { useBreakpoints, useTable } from 'hooks/base';
import { Routes } from 'routes';
import { formatMoney } from 'utils';

const BREAD_CRUMBS = [
  {
    title: 'Trang chủ',
    href: Routes.TRANG_CHU
  },
  {
    title: 'Lịch sử đơn hàng',
    isActive: true
  }
];

const OrderHistory = () => {
  const { isSmallTabletOrMobile } = useBreakpoints();

  const [from, setFrom] = useState(dayjs().subtract(1, 'month'));
  const [to, setTo] = useState(dayjs());

  const { data: { data = [] } = {}, isLoading } = useOrderHistory({ from, to });

  const columns = [
    {
      id: 'id',
      accessorKey: 'orderCode',
      header: 'Mã đơn hàng',
      cell: ({ getValue }) => <span>{getValue()}</span>
    },
    {
      id: 'createdAt',
      accessorKey: 'createdAt',
      header: 'Ngày đặt hàng',
      cell: ({ getValue }) => <span>{dayjs(getValue()).format(DATE_FORMAT.DATE_TIME)}</span>
    },
    {
      id: 'total',
      accessorKey: 'totalPrice',
      header: 'Tổng tiền',
      cell: ({ getValue }) => (
        <span>
          {formatMoney(getValue())}
          <span className="underline">{VND}</span>
        </span>
      )
    },
    {
      id: 'status',
      accessorKey: 'paymentStatus',
      header: 'Trạng thái',
      cell: ({ getValue }) => <OrderStatus status={getValue()} />
    },
    {
      id: 'action',
      accessorKey: 'orderCode',
      header: 'Hành động',
      cell: ({ getValue }) => (
        <Link href={Routes.CHI_TIET_DON_HANG.replace(':id', getValue())} className="text-blue-700 underline">
          Xem chi tiết
        </Link>
      )
    }
  ];

  const table = useTable({
    data,
    columns
  });

  return (
    <>
      <BreadCrumbs items={BREAD_CRUMBS} />
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
        <DatePicker value={from} maxDate={to} onChange={setFrom} title="Từ" row wrapperClassName="w-[180px]" />
        <DatePicker
          value={to}
          minDate={from}
          maxDate={dayjs()}
          onChange={setTo}
          title="đến"
          wrapperClassName="w-[180px]"
          row
        />
      </div>
      {isSmallTabletOrMobile ? (
        <OrderHistoryMobile table={table} isLoading={isLoading} />
      ) : (
        <Table table={table} isLoading={isLoading} />
      )}
    </>
  );
};

export default OrderHistory;
