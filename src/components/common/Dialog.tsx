import * as React from 'react';

import * as RadixDialog from '@radix-ui/react-dialog';
import { IoClose } from 'react-icons/io5';

import { Button } from 'components/form';
import { cn } from 'utils';

interface IDialog extends RadixDialog.DialogProps {
  title: string;
  children: React.ReactNode;
  submitText: string;
  cancelText: string;
  loading: boolean;
  onSubmit: () => void;
  hideFooter: boolean;
  contentClassName?: string;
}

const Dialog = ({
  children,
  title,
  submitText,
  cancelText,
  loading,
  onSubmit,
  hideFooter,
  contentClassName,
  ...props
}: IDialog) => {
  return (
    <RadixDialog.Root {...props}>
      <RadixDialog.Portal>
        <RadixDialog.Overlay
          className={cn(
            'fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-black/50 p-8 backdrop-blur-sm',
            'data-[state=open]:animate-in data-[state=closed]:animate-out',
            'data-[state=open]:fade-in data-[state=closed]:fade-out'
          )}>
          <RadixDialog.Content
            className={cn(
              'shadow-drop relative flex flex-col rounded bg-background-primary duration-200',
              'container-max-responsive max-h-[calc(100vh-64px)]',
              'data-[state=open]:animate-in data-[state=closed]:animate-out',
              'data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95',
              'data-[state=open]:slide-in-from-top-[48%] data-[state=closed]:slide-out-to-top-[48%]'
            )}>
            <div className="flex items-center justify-center border-b border-b-border-primary px-6 py-4">
              <RadixDialog.Title className="text-xl font-bold leading-none">{title}</RadixDialog.Title>
              <RadixDialog.Close className="absolute right-5 p-1 disabled:pointer-events-none">
                <IoClose size={16} />
                <span className="sr-only">Close</span>
              </RadixDialog.Close>
            </div>
            <form onSubmit={onSubmit} className="flex flex-1 flex-col overflow-hidden">
              <div className={cn('flex-1 overflow-auto p-6 md:px-[90px]', contentClassName)}>{children}</div>
              {!hideFooter && (
                <div className="flex justify-end gap-2 border-t border-t-border-primary px-6 py-2.5">
                  <RadixDialog.Close asChild>
                    <Button variant="outline" label={cancelText} />
                  </RadixDialog.Close>
                  <Button label={submitText} loading={loading} type="submit" />
                </div>
              )}
            </form>
          </RadixDialog.Content>
        </RadixDialog.Overlay>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  );
};

export default Dialog;
