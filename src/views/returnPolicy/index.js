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
    title: 'Chính sách đổi trả',
    isActive: true
  }
];

const ReturnPolicy = () => {
  const info = useConfigStore(state => state.info);

  return (
    <div>
      <BreadCrumbs items={BREAD_CRUMB_ITEMS} />
      <div dangerouslySetInnerHTML={{ __html: info.returnPolicy }} />
    </div>
  );
};

export default ReturnPolicy;
