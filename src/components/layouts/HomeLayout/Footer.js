/* eslint-disable no-nested-ternary */

'use client';

import Link from 'next/link';

import { NAME_APP } from 'constants/common';
import { useConfigStore } from 'hooks/store';
import { Routes } from 'routes';

const Footer = () => {
  const info = useConfigStore(state => state.info);

  const DATA = [
    {
      title: 'Giới thiệu',
      text: (
        <p>
          <b>{NAME_APP}</b>
          {` là trang web cá nhân. Tại đây khách hàng có thể mua các vật dụng cần thiết như quần áo, giày dép, đồ ăn vặt và mỹ phẩm. Giá siêu hời, khuyến mãi cực sốc.`}
        </p>
      )
    },
    {
      title: 'Hỗ trợ khách hàng',
      links: [
        { title: 'Chính sách vận chuyển', href: Routes.CHINH_SACH_VAN_CHUYEN },
        { title: 'Chính sách đổi trả', href: Routes.CHINH_SACH_DOI_TRA },
        { title: 'Điều khoản dịch vụ', href: Routes.DIEU_KHOAN_DICH_VU }
      ]
    },
    {
      title: 'Liên hệ',
      links: [
        { title: `Địa chỉ ${info?.address}` },
        { title: `Hotline: ${info?.phone}` },
        { title: `Facebook: ${info?.facebook}`, href: info?.facebookLink, target: '_blank' },
        { title: `Zalo: ${info?.zalo}`, href: info?.zaloLink, target: '_blank' }
      ]
    }
  ];

  const renderLink = link => {
    const { href, title, target } = link || {};
    return (
      <li key={title}>
        {href ? (
          <Link href={href} target={target} className="text-xs hover:underline">
            {title}
          </Link>
        ) : (
          title
        )}
      </li>
    );
  };

  const renderItem = (item, index) => {
    const { title, text, links } = item || {};
    return (
      <div key={index} className="flex lg:justify-center">
        <div className="text-text-on-primary">
          <div className="mb-4">
            <p className="font-bold">{title}</p>
            <div className="h-px w-[30px]" />
          </div>
          {text ? (
            <div className="whitespace-pre-wrap text-xs">{text}</div>
          ) : links?.length ? (
            <ul className="ml-3 flex list-disc flex-col whitespace-pre-wrap text-xs">{links?.map?.(renderLink)}</ul>
          ) : null}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-primary">
      <footer className="container-responsive grid grid-cols-1 content-between justify-between gap-10 py-5 sm:grid-cols-2 lg:grid-cols-3">
        {DATA.map(renderItem)}
      </footer>
    </div>
  );
};

export default Footer;
