/* eslint-disable react/no-unstable-nested-components */

'use client';

import { A } from 'components/ui/test';

const Abc = () => {
  return (
    <div>
      <A a={'123'} />
    </div>
  );
};

export default Abc;
