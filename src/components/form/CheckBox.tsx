'use client';

import React, { useCallback, useMemo } from 'react';

import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { useFormContext } from 'react-hook-form';
import { ImCheckboxChecked } from 'react-icons/im';
import { IFormWrapper, IHookForm } from 'types';

import { cn } from 'utils';

import FormWrapper from './FormWrapper';

interface ICheckBox extends CheckboxPrimitive.CheckboxProps, Omit<IFormWrapper, 'children'> {
  name?: string;
  label: string;
  rootClassName?: string;
}

const CheckBoxBase = ({ name, label, checked, onCheckedChange, rootClassName, ...props }: ICheckBox & IHookForm) => {
  const { watch, setValue } = useFormContext() || {};
  const isChecked = watch?.(name!);

  const checkedValue = useMemo(() => (name ? isChecked : checked), [checked, isChecked, name]);

  const onCheckedChangeValue = useCallback(
    (value: boolean) => {
      if (name) {
        setValue(name, value);
      } else {
        onCheckedChange?.(value);
      }
    },
    [name, setValue, onCheckedChange]
  );

  return (
    <div className="flex items-center gap-2">
      <CheckboxPrimitive.Root
        checked={checkedValue}
        onCheckedChange={onCheckedChangeValue}
        className={cn(
          'relative flex h-6 w-6 items-center justify-center overflow-hidden rounded bg-white text-gray-500 transition-all',
          checkedValue ? 'bg-primary text-white' : 'border border-gray-500',
          rootClassName
        )}
        {...props}>
        <CheckboxPrimitive.Indicator
          className={cn(
            'absolute inset-0 flex items-center justify-center transition-all',
            checkedValue ? 'opacity-100' : 'opacity-0'
          )}>
          <ImCheckboxChecked className="size-full bg-white text-text-primary opacity-100" />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
      {!!label && (
        <label htmlFor={name} className="cursor-pointer text-sm">
          {label}
        </label>
      )}
    </div>
  );
};

const CheckBox = (props: ICheckBox) => {
  return (
    <FormWrapper {...props}>
      <CheckBoxBase {...props} />
    </FormWrapper>
  );
};

export default CheckBox;
