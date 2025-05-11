'use client';

import Link from 'next/link';

import { Avatar, Dropdown } from 'components/form';
import { useLogout, useUser } from 'hooks/api';
import { useBreakpoints } from 'hooks/base';
import { Routes } from 'routes';

const MENU = [
  {
    label: 'Tài khoản',
    href: Routes.THONG_TIN_CA_NHAN
  },
  {
    label: 'Đơn hàng',
    href: Routes.DON_HANG
  },
  {
    label: 'Đổi mật khẩu',
    href: Routes.DOI_MAT_KHAU
  },
  {
    label: 'Đăng xuất',
    isLogout: true
  }
];

const UserMenu = () => {
  const { isLogged, me } = useUser();
  const { doLogout } = useLogout();
  const { isSmallTabletOrMobile } = useBreakpoints();

  const renderMenuItem = item => {
    const { label, href, isLogout } = item || {};
    const className = 'block px-3.5 py-1.5 hover:underline';

    if (isLogout) {
      return (
        <button key={label} type="button" className={className} onClick={doLogout}>
          {label}
        </button>
      );
    }

    return (
      <Link href={href} key={label} className={className}>
        {label}
      </Link>
    );
  };

  if (!isLogged) {
    return (
      <Link href={Routes.DANG_NHAP} className="text-text-on-primary hover:underline">
        Đăng nhập
      </Link>
    );
  }

  return (
    <Dropdown content={<div>{MENU.map(renderMenuItem)}</div>}>
      <div className="flex items-center gap-2">
        <Avatar />
        {!isSmallTabletOrMobile && <span className="text-text-on-primary">{me?.fullName}</span>}
      </div>
    </Dropdown>
  );
};

export default UserMenu;
