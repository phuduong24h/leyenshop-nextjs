'use client';

import { InputHTMLAttributes } from 'react';

import { IFormWrapper, IHookForm } from 'types';

import { cn } from 'utils';

import FormWrapper from './FormWrapper';

interface ITextArea extends Omit<InputHTMLAttributes<HTMLTextAreaElement>, 'name'>, Omit<IFormWrapper, 'children'> {}

const TextAreaBase = ({ className, error, ...props }: ITextArea & IHookForm) => {
  return (
    <textarea
      className={cn(
        'size-form h-full rounded border border-border-primary px-3 py-2 outline-none ease-linear',
        'placeholder:text-text-4',
        'disabled:bg-background-disable disabled:placeholder:text-text-disable disabled:hover:cursor-not-allowed',
        error && 'border border-state-error',
        className
      )}
      autoCapitalize="off"
      spellCheck="false"
      autoComplete="off"
      autoCorrect="off"
      rows={3}
      {...props}
    />
  );
};

const TextArea = (props: ITextArea) => {
  return (
    <FormWrapper {...props}>
      <TextAreaBase {...props} />
    </FormWrapper>
  );
};

TextArea.Base = TextAreaBase;
export default TextArea;
