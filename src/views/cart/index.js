'use client';

import { useMemo, useState } from 'react';

import Image from 'next/image';
import { RiDeleteBinLine } from 'react-icons/ri';
import { toast } from 'sonner';

import { BreadCrumbs } from 'components/common';
import { CheckBox } from 'components/form';
import { AddressInfo, CartDesktop, CartEmpty, CartMobile, Quantity } from 'components/ui';
import { VND } from 'constants/common';
import { useCheckProductExist } from 'hooks/api';
import { useBreakpoints, useFlag, useTable } from 'hooks/base';
import { useCartStore, useCartStoreActions } from 'hooks/store';
import { Routes } from 'routes';
import { formatMoney } from 'utils';

const BREAD_CRUMB_ITEMS = [
  {
    title: 'Trang chủ',
    href: Routes.TRANG_CHU
  },
  {
    title: 'Giỏ hàng',
    isActive: true
  }
];

const Cart = () => {
  const carts = useCartStore(state => state.carts);
  const { removeCart, increaseCart, decreaseCart } = useCartStoreActions();
  const { isSmallTabletOrMobile } = useBreakpoints();

  const { doRequest: doCheckProductExist, loading: loadingCheckProductExist } = useCheckProductExist();
  const [visibleUserInfo, onShowUserInfo, onHideUserInfo] = useFlag();

  const [productNotExist, setProductNotExist] = useState([]);

  const isCartEmpty = useMemo(() => !carts?.length, [carts]);
  const total = useMemo(() => {
    return carts?.reduce?.((totalReduce, cart) => totalReduce + (cart?.price || 0) * (cart?.quantity || 1), 0);
  }, [carts]);

  const handleRemoveCart = id => {
    removeCart(id);
    setProductNotExist(prev => prev.filter(item => item !== id));
  };

  const handleQuantity = id => value => {
    if (value) {
      increaseCart(id);
    } else {
      decreaseCart(id);
    }
  };

  const handlePay = () => {
    doCheckProductExist({ productIds: productActivated?.map?.(x => x?.id) }, res => {
      if (res?.success) {
        onShowUserInfo();
      } else {
        setProductNotExist(res?.data?.missingIds);
        toast.error('Có sản phẩm không còn trong kho');
      }
    });
  };

  const columns = [
    {
      id: 'checkbox',
      header: ({ table }) => {
        return (
          <CheckBox
            checked={table.getIsAllRowsSelected()}
            onCheckedChange={value => table.toggleAllPageRowsSelected(value)}
            rootClassName="border border-secondary-2"
          />
        );
      },
      cell: ({ row }) => {
        return <CheckBox checked={row.getIsSelected()} onCheckedChange={value => row.toggleSelected(!!value)} />;
      }
    },
    {
      id: 'image',
      header: 'Hình ảnh',
      cell: ({ row }) => {
        const { files } = row?.original || {};
        const { url } = files?.[0] || {};
        return <Image width={120} height={120} src={url} alt="" className="size-[120px] object-cover" />;
      }
    },
    {
      id: 'name',
      header: 'Tên',
      cell: ({ row }) => {
        const { name } = row?.original || {};
        return <div>{name}</div>;
      }
    },
    {
      id: 'price',
      header: 'Giá',
      cell: ({ row }) => {
        const { price } = row?.original || {};
        return (
          <div className="font-semibold">
            {formatMoney(price)}
            <span className="underline">{VND}</span>
          </div>
        );
      }
    },
    {
      id: 'quantity',
      header: 'Số lượng',
      cell: ({ row }) => {
        const { quantity, id } = row.original || {};
        return <Quantity value={quantity} onDecrease={handleQuantity(id)} onIncrease={handleQuantity(id)} />;
      }
    },
    {
      id: 'action',
      accessorKey: 'id',
      header: 'Xoá',
      cell: ({ getValue }) => {
        return (
          <button type="button" onClick={() => handleRemoveCart(getValue())} className="relative">
            <RiDeleteBinLine color="var(--color-primary)" size={24} />
          </button>
        );
      }
    },
    {
      id: 'note',
      accessorKey: 'id',
      // accessorFn: x => x,
      header: 'Chú thích',
      cell: ({ getValue }) => {
        const isNotExist = productNotExist.find(x => x === getValue());

        if (isNotExist) {
          return <div className="font-semibold text-state-error">{'Sản phẩm đã hết hàng'}</div>;
        }

        return null;
      }
    }
  ];

  const table = useTable({
    data: carts,
    columns
  });

  const productActivated = useMemo(
    () => table?.getSelectedRowModel?.()?.rows?.map?.(row => row.original),
    //! NOTE: Fixing it will affect Thanh Toán button
    [table.getSelectedRowModel()]
  );

  const disabled = useMemo(
    () => !productActivated?.length || !!productNotExist?.length,
    [productActivated, productNotExist]
  );

  const onOrderSuccess = () => {
    onHideUserInfo();
  };

  const render = () => {
    if (isCartEmpty) {
      return <CartEmpty />;
    }

    if (isSmallTabletOrMobile) {
      return (
        <CartMobile
          table={table}
          disabled={disabled}
          total={total}
          loading={loadingCheckProductExist}
          onPay={handlePay}
        />
      );
    }

    return (
      <CartDesktop
        table={table}
        disabled={disabled}
        total={total}
        loading={loadingCheckProductExist}
        onPay={handlePay}
      />
    );
  };

  return (
    <>
      <BreadCrumbs items={BREAD_CRUMB_ITEMS} />
      {render()}
      <AddressInfo
        open={visibleUserInfo}
        onCancel={onHideUserInfo}
        onAfterClose={onHideUserInfo}
        productActivated={productActivated}
        onSuccess={onOrderSuccess}
      />
    </>
  );
};

export default Cart;
