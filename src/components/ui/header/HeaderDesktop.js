'use client';

import { useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { IoSearch } from 'react-icons/io5';

import { Icons, Images } from 'assets';
import { TextInput } from 'components/form';
import { HeaderItem, UserMenu } from 'components/ui';
import { PHONE, usePathname } from 'constants/common';
import { useCategoryList } from 'hooks/api';
import { useCartStore, useConfigStore } from 'hooks/store';
import { Routes } from 'routes';

const HeaderDesktop = () => {
  const router = useRouter();
  const pathname = usePathname();

  const info = useConfigStore(state => state.info);
  const carts = useCartStore(state => state.carts);

  const { data: { data: categories } = {} } = useCategoryList();

  const [search, setSearch] = useState('');

  const LINKS = [
    {
      label: 'Danh mục sản phẩm',
      isProduct: true,
      children: categories
    },
    {
      label: 'Trang chủ',
      href: Routes.TRANG_CHU
    },
    {
      label: 'Sản phẩm',
      href: Routes.SAN_PHAM
    },
    {
      label: 'Giỏ hàng',
      href: Routes.GIO_HANG
    },
    {
      label: 'Liên hệ',
      href: Routes.LIEN_HE
    }
  ];

  const HEADERS = [
    {
      icon: Icons.delivery,
      label: 'Giao hàng hoả tốc'
    },
    {
      icon: Icons.advise,
      label: 'Tư vấn nhiệt tình'
    },
    {
      icon: Icons.unionpay,
      label: 'Thanh toán khi nhận hàng'
    },
    {
      icon: Icons.cart,
      label: `Giỏ hàng (${carts?.length || 0})`,
      href: Routes.GIO_HANG
    }
  ];

  const onChangeSearch = e => {
    setSearch(e.target.value);
  };

  const onSearch = () => {
    router.push(`${Routes.SAN_PHAM}?search=${search}`);
  };

  const renderLink = (item, index) => <HeaderItem key={index} item={item} pathname={pathname} />;

  const renderHeaderItem = item => {
    const { label, icon, href } = item || {};

    if (href) {
      return (
        <Link href={href} className="flex items-center hover:underline">
          <Image src={icon} alt="icon" sizes="100vw" width={0} height={0} className="size-10 object-contain" />
          <p className="ml-3 font-bold lg:text-base">{label}</p>
        </Link>
      );
    }

    return (
      <div key={icon} className="flex items-center">
        <Image src={icon} alt="icon" sizes="100vw" width={0} height={0} className="size-10 object-contain" />
        <p className="ml-3 font-bold lg:text-base">{label}</p>
      </div>
    );
  };

  return (
    <>
      <div className="bg-primary">
        <div className="container-responsive flex h-12 items-center justify-between">
          <span className="text-text-on-primary">{`Hotline: ${info?.phone}`}</span>
          <UserMenu />
        </div>
      </div>

      <div className="relative bg-background-primary">
        <div
          className="absolute inset-0 bg-repeat opacity-50"
          style={{ backgroundImage: `url(${Images.header_item})` }}
        />
        <div className="container-responsive relative z-10 flex w-full items-center py-2">
          <Image src={Images.logo} alt="logo" className="object-contain" width={198} height={86} />
          <div className="flex w-full items-center justify-around gap-2">{HEADERS.map(renderHeaderItem)}</div>
        </div>
      </div>

      <nav className="sticky top-0 z-20 bg-primary">
        <div className="container-responsive flex h-full">
          <ul className="relative mr-5 flex h-full flex-1 items-center justify-between gap-1">
            {LINKS.map(renderLink)}
          </ul>
          <TextInput
            value={search}
            onChange={onChangeSearch}
            placeholder="Bạn cần mua gì?"
            formWrapperClassName="shrink max-w-[180px] my-2"
            className="bg-background-primary text-sm placeholder:text-text-primary"
            wrapperClassName="h-[30px]"
            right={<IoSearch size={20} color="var(--color-primary)" onClick={onSearch} />}
          />
        </div>
      </nav>
    </>
  );
};

export default HeaderDesktop;
