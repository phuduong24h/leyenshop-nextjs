'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import Image from 'next/image';
import Link from 'next/link';
import { useForm, FormProvider } from 'react-hook-form';

import { Images } from 'assets';
import { Button, TextArea, TextInput } from 'components/form';
import { useRegister } from 'hooks/api';
import { Routes } from 'routes';
import { REGISTER_SCHEMA, registerSchema } from 'utils';

const Register = () => {
  const { doRequest, loading } = useRegister();

  const methods = useForm({
    resolver: yupResolver(registerSchema()),
    mode: 'onChange',
    defaultValues: {
      [REGISTER_SCHEMA.FULL_NAME]: '',
      [REGISTER_SCHEMA.PHONE]: '',
      [REGISTER_SCHEMA.ADDRESS]: '',
      [REGISTER_SCHEMA.PASSWORD]: '',
      [REGISTER_SCHEMA.CONFIRM_PASSWORD]: ''
    }
  });

  const {
    handleSubmit,
    formState: { isValid }
  } = methods;

  const onSubmit = data => doRequest(data);

  return (
    <FormProvider {...methods}>
      <div className="relative grid min-h-screen place-items-center">
        <Image src={Images.bg_login} alt="bg_login" layout="fill" objectFit="cover" quality={100} className="-z-10" />
        <div className="relative mx-3 flex w-full max-w-[90%] flex-col items-center rounded-lg p-6 sm:mx-4 sm:max-w-[400px] sm:p-8 md:max-w-[500px] md:p-12">
          <div className="absolute inset-0 -z-10 rounded-lg bg-secondary opacity-50 backdrop-blur-md" />
          <span className="text-4xl font-semibold">Đăng ký</span>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-12 flex w-full flex-col gap-4">
            <TextInput
              placeholder="Họ và Tên"
              name={REGISTER_SCHEMA.FULL_NAME}
              title="Họ và tên"
              wrapperClassName="w-full"
            />
            <TextInput
              placeholder="Số điện thoại"
              name={REGISTER_SCHEMA.PHONE}
              title="Số điện thoại"
              wrapperClassName="w-full"
            />
            <TextArea
              placeholder="Địa chỉ của bạn?"
              name={REGISTER_SCHEMA.ADDRESS}
              title="Địa chỉ"
              className="w-full"
            />
            <TextInput
              placeholder="Mật khẩu"
              name={REGISTER_SCHEMA.PASSWORD}
              title="Mật khẩu"
              isPassword
              wrapperClassName="w-full"
            />
            <TextInput
              placeholder="Nhập lại mật khẩu"
              name={REGISTER_SCHEMA.CONFIRM_PASSWORD}
              title="Nhập lại mật khẩu"
              isPassword
              wrapperClassName="w-full"
            />
            <Button
              label="Đăng ký"
              className="mt-5 h-11 w-full"
              disabled={!isValid}
              isLoading={loading}
              type="submit"
            />
          </form>
          <p className="mt-3 text-center text-xs">
            Bạn đã có tài khoản?
            <Link href={Routes.DANG_NHAP} className="ml-1 cursor-pointer font-semibold text-primary hover:underline">
              Đăng nhập
            </Link>
          </p>
        </div>
      </div>
    </FormProvider>
  );
};

export default Register;
