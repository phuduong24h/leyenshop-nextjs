'use client';

import { omit } from 'lodash';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface ICart {
  id: string;
  name: string;
  image: string;
  unitPrice: number;
  quantity: number;
  colorId?: number;
  sizeId?: number;
}

interface ICartStore {
  carts: ICart[];
  actions: {
    addCart: (cart: ICart) => void;
    removeCart: (id: string) => void;
    removeCartWithIds: (ids: string[]) => void;
    increaseCart: (id: string) => void;
    decreaseCart: (id: string) => void;
    clearCart: () => void;
  };
}

export const useCartStore = create<ICartStore>()(
  devtools(
    persist(
      set => ({
        carts: [],
        actions: {
          addCart: value => {
            set(state => {
              const isExisted = state.carts.some(x => x?.id === value?.id);
              if (isExisted) {
                const index = state.carts.findIndex(x => x?.id === value?.id);
                const newCarts = [...state.carts];
                newCarts[index].quantity += value.quantity || 1;

                return { ...state, carts: newCarts };
              }
              return { ...state, carts: state.carts.concat([value]) };
            });
          },
          removeCart: id => {
            set(state => ({ carts: state.carts.filter(x => x?.id !== id) }));
          },
          removeCartWithIds: ids => {
            set(state => ({ carts: state.carts.filter(x => !ids.includes(x?.id)) }));
          },
          increaseCart: id => {
            set(state => {
              const index = state.carts.findIndex(x => x?.id === id);
              const newCarts = [...state.carts];
              newCarts[index].quantity += 1;
              return { ...state, carts: newCarts };
            });
          },
          decreaseCart: id => {
            set(state => {
              const index = state.carts.findIndex(x => x?.id === id);
              const newCarts = [...state.carts];
              if (newCarts[index].quantity > 1) {
                newCarts[index].quantity -= 1;
              }
              return { ...state, carts: newCarts };
            });
          },
          clearCart: () => {
            set({ carts: [] });
          }
        }
      }),
      {
        name: 'cart',
        partialize: state => omit(state, 'actions')
      }
    )
  )
);

export const useCartStoreActions = () => useCartStore(state => state.actions);
