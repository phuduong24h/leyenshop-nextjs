'use client';

import { useState } from 'react';

import * as Collapsible from '@radix-ui/react-collapsible';
import * as Drawer from '@radix-ui/react-dialog';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaPlus } from 'react-icons/fa6';
import { IoClose, IoMenu, IoSearch } from 'react-icons/io5';
import { TiMinus } from 'react-icons/ti';
import { useMediaQuery } from 'react-responsive';

import { TextInput } from 'components/form';
import { useCategoryList } from 'hooks/api';
import { Routes } from 'routes';
import { cn } from 'utils';

const MENU = [
  {
    label: 'Trang chủ',
    href: Routes.TRANG_CHU
  },
  {
    label: 'Sản phẩm',
    href: Routes.SAN_PHAM
  },
  {
    label: 'Danh mục sản phẩm',
    isCollapse: true
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

const DrawerItem = ({ item, categories, onClose }) => {
  const [open, setOpen] = useState(false);

  const { label, href, isCollapse } = item || {};

  const renderCategoryItem = category => {
    const { name, id } = category || {};

    return (
      <Link href={`${Routes.SAN_PHAM}?categoryId=${id}`} onClick={onClose} className="block text-base hover:underline">
        {name}
      </Link>
    );
  };

  if (isCollapse) {
    return (
      <Collapsible.Root open={open} onOpenChange={setOpen} className="flex flex-1 flex-col overflow-hidden">
        <Collapsible.Trigger asChild>
          <div className="flex items-center justify-between gap-2">
            <div className="text-base">{label}</div>
            <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3 }}>
              {open ? <TiMinus /> : <FaPlus />}
            </motion.div>
          </div>
        </Collapsible.Trigger>
        <Collapsible.Content className="mt-1 flex max-h-[280px] flex-col gap-1 overflow-y-auto px-4 transition-all duration-300">
          {categories?.map?.(renderCategoryItem)}
        </Collapsible.Content>
      </Collapsible.Root>
    );
  }

  return (
    <Link href={href} onClick={onClose} className="block text-base hover:underline">
      {label}
    </Link>
  );
};

const DrawerMenu = () => {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');

  const { data: { data: categories } = {} } = useCategoryList();

  useMediaQuery({ query: '(min-width: 640px)' }, undefined, () => {
    if (open) {
      setOpen(false);
    }
  });

  const onClose = () => {
    setOpen(false);
  };

  const onChangeSearch = e => {
    setSearch(e.target.value);
  };

  const onSearch = () => {
    router.push(`${Routes.SAN_PHAM}?search=${search}`);
    onClose();
  };

  const renderItem = (item, index) => {
    const { href } = item || {};

    return (
      <motion.li
        key={href}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ delay: index * 0.1 }}
        className={cn(item?.isCollapse && 'flex flex-1 overflow-hidden')}>
        <DrawerItem item={item} categories={categories} onClose={onClose} />
      </motion.li>
    );
  };

  return (
    <Drawer.Root open={open} onOpenChange={setOpen}>
      <Drawer.Trigger asChild>
        <motion.button
          className="flex size-7 items-center justify-center rounded border border-gray-300 text-white"
          whileTap={{ scale: 0.9 }}>
          <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3 }}>
            {open ? <IoClose size={20} /> : <IoMenu size={20} />}
          </motion.div>
        </motion.button>
      </Drawer.Trigger>

      <AnimatePresence>
        {open && (
          <Drawer.Portal forceMount>
            <Drawer.Overlay asChild>
              <motion.div
                className="fixed inset-0 bg-black/60"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              />
            </Drawer.Overlay>

            <Drawer.Content asChild>
              <motion.div
                initial={{ x: '-100%', opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: '-100%', opacity: 0 }}
                // transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                className="fixed left-0 top-0 flex h-full w-64 flex-col overflow-hidden bg-background-primary pt-12 shadow-lg">
                {/* <Drawer.Close asChild>
                  <button className="absolute right-2 top-2 p-2">✖</button>
                </Drawer.Close> */}
                <div className="p-4">
                  <TextInput
                    placeholder="Tìm sản phẩm"
                    right={<IoSearch size={20} className="text-primary" onClick={onSearch} />}
                    onChange={onChangeSearch}
                  />
                </div>
                <nav className="overflow-hidden border-t border-border-primary p-4">
                  <ul className="flex h-full flex-1 flex-col gap-4 overflow-hidden">{MENU.map(renderItem)}</ul>
                </nav>
              </motion.div>
            </Drawer.Content>
          </Drawer.Portal>
        )}
      </AnimatePresence>
    </Drawer.Root>
  );
};

export default DrawerMenu;
