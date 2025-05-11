'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { Icons } from 'assets';
import { Button } from 'components/form';
import { Routes } from 'routes';

const CartEmpty = () => {
  const router = useRouter();

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-2 pb-10 pt-8">
      <Image src={Icons.cart_empty} alt="" width={120} height={120} />
      <p className="text-center text-lg font-semibold">{'"HÔNG" có gì trong giỏ hàng hết nè!🤗'}</p>
      <p className="text-normal text-center font-bold">Lướt Lê Yên Shop, lựa hàng ngay đi</p>
      <Button label="Mua sắm ngay!" variant="outline" onClick={() => router.push(Routes.SAN_PHAM)} />
    </div>
  );
};

export default CartEmpty;
