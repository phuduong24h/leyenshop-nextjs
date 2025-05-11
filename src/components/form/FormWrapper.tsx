'use client';

import { Children, cloneElement, useId } from 'react';

import { Controller, useFormContext } from 'react-hook-form';
import { IFormWrapper, IHookForm } from 'types';

import { cn } from 'utils';

const FormWrapper = ({
  name,
  title,
  required,
  error,
  description,
  children,
  //
  formWrapperClassName,
  formClassName,
  titleClassName,
  requiredClassName,
  errorClassName,
  descriptionClassName,
  //
  hideErrorMessage,
  row,
  ...props
}: IFormWrapper) => {
  const id = useId();
  const child = Children.only(children);

  const { control } = useFormContext() || {};

  const render = ({ field, fieldState, formState }: IHookForm = {}) => {
    const _error = fieldState?.error?.message || error;

    return (
      <div className={cn('flex flex-col gap-2', row && 'flex-col md:flex-row', formWrapperClassName)}>
        {!!title && (
          <label
            className={cn('shrink-0 whitespace-nowrap', row && 'mt-0 text-base font-semibold md:mt-2', titleClassName)}
            htmlFor={id}>
            {title}
            {required && <span className={cn('ml-1 text-red-500', requiredClassName)}>*</span>}
          </label>
        )}
        <div className={cn('w-full', formClassName)}>
          {cloneElement(child, {
            ...field,
            ...fieldState,
            ...formState,
            ...props,
            error: _error,
            id
          })}
          {!hideErrorMessage && !!_error && (
            <p className={cn('ml-2 mt-1 text-xs text-state-error', errorClassName)}>{_error}</p>
          )}
          {!!description && (
            <p className={cn('ml-2 mt-1 text-xs text-state-error', descriptionClassName)}>{description}</p>
          )}
        </div>
      </div>
    );
  };

  if (!control || !name) {
    return render();
  }

  return (
    <Controller rules={{ required: required ? 'Required!' : false }} name={name} control={control} render={render} />
  );
};

export default FormWrapper;
