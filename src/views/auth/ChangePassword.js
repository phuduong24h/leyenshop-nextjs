'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';

import { BreadCrumbs } from 'components/common';
import { Button, TextInput } from 'components/form';
import { useUpdatePassword } from 'hooks/api';
import { Routes } from 'routes';
import { CHANGE_PASSWORD_SCHEMA, changePasswordSchema } from 'utils';

const BREAD_CRUMB = [
  {
    title: 'Trang chủ',
    href: Routes.TRANG_CHU
  },
  {
    title: 'Đổi mật khẩu',
    isActive: true
  }
];

const ChangePassword = () => {
  const { doRequest: doUpdatePassword, loading: loadingUpdatePassword } = useUpdatePassword();

  const form = useForm({
    mode: 'onChange',
    defaultValues: {
      [CHANGE_PASSWORD_SCHEMA.OLD_PASSWORD]: '',
      [CHANGE_PASSWORD_SCHEMA.NEW_PASSWORD]: '',
      [CHANGE_PASSWORD_SCHEMA.CONFIRM_NEW_PASSWORD]: ''
    },
    resolver: yupResolver(changePasswordSchema())
  });

  const onSubmit = data => {
    doUpdatePassword(data, form.reset);
  };

  return (
    <div>
      <div>
        <BreadCrumbs items={BREAD_CRUMB} />
        <FormProvider {...form}>
          <form
            className="flex w-full flex-col items-center justify-center gap-4"
            onSubmit={form.handleSubmit(onSubmit)}>
            <TextInput
              name={CHANGE_PASSWORD_SCHEMA.OLD_PASSWORD}
              title="Mật khẩu cũ"
              placeholder="Nhập mật khẩu cũ"
              isPassword
            />
            <TextInput
              name={CHANGE_PASSWORD_SCHEMA.NEW_PASSWORD}
              title="Mật khẩu mới"
              placeholder="Nhập mật khẩu mới"
              isPassword
            />
            <TextInput
              name={CHANGE_PASSWORD_SCHEMA.CONFIRM_NEW_PASSWORD}
              title="Nhập lại mật khẩu mới"
              placeholder="Nhập lại mật khẩu mới"
              isPassword
            />
            <Button
              label="Cập nhật"
              type="submit"
              className="size-form mt-2"
              disabled={!form.formState.isDirty || !form.formState.isValid}
              loading={loadingUpdatePassword}
            />
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default ChangePassword;
