'use client';

import { NotFound as NotFoundComponent } from 'components/common';
import { HomeLayout } from 'components/layouts';

export default function NotFound() {
  return (
    <HomeLayout>
      <NotFoundComponent title={'Back to home'} href={'/'} />
    </HomeLayout>
  );
}
