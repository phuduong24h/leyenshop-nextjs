import { DatePicker as DatePickerAntd, DatePickerProps } from 'antd';
import { IFormWrapper, IHookForm } from 'types';

import { cn } from 'utils';

import styles from './index.module.scss';
import FormWrapper from '../FormWrapper';

interface IDatePicker extends DatePickerProps, Omit<IFormWrapper, 'children'> {}

const DatePickerBase = ({ className, ...props }: IDatePicker & IHookForm) => {
  return <DatePickerAntd className={cn('size-full', className)} {...props} />;
};

const DatePicker = ({ formWrapperClassName, ...props }: IDatePicker) => {
  return (
    <FormWrapper formWrapperClassName={cn(styles.container, formWrapperClassName)} {...props}>
      <DatePickerBase {...props} />
    </FormWrapper>
  );
};

export default DatePicker;
