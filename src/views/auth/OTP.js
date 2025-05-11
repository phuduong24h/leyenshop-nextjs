import { useState } from 'react';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { FaArrowLeft } from 'react-icons/fa';

import { Button } from 'components/form';
import OTPInput from 'components/form/OTPInput';
import { useVerifyCode } from 'hooks/api';

const OTP = () => {
  const searchParams = useSearchParams();
  const phone = searchParams.get('phone') || '';

  const [otp, setOtp] = useState('');

  const { doRequest, loading } = useVerifyCode();

  const handleVerify = () => {
    doRequest({ phone, code: otp });
  };

  return (
    <div className="grid h-screen place-items-center bg-background-primary">
      <div className="flex w-[366px] flex-col items-center">
        <span className="text-4xl font-semibold">Nhập OTP</span>
        <span className="mt-3 text-text-secondary">Mã xác thực đã được gửi đến {phone}</span>
        <OTPInput className="mt-12" length={6} value={otp} onChange={setOtp} />
        <Button className="btn-primary mt-5 h-11 w-full" label="Tiếp tục" onClick={handleVerify} disabled={loading} />
        <Link href="/dang-nhap" className="mt-12 flex items-center justify-center gap-4">
          <FaArrowLeft />
          <span>Quay lại đăng nhập</span>
        </Link>
      </div>
    </div>
  );
};

export default OTP;
