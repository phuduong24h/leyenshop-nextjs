'use client';

import { useState } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';
import { signIn, signOut } from 'next-auth/react';
import { toast } from 'sonner';

import { API } from 'constants/common';
import { useBaseMutation } from 'hooks/base';
import { logger } from 'hooks/services';
import { Routes } from 'routes';
import { showCommonError } from 'utils';

export const useLogin = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const doLogin = async ({ provider = 'credentials', ...data }, { onSuccess } = {}) => {
    setLoading(true);

    try {
      const callbackUrl = searchParams.get('callbackUrl');

      const result = await signIn(provider, {
        ...data,
        redirect: !!callbackUrl,
        callbackUrl: callbackUrl || undefined
      });

      if (result?.ok) {
        toast.success('Đăng nhập thành công!');
        onSuccess?.();
        if (!callbackUrl) {
          router.replace(Routes.TRANG_CHU);
        }
      } else {
        showCommonError(JSON.parse(result?.error || '{}'));
      }
    } catch (error) {
      showCommonError(error || {});
    } finally {
      setLoading(false);
    }
  };

  return {
    doLogin,
    loading
  };
};

export const useLogout = () => {
  const doSignOut = async () => {
    try {
      signOut({ redirect: false });
    } catch (err) {
      logger.error(err);
    }
  };

  return { doLogout: doSignOut };
};

export const useForgotPassword = () => {
  const router = useRouter();

  return useBaseMutation({
    uri: API.AUTH.FORGOT_PASSWORD,
    method: 'POST',
    onSuccess: res => {
      router.push(`${Routes.OTP}?phone=${res?.data?.phone}`);
    }
  });
};

export const useVerifyCode = () => {
  const router = useRouter();

  return useBaseMutation({
    uri: API.AUTH.VERIFY_CODE,
    onSuccess: res => {
      router.push(`${Routes.RESET_PASSWORD}?phone=${res.data.phone}&otp=${res.data.code}`);
    }
  });
};

export const useResetPassword = () => {
  const router = useRouter();
  return useBaseMutation({
    uri: API.AUTH.RESET_PASSWORD,
    method: 'POST',
    onSuccess: () => {
      toast.success('Đổi mật khẩu thành công!');
      router.push(Routes.DANG_NHAP);
    }
  });
};
export const useRegister = () => {
  const router = useRouter();

  return useBaseMutation({
    uri: API.AUTH.REGISTER,
    method: 'POST',
    onSuccess: async () => {
      toast.success('Đăng ký thành công!');
      router.replace(Routes.DANG_NHAP);
    },
    onError: error => {
      toast.error(error?.message || 'Đăng ký thất bại! Vui lòng thử lại.');
    }
  });
};
