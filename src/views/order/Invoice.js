/* eslint-disable no-undef */

'use client';

import { Fragment, useRef } from 'react';

import dayjs from 'dayjs';
import Image from 'next/image';

import { Images } from 'assets';
import { BreadCrumbs } from 'components/common';
import { Button } from 'components/form';
import { VND } from 'constants/common';
import { DATE_FORMAT } from 'constants/custom';
import { useOrderHistoryDetail } from 'hooks/api';
import { useConfigStore } from 'hooks/store';
import { Routes } from 'routes';
import { formatMoney } from 'utils';

const BREAD_CRUMBS = [
  { title: 'Trang chủ', href: Routes.TRANG_CHU },
  { title: 'Hoá đơn', isActive: true }
];

const Invoice = ({ id }) => {
  const info = useConfigStore(state => state.info);
  const { data: { data } = {} } = useOrderHistoryDetail(id);
  const printRef = useRef(null);

  const handlePrint = () => {
    if (printRef.current) {
      const printWindow = window.open('', '_blank');
      printWindow.document.write(`
        <html>
          <head>
            <title>Hóa Đơn</title>
            <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
          </head>
          <body class="p-5 font-sans">
            ${printRef.current.innerHTML}
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  const renderProduct = item => {
    const { id: itemId, quantity, unitPrice } = item || {};
    const { name } = item?.product || {};
    const total = quantity * unitPrice;

    return (
      <Fragment key={itemId}>
        <div className="col-span-2">{name}</div>
        <div>{quantity}</div>
        <div>
          {formatMoney(unitPrice)}
          <span className="underline">{VND}</span>
        </div>
        <div>
          {formatMoney(total)}
          <span className="underline">{VND}</span>
        </div>
      </Fragment>
    );
  };

  return (
    <div>
      <BreadCrumbs items={BREAD_CRUMBS} />
      <div className="flex flex-col items-center gap-6">
        <div ref={printRef} className="min-w-[450px] rounded-md border border-gray-300 bg-gray-50 p-8 shadow">
          <div className="mb-4 flex flex-col items-center gap-2">
            <Image src={Images.logo_dark} width={100} height={44} alt="logo" />
            <div className="text-sm">https://leyenshop.net</div>
          </div>

          <div className="space-y-1 border-b border-dashed border-gray-300 pb-2.5 text-sm">
            <div>
              <span className="inline-block w-24 font-medium">Số điện thoại:</span> {info?.phone}
            </div>
            <div>
              <span className="inline-block w-24 font-medium">Zalo:</span> {info?.zalo}
            </div>
            <div>
              <span className="inline-block w-24 font-medium">Facebook:</span> {info?.facebook}
            </div>
            <div>
              <span className="inline-block w-24 font-medium">Địa chỉ:</span> {info?.address}
            </div>
          </div>

          <div className="mb-4 border-b border-dashed border-gray-300 py-4">
            <div className="mb-2 text-center text-lg font-bold">Phiếu thanh toán</div>
            <div className="space-y-1 text-sm">
              <div>
                <span className="inline-block w-24 font-medium">Mã đơn hàng:</span> {id}
              </div>
              <div>
                <span className="inline-block w-24 font-medium">Ngày tạo:</span>
                {dayjs(data?.createdAt).format(DATE_FORMAT.DATE_TIME)}
              </div>
            </div>
          </div>

          <div className="mb-4">
            <div className="grid grid-cols-5 text-sm font-semibold">
              <div className="col-span-2">Tên sản phẩm</div>
              <div>Số lượng</div>
              <div>Đơn giá</div>
              <div>Thành tiền</div>
            </div>
            <div className="grid grid-cols-5 gap-2 pt-2 text-sm">{data?.orderDetails?.map?.(renderProduct)}</div>
          </div>

          <div className="space-y-1 border-t border-dashed border-gray-300 pt-4 text-right text-sm">
            <div>
              <span className="font-medium">Số lượng:</span>
              <span className="inline-block w-24">{data?.orderDetails?.length}</span>
            </div>
            <div>
              <span className="font-medium">Phí ship:</span>
              <span className="inline-block w-24">
                {formatMoney(data?.shippingFee)}
                <span className="underline">{VND}</span>
              </span>
            </div>
            <div>
              <span className="font-medium">Tổng tiền:</span>
              <span className="inline-block w-24">
                {formatMoney(data?.totalPrice)}
                <span className="underline">{VND}</span>
              </span>
            </div>
          </div>
        </div>

        <Button onClick={handlePrint}>IN HOÁ ĐƠN</Button>
      </div>
    </div>
  );
};

export default Invoice;
