export const API_ROOT = process.env.NEXT_PUBLIC_HOST;
export const ROOT_URL = process.env.NEXT_PUBLIC_WEB_URL;
export const TIME_OUT = 10000;

export const API = {
  AUTH: {
    LOGIN: 'auth/login',
    REGISTER: 'auth/register',
    LOGOUT: 'auth/logout',
    FORGOT_PASSWORD: 'auth/forgot-password',
    RESET_PASSWORD: 'auth/reset-password',
    UPDATE_PASSWORD: 'auth/update-password',
    VERIFY_CODE: '/auth/verify-code'
  },
  CONFIG: {
    CONFIG: 'config'
  },
  USER: {
    ME: 'me',
    CHANGE_PASSWORD: 'me/change-password'
  },
  CATEGORY: {
    LIST: 'category'
  },
  CATEGORY_FEATURED: {
    LIST: 'category-featured'
  },
  PRODUCT: {
    LIST: 'product',
    DETAIL: 'product/:id'
  },
  ORDER: {
    LIST: 'order',
    NEW: 'order',
    DETAIL: 'order/:id',
    CHECK_PRODUCT_EXIST: 'order/check-product-exist'
  },
  TEST: {
    LIST: 'test'
  }
};
