'use client';

import { BreadCrumbs } from 'components/common';
import { useConfigStore } from 'hooks/store';
import { Routes } from 'routes';

const BREAD_CRUMB_ITEMS = [
  {
    title: 'Trang chủ',
    href: Routes.TRANG_CHU
  },
  {
    title: 'Liên hệ',
    isActive: true
  }
];

const Contact = () => {
  const info = useConfigStore(state => state.info);

  return (
    <div>
      <BreadCrumbs items={BREAD_CRUMB_ITEMS} />
      <div dangerouslySetInnerHTML={{ __html: info?.contact }} />
    </div>
  );
};

export default Contact;
