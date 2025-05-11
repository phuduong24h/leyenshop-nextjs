'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import Image from 'next/image';
import Link from 'next/link';
import { useForm, FormProvider } from 'react-hook-form';

import { Images } from 'assets';
import { Button, CheckBox, TextInput } from 'components/form';
import { useLogin } from 'hooks/api';
import { Routes } from 'routes';
import { LOGIN_SCHEMA, loginSchema } from 'utils';

const Login = () => {
  const { doLogin, loading } = useLogin();

  const form = useForm({
    resolver: yupResolver(loginSchema()),
    mode: 'onChange',
    defaultValues: {
      [LOGIN_SCHEMA.PHONE]: '',
      [LOGIN_SCHEMA.PASSWORD]: '',
      [LOGIN_SCHEMA.REMEMBER]: false
    }
  });

  const onSubmit = data => doLogin(data);

  return (
    <FormProvider {...form}>
      <div className="relative grid h-screen place-items-center p-4">
        <Image src={Images.bg_login} alt="bg_login" layout="fill" objectFit="cover" quality={100} className="-z-10" />
        <div className="relative flex w-full max-w-[500px] flex-col items-center overflow-hidden rounded-lg p-6">
          <div className="absolute inset-0 -z-10 bg-secondary opacity-50 backdrop-blur-md" />
          <span className="text-4xl font-semibold">Đăng nhập</span>
          <form onSubmit={form.handleSubmit(onSubmit)} className="mt-12 flex w-full flex-col gap-4">
            <TextInput
              placeholder="Nhập số điện thoại"
              name={LOGIN_SCHEMA.PHONE}
              title="Số điện thoại"
              wrapperClassName="w-full"
            />
            <TextInput
              placeholder="Nhập mật khẩu"
              name={LOGIN_SCHEMA.PASSWORD}
              title="Mật Khẩu"
              isPassword
              wrapperClassName="w-full"
            />
            <div className="-mt-2 flex w-full justify-between gap-2">
              <CheckBox id="remember" label="Ghi nhớ mật khẩu" name={LOGIN_SCHEMA.REMEMBER} />
              <Link href={Routes.QUEN_MAT_KHAU} className="hover:underline">
                Quên mật khẩu
              </Link>
            </div>
            <Button
              label="Đăng nhập"
              className="mt-6 w-full"
              disabled={!form.formState.isValid}
              loading={loading}
              type="submit"
            />
          </form>
          <p className="mt-2 text-center text-xs">
            Bạn chưa có tài khoản?
            <Link href={Routes.DANG_KY} className="ml-1 cursor-pointer font-semibold hover:underline">
              Đăng ký
            </Link>
          </p>
        </div>
      </div>
    </FormProvider>
  );
};

export default Login;
