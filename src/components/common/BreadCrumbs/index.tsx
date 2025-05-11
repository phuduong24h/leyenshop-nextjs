import { Breadcrumb, BreadcrumbProps } from 'antd';
import { ItemType } from 'antd/es/breadcrumb/Breadcrumb';
import { IoIosArrowForward } from 'react-icons/io';

import { cn } from 'utils';

import styles from './styles.module.scss';

interface IBreadCrumbs extends Omit<BreadcrumbProps, 'items'> {
  items: Array<ItemType & { isActive?: boolean }>;
}

const BreadCrumbs = ({ items, ...props }: IBreadCrumbs) => {
  const itemsMapped = items?.map?.(
    item => ({
      ...item,
      className: cn(
        item.isActive ? styles['container__item--active'] : styles['container__item--inactive'],
        item.className
      )
    }),
    [items]
  );

  return (
    <Breadcrumb
      items={itemsMapped}
      separator={
        <div className="flex-center h-full self-center">
          <IoIosArrowForward size={14} color="var(--text-1)" />
        </div>
      }
      className="mb-6 text-base font-medium"
      {...props}
    />
  );
};

export default BreadCrumbs;
