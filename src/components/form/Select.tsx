'use client';

import * as RadixScrollArea from '@radix-ui/react-scroll-area';
import * as RadixSelect from '@radix-ui/react-select';
import { IoIosArrowDown } from 'react-icons/io';
import { IFormWrapper, IHookForm } from 'types';

import { cn } from 'utils';

import FormWrapper from './FormWrapper';

export interface ISelectItem {
  label: string;
  value: string | number;
}

export interface ISelect extends Omit<RadixSelect.SelectProps, 'name'>, Omit<IFormWrapper, 'children'> {
  placeholder?: string;
  placeholderClassName?: string;
  options: { label: string; value: string | number }[];
  onChange?: (value: string) => void;
  value: string;
  itemClassName?: string;
  triggerClassName?: string;
  iconClassName?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

const SelectBase = ({
  value,
  onChange,
  disabled,
  //
  icon,
  placeholder,
  options,
  //
  placeholderClassName,
  itemClassName,
  triggerClassName,
  iconClassName,
  ...props
}: ISelect & IHookForm) => {
  const renderItem = (item: ISelectItem) => {
    const { label, value: valueItem } = item || {};
    return (
      <RadixSelect.Item
        className={cn(
          'flex h-[40px] max-w-[calc(100vw-32px)] cursor-pointer items-center px-3.5 text-text-on-primary',
          'hover:rounded-none hover:border-none hover:bg-primary-active',
          'focus-visible:rounded-none focus-visible:border-none',
          itemClassName
        )}
        value={valueItem?.toString?.()}>
        <RadixSelect.ItemText>{label}</RadixSelect.ItemText>
      </RadixSelect.Item>
    );
  };

  return (
    <RadixSelect.Root onValueChange={onChange} disabled={disabled} value={value} {...props}>
      <RadixSelect.Trigger
        className={cn(
          'select-trigger flex h-[40px] w-full flex-row items-center justify-between rounded-[4px] bg-primary px-3.5 py-1.5 text-text-on-primary focus:outline-none',
          'disabled:shadow-none',
          'size-form',
          triggerClassName
        )}>
        <RadixSelect.Value className={cn('text-text-2', placeholderClassName)} placeholder={placeholder} />
        {icon || <IoIosArrowDown size={14} className={cn('text-text-2', iconClassName)} />}
      </RadixSelect.Trigger>
      <RadixSelect.Portal>
        <RadixSelect.Content
          className="shadow-drop z-[9999] mt-1 w-[284px] overflow-hidden rounded-[4px] bg-primary"
          position="popper">
          <RadixScrollArea.Root>
            <RadixSelect.Viewport className="max-h-[200px]">
              <RadixScrollArea.Viewport>{options?.map?.(renderItem)}</RadixScrollArea.Viewport>
            </RadixSelect.Viewport>
            <RadixScrollArea.Scrollbar orientation="vertical">
              <RadixScrollArea.Thumb />
            </RadixScrollArea.Scrollbar>
          </RadixScrollArea.Root>
        </RadixSelect.Content>
      </RadixSelect.Portal>
    </RadixSelect.Root>
  );
};

const Select = (props: ISelect) => {
  return (
    <FormWrapper {...props}>
      <SelectBase {...props} />
    </FormWrapper>
  );
};

export default Select;
