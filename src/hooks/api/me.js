import { useMemo } from 'react';

import { useSession } from 'next-auth/react';
import { toast } from 'sonner';

import { API } from 'constants/common';
import { useBaseMutation } from 'hooks/base';

export const useUser = () => {
  const { data: session } = useSession();
  const me = useMemo(() => session?.user, [session]);

  return {
    me,
    isLogged: !!me
  };
};

export const useGetMe = () => {
  const { data: session, update } = useSession();

  return useBaseMutation({
    uri: API.USER.ME,
    method: 'GET',
    onSuccess: res => {
      update?.({
        ...session,
        user: {
          ...session.user,
          ...(res?.data || {})
        }
      });
    }
  });
};

export const useUpdateMe = () => {
  const { data: session, update } = useSession();

  return useBaseMutation({
    uri: API.USER.ME,
    method: 'PUT',
    onSuccess: res => {
      toast.success('Cập nhật thông tin thành công');
      update?.({
        ...session,
        user: {
          ...session.user,
          ...(res?.data || {})
        }
      });
    }
  });
};

export const useUpdatePassword = () =>
  useBaseMutation({
    uri: API.USER.CHANGE_PASSWORD,
    method: 'PUT',
    onSuccess: () => {
      toast.success('Cập nhật mật khẩu thành công');
    }
  });
