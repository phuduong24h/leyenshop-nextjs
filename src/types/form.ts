import {
  ControllerFieldState,
  ControllerRenderProps,
  FieldPath,
  FieldValues,
  UseFormStateReturn
} from 'react-hook-form';

export interface IFormWrapper {
  name?: string;
  title?: string;
  required?: boolean;
  error?: string;
  description?: string;
  children: React.ReactElement;

  formWrapperClassName?: string;
  formClassName?: string;
  rowClassName?: string;
  titleClassName?: string;
  requiredClassName?: string;
  errorClassName?: string;
  descriptionClassName?: string;

  hideErrorMessage?: boolean;
  row?: boolean;
}

export interface IHookForm {
  field?: ControllerRenderProps<FieldValues, FieldPath<FieldValues>>;
  fieldState?: ControllerFieldState;
  formState?: UseFormStateReturn<FieldValues>;
}
