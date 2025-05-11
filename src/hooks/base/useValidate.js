'use client';

import { useFormik } from 'formik';
import { get } from 'lodash';

export const useValidate = ({
  onSubmit,
  initialValues,
  onReset,
  validateOnMount = true,
  validationSchema,
  ...props
}) => {
  const { setFieldTouched, setFieldValue, touched, errors, ...rest } = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
    validateOnMount,
    enableReinitialize: true,
    onReset,
    ...props
  });

  const onChange = field => value => {
    const text = get(value, 'target.value', value);

    setFieldValue(field, text);
    setFieldTouched(field, true, false);
  };

  const onBlur = field => value => {
    const text = get(value, 'target.value', value);
    setFieldValue(field, text, false);
    setFieldTouched(field, true, false);
  };

  const error = name => {
    return touched[name] && errors[name];
  };

  return {
    onChange,
    error,
    onBlur,
    setFieldTouched,
    setFieldValue,
    touched,
    errors,
    ...rest
  };
};
