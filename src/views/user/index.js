'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';

import { Icons } from 'assets';
import { BreadCrumbs } from 'components/common';
import { Avatar, Button, TextArea, TextInput } from 'components/form';
import { useUpdateMe, useUser } from 'hooks/api/me';
import { Routes } from 'routes';
import { USER_PROFILE_SCHEMA, userProfileSchema } from 'utils';

const BREAD_CRUMB = [
  {
    title: 'Trang chủ',
    href: Routes.TRANG_CHU
  },
  {
    title: 'Thông tin cá nhân',
    isActive: true
  }
];

const MyProfile = () => {
  const { me } = useUser();

  const { doRequest: doUpdateMe, loading: loadingUpdateMe } = useUpdateMe();

  const form = useForm({
    values: {
      [USER_PROFILE_SCHEMA.FULL_NAME]: me?.fullName || '',
      [USER_PROFILE_SCHEMA.PHONE]: me?.phone || '',
      [USER_PROFILE_SCHEMA.ADDRESS]: me?.address || ''
    },
    resolver: yupResolver(userProfileSchema())
  });

  const onSubmit = data => {
    doUpdateMe(data);
  };

  return (
    <div>
      <BreadCrumbs items={BREAD_CRUMB} />
      <FormProvider {...form}>
        <form className="flex w-full flex-col items-center justify-center gap-6" onSubmit={form.handleSubmit(onSubmit)}>
          <Avatar className="size-[88px]" defaultAvatar={Icons.default_avatar_dark} />
          <div className="flex flex-col gap-5">
            <TextInput name={USER_PROFILE_SCHEMA.FULL_NAME} title="Họ và tên" placeholder="Nhập họ và tên" />
            <TextInput name={USER_PROFILE_SCHEMA.PHONE} title="Số điện thoại" placeholder="Nhập số điện thoại" />
            <TextArea name={USER_PROFILE_SCHEMA.ADDRESS} title="Địa chỉ" placeholder="Nhập địa chỉ" />
            <Button
              label="Cập nhật"
              type="submit"
              loading={loadingUpdateMe}
              disabled={!form.formState.isDirty || !form.formState.isValid}
            />
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default MyProfile;
