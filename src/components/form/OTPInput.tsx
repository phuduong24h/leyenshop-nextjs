'use client';

import React, { useState, useEffect } from 'react';

import { v4 as uuidv4 } from 'uuid';

type OTPInputProps = {
  length?: number;
  value?: number;
  onChange?: (otp: string) => void;
  className?: string;
};

const OTPInput: React.FC<OTPInputProps> = ({ length = 6, value = '', onChange, className }) => {
  const [otp, setOtp] = useState<string[]>(Array(length).fill(''));
  const [keys] = useState<string[]>(Array.from({ length }, () => uuidv4()));

  useEffect(() => {
    const otpArray = value ? String(value).slice(0, length).split('') : [];
    setOtp([...otpArray, ...Array(length - otpArray.length).fill('')]);
  }, [value, length]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const inputValue = e.target.value;
    if (/^\d$/.test(inputValue)) {
      const newOtp = [...otp];
      newOtp[index] = inputValue;
      setOtp(newOtp);
      onChange?.(newOtp.join(''));

      if (index < length - 1) document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace') {
      const newOtp = [...otp];
      if (otp[index] === '' && index > 0) {
        newOtp[index - 1] = '';
        document.getElementById(`otp-${index - 1}`)?.focus();
      } else {
        newOtp[index] = '';
      }
      setOtp(newOtp);
      onChange?.(newOtp.join(''));
    }
  };

  return (
    <div className={`flex space-x-2 ${className ?? ''}`}>
      {otp.map((digit, index) => (
        <input
          key={keys[index]}
          id={`otp-${index}`}
          type="text"
          maxLength={1}
          value={digit}
          onChange={e => handleChange(e, index)}
          onKeyDown={e => handleKeyDown(e, index)}
          className={`size-12 rounded border text-center text-xl focus:outline-none ${
            digit ? 'border-border-primary' : 'border-gray-300'
          }`}
        />
      ))}
    </div>
  );
};

export default OTPInput;
