'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Icons } from 'assets';
import { Routes } from 'routes';
import { cn } from 'utils';

const HeaderItem = ({ item, pathname }) => {
  const router = useRouter();

  const { label, href, children, isProduct } = item || {};
  const isHome = href === Routes.TRANG_CHU;
  let isActive = pathname?.startsWith?.(href);

  if (isHome) {
    isActive = pathname?.length <= 1;
  }

  const redirectToProduct = id => () => {
    router.push(`${Routes.SAN_PHAM}?categoryId=${id}`);
  };

  const renderCategory = (category, index) => {
    const { name, id } = category || {};

    return (
      <div
        key={index}
        aria-hidden="true"
        onClick={redirectToProduct(id)}
        className="border-b-[0.5px] border-border-primary bg-primary px-[14px] py-[10px] text-sm text-text-on-primary last:border-b-0 hover:bg-primary-active">
        {name}
      </div>
    );
  };

  if (isProduct) {
    return (
      <li className="group/link relative h-full hover:bg-primary-active">
        <div className="flex-center size-full gap-3 px-2">
          <Image src={Icons.menu} alt="menu" width={14} height={14} />
          <p className="line-clamp-1 text-base font-medium text-text-on-primary">{label}</p>
        </div>
        {!!children?.length && (
          <div className="invisible absolute max-h-[405px] w-full overflow-auto group-hover/link:visible">
            {children.map(renderCategory)}
          </div>
        )}
      </li>
    );
  }

  return (
    <Link
      href={href}
      className={cn('flex-center h-full flex-1 px-2 hover:bg-primary-active', isActive && 'bg-primary-active')}>
      <div className="line-clamp-1 text-base font-medium text-text-on-primary">{label}</div>
    </Link>
  );
};

export default HeaderItem;
