'use client';

import { HTMLInputTypeAttribute, InputHTMLAttributes, useState } from 'react';

import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { IFormWrapper, IHookForm } from 'types';

import { cn } from 'utils';

import FormWrapper from './FormWrapper';

interface ITextInput extends Omit<InputHTMLAttributes<HTMLInputElement>, 'name'>, Omit<IFormWrapper, 'children'> {
  left?: React.ReactNode;
  right?: React.ReactNode;
  wrapperClassName?: string;
  isPassword?: boolean;
  type?: HTMLInputTypeAttribute;
}

const TextInputBase = ({
  left,
  right,
  isPassword,
  disabled,
  error,
  type,
  //
  wrapperClassName,
  className,
  //
  ...props
}: ITextInput & IHookForm) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={cn('size-form relative flex items-center gap-1 ease-linear', wrapperClassName)}>
      {!!left && <div className="absolute inset-y-0 left-0 pl-3">{left}</div>}
      <input
        type={isPassword && !showPassword ? 'password' : type}
        className={cn(
          'block size-full flex-1 rounded border border-border-primary px-3 text-base text-text-primary outline-none',
          'placeholder:text-text-secondary',
          'disabled:bg-background-disable disabled:placeholder:text-text-disable disabled:hover:cursor-not-allowed',
          error && 'border-state-error',
          left && 'pl-9',
          right && 'pr-9',
          className
        )}
        autoCapitalize="off"
        spellCheck="false"
        autoComplete="off"
        autoCorrect="off"
        disabled={disabled}
        {...props}
      />
      {isPassword && (
        <button
          type="button"
          className="absolute right-3 text-gray-500 hover:text-primary"
          onClick={() => setShowPassword(prev => !prev)}>
          {showPassword ? <AiOutlineEye size={20} /> : <AiOutlineEyeInvisible size={20} />}
        </button>
      )}
      {!!right && <div className="absolute inset-y-0 right-0 flex items-center justify-center pr-3">{right}</div>}
    </div>
  );
};

const TextInput = (props: ITextInput) => {
  return (
    <FormWrapper {...props}>
      <TextInputBase {...props} />
    </FormWrapper>
  );
};

TextInput.Base = TextInputBase;
export default TextInput;
