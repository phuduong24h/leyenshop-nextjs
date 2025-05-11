'use client';

import { useState } from 'react';

import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';

import { Button, TextInput } from 'components/form';
import { useForgotPassword } from 'hooks/api';
import { Routes } from 'routes';

const ForgotPassword = () => {
  const [phone, setPhone] = useState('');
  const { doRequest, loading } = useForgotPassword();

  const handleForgotPassword = () => {
    if (phone.trim()) {
      doRequest({ phone });
    }
  };

  return (
    <div className="grid h-screen place-items-center bg-background-primary">
      <div className="flex w-[366px] flex-col gap-4">
        <span className="text-4xl font-semibold">Quên mật khẩu?</span>
        <TextInput
          placeholder="Nhập số điện thoại"
          title="Số điện thoại"
          value={phone}
          onChange={e => setPhone(e.target.value)}
        />
        <Button
          className="btn-primary mt-5 h-11 w-full"
          label="Tiếp tục"
          onClick={handleForgotPassword}
          disabled={loading}
        />
        <Link href={Routes.DANG_NHAP} className="mt-5 flex items-center justify-center gap-4">
          <FaArrowLeft />
          <span>Quay lại đăng nhập</span>
        </Link>
      </div>
    </div>
  );
};

export default ForgotPassword;
