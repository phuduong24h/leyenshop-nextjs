'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';
import { FaArrowLeft } from 'react-icons/fa';

import { Button, TextInput } from 'components/form';
import { useResetPassword } from 'hooks/api';
import { Routes } from 'routes';
import { UPDATE_PASSWORD_SCHEMA, updatePasswordSchema } from 'utils';

const UpdatePassword = () => {
  const searchParams = useSearchParams();
  const phone = searchParams.get('phone') || '';
  const code = searchParams.get('otp') || '';

  const { doRequest, loading } = useResetPassword();

  const form = useForm({
    defaultValues: {
      [UPDATE_PASSWORD_SCHEMA.NEW_PASSWORD]: '',
      [UPDATE_PASSWORD_SCHEMA.CONFIRM_PASSWORD]: ''
    },
    resolver: yupResolver(updatePasswordSchema()),
    mode: 'onBlur'
  });

  const onSubmit = ({ newPassword }) => {
    doRequest({ phone, newPassword, code });
  };

  return (
    <div className="flex h-screen items-center justify-center bg-background-primary px-4">
      <div className="grid w-full min-w-[360px] max-w-md items-center gap-12 text-center">
        <span className="text-4xl font-semibold">Mật khẩu mới</span>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <TextInput title="Mật khẩu" name={UPDATE_PASSWORD_SCHEMA.NEW_PASSWORD} isPassword />
            <TextInput
              title="Nhập lại mật khẩu"
              formWrapperClassName="mt-5"
              isPassword
              name={UPDATE_PASSWORD_SCHEMA.CONFIRM_PASSWORD}
            />
            <Button label="Cập nhật" className="mt-6 h-11 w-full" type="submit" disabled={loading} />
          </form>
        </FormProvider>
        <Link href={Routes.DANG_NHAP} className="mt-12 flex items-center justify-center gap-4">
          <FaArrowLeft />
          <span>Quay lại đăng nhập</span>
        </Link>
      </div>
    </div>
  );
};

export default UpdatePassword;
