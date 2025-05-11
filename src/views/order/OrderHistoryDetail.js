'use client';

import dayjs from 'dayjs';
import Image from 'next/image';
import Link from 'next/link';
import { IoCopyOutline } from 'react-icons/io5';

import { BreadCrumbs } from 'components/common';
import { Button, Table } from 'components/form';
import { OrderHistoryDetailMobile } from 'components/ui';
import { VND } from 'constants/common';
import { DATE_FORMAT } from 'constants/custom';
import { useOrderHistoryDetail } from 'hooks/api';
import { useBreakpoints, useTable } from 'hooks/base';
import { Routes } from 'routes';
import { formatMoney, onCopy } from 'utils';

const BREAD_CRUMBS = [
  {
    title: 'Trang chủ',
    href: Routes.TRANG_CHU
  },
  {
    title: 'Lịch sử đơn hàng',
    href: Routes.DON_HANG
  },
  {
    title: 'Chi tiết đơn hàng',
    isActive: true
  }
];

const OrderHistoryDetail = ({ id }) => {
  const { isSmallTabletOrMobile } = useBreakpoints();

  const { data: { data } = {}, isLoading } = useOrderHistoryDetail(id);

  const columns = [
    {
      id: 'id',
      header: 'Mã sản phẩm',
      cell: ({ row }) => {
        const { product } = row.original || {};
        return <span>{product?.id}</span>;
      }
    },
    {
      id: 'image',
      header: 'Hình ảnh',
      cell: ({ row }) => {
        const { color, size, product } = row.original || {};
        const src = color?.files?.[0] || size?.files?.[0] || product?.files?.[0];
        return <Image src={src?.url} width={100} height={100} alt="product" />;
      }
    },
    {
      id: 'name',
      header: 'Tên sản phẩm',
      cell: ({ row }) => {
        const { product } = row.original || {};
        return <span>{product?.name}</span>;
      }
    },
    {
      id: 'quantity',
      header: 'Số lượng',
      cell: ({ row }) => {
        const { quantity } = row.original || {};
        return <span>{quantity}</span>;
      }
    },
    {
      id: 'total',
      header: 'Tổng tiền',
      cell: ({ row }) => {
        const { unitPrice, quantity } = row.original || {};
        return (
          <span>
            {formatMoney(quantity * unitPrice)}
            <span className="underline">{VND}</span>
          </span>
        );
      }
    },
    {
      id: 'action',
      header: 'Hành động',
      cell: ({ row }) => {
        const { product } = row.original || {};
        return (
          <Link href={Routes.CHI_TIET_SAN_PHAM.replace(':id', product?.id)} className="text-blue-700 hover:underline">
            Xem chi tiết
          </Link>
        );
      }
    }
  ];

  const table = useTable({
    data: data?.orderDetails || [],
    columns
  });

  return (
    <>
      <BreadCrumbs items={BREAD_CRUMBS} />
      <div className="mb-4 flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <div className="text-base font-semibold">Địa chỉ nhận hàng</div>
          <div>
            <div className="text-base">{data?.customerName}</div>
            <div className="text-base">{data?.customerPhone}</div>
            <div className="text-base">{data?.customerAddress}</div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="text-base font-semibold">Ngày đặt hàng</div>
          <div className="text-base">{dayjs(data?.createdAt).format(DATE_FORMAT.DATE_TIME)}</div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="text-base font-semibold">Mã đơn hàng</div>
          <div className="flex gap-2">
            <span className="text-base">{data?.orderCode}</span>
            <button type="button" onClick={() => onCopy(data?.orderCode)}>
              <IoCopyOutline size={20} />
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="text-base font-semibold">Mã vận chuyển</div>
          <div className="flex items-center gap-2">
            <span className="text-base">{'N/A'}</span>
            <button type="button" onClick={() => onCopy(data?.orderCode)}>
              <IoCopyOutline size={20} />
            </button>
          </div>
        </div>
      </div>
      <div className="mb-4 flex items-center justify-between gap-2">
        <div className="text-xl font-bold">Chi tiết đơn hàng</div>
        <Button>
          <Link href={Routes.HOA_DON.replace(':id', data?.orderCode)}>Xem hoá đơn</Link>
        </Button>
      </div>
      {isSmallTabletOrMobile ? (
        <OrderHistoryDetailMobile table={table} isLoading={isLoading} />
      ) : (
        <Table table={table} isLoading={isLoading} />
      )}
    </>
  );
};

export default OrderHistoryDetail;
