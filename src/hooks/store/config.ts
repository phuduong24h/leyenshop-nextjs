'use client';

import { omit } from 'lodash';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import { Images } from 'assets';
import { ADDRESS, NAME_APP, PHONE } from 'constants/common';

interface IInfo {
  name: string;
  logo: string;
  phone: string;
  address: string;
  zalo: string;
  zaloLink: string;
  facebook: string;
  facebookLink: string;
  contact: string;
  aboutUs: string;
  shippingPolicy: string;
  returnPolicy: string;
  termOfService: string;
}
interface IConfigStore {
  info: IInfo;
  bannerPinned: object[];
  bannerUnPinned: object[];
  actions: object;
}

const initial: Omit<IConfigStore, 'actions'> = {
  info: {
    name: NAME_APP,
    logo: Images.logo,
    phone: PHONE,
    address: ADDRESS,
    zalo: '',
    zaloLink: '',
    facebook: '',
    facebookLink: '',
    contact: '',
    aboutUs: '',
    shippingPolicy: '',
    returnPolicy: '',
    termOfService: ''
  },
  bannerPinned: [],
  bannerUnPinned: []
};

export const useConfigStore = create<IConfigStore>()(
  devtools(
    persist(
      set => ({
        ...initial,
        actions: {}
      }),
      {
        name: 'config',
        partialize: state => omit(state, 'actions')
      }
    )
  )
);

export const useConfigStoreActions = () => useConfigStore(state => state.actions);
