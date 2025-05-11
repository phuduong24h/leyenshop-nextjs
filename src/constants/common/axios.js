import axios from 'axios';
import { getSession, signOut } from 'next-auth/react';
import { v4 as uuidv4 } from 'uuid';

import { API_ROOT, TIME_OUT } from 'constants/common';
import { Routes } from 'routes';

export const instance = axios.create({
  baseURL: API_ROOT,
  timeout: TIME_OUT,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const redirectIfUnAuthorized = async () => {
  if (typeof window !== 'undefined') {
    // Clear token
    const session = await getSession();
    if (session) {
      await signOut({
        callbackUrl: Routes.TRANG_CHU,
        redirect: true
      });
    }
  }
};

export function setDefaultHeaders({ headers, _instance = instance } = {}) {
  Object.keys(headers).forEach(key => {
    _instance.defaults.headers.common[key] = headers[key];
  });
}

instance.interceptors.request.use(async config => {
  config.headers.requestId = uuidv4();
  const session = await getSession();

  if (session?.user?.token) {
    config.headers.Authorization = `Bearer ${session?.user?.token}`;
  }

  return config;
});

instance.interceptors.response.use(
  response => response,
  error => Promise.reject(error)
);
