import * as yup from 'yup';

import { MIN_LEN_PASSWORD, REGEX } from 'constants/custom';

export const NEW_CATEGORY_SCHEMA = {
  NAME: 'name'
};

export const newCategorySchema = () =>
  yup.object().shape({
    [NEW_CATEGORY_SCHEMA.NAME]: yup.string().trim().required().label('Tên loại')
  });

export const LOGIN_SCHEMA = {
  PHONE: 'phone',
  PASSWORD: 'password',
  REMEMBER: 'remember'
};

export const loginSchema = () =>
  yup.object().shape({
    [LOGIN_SCHEMA.PHONE]: yup
      .string()
      .matches(REGEX.NUMBER, 'Số điện thoại chỉ được chứa số')
      .trim()
      .required('Tài khoản bắt buộc')
      .min(10, 'Số điện thoại phải có ít nhất 10 số')
      .max(11, 'Số điện thoại không quá 11 số')
      .label(),
    [LOGIN_SCHEMA.PASSWORD]: yup
      .string()
      .required('Mật khẩu bắt buộc')
      .trim()
      .min(MIN_LEN_PASSWORD, 'Có ít nhất 8 ký tự')
      .label('Mật khẩu')
  });

export const REGISTER_SCHEMA = {
  FIRST_NAME: 'firstName',
  LAST_NAME: 'lastName',
  FULL_NAME: 'fullName',
  PHONE: 'phone',
  ADDRESS: 'address',
  PASSWORD: 'password',
  CONFIRM_PASSWORD: 'confirmPassword'
};

export const registerSchema = () =>
  yup.object().shape({
    [REGISTER_SCHEMA.FULL_NAME]: yup.string().trim().required('Tên không được để trống').label('Tên'),
    [REGISTER_SCHEMA.PHONE]: yup
      .string()
      .trim()
      .required('Số điện thoại không được để trống')
      .matches(REGEX.NUMBER, 'Số điện thoại chỉ được chứa số')
      .min(10, 'Số điện thoại phải có ít nhất 10 số')
      .max(11, 'Số điện thoại không quá 11 số')
      .label('Số điện thoại'),
    [REGISTER_SCHEMA.ADDRESS]: yup.string().trim().required('Địa chỉ không được để trống').label('Địa chỉ'),
    [REGISTER_SCHEMA.PASSWORD]: yup
      .string()
      .trim()
      .required('Mật khẩu không được để trống')
      .min(8, 'Mật khẩu phải có ít nhất 8 ký tự')
      .label('Mật khẩu'),
    [REGISTER_SCHEMA.CONFIRM_PASSWORD]: yup
      .string()
      .trim()
      .oneOf([yup.ref(REGISTER_SCHEMA.PASSWORD)], 'Mật khẩu nhập lại không khớp')
      .required('Vui lòng nhập lại mật khẩu')
      .label('Nhập lại mật khẩu')
  });

export const ORDER_SCHEMA = {
  NAME: 'name',
  PHONE: 'phone',
  ADDRESS: 'address',
  NOTE: 'note'
};

export const orderSchema = () =>
  yup.object().shape({
    [ORDER_SCHEMA.NAME]: yup.string().trim().required().label('Họ và tên'),
    [ORDER_SCHEMA.PHONE]: yup.string().trim().required().label('Số điện thoại'),
    [ORDER_SCHEMA.ADDRESS]: yup.string().trim().required().label('Địa chỉ'),
    [ORDER_SCHEMA.NOTE]: yup.string().trim()
  });

export const USER_PROFILE_SCHEMA = {
  FULL_NAME: 'fullName',
  PHONE: 'phone',
  ADDRESS: 'address'
};

export const userProfileSchema = () =>
  yup.object().shape({
    [USER_PROFILE_SCHEMA.FULL_NAME]: yup.string().trim().required().label('Họ và tên'),
    [USER_PROFILE_SCHEMA.PHONE]: yup.string().trim().required().label('Số điện thoại'),
    [USER_PROFILE_SCHEMA.ADDRESS]: yup.string().trim().required().label('Địa chỉ')
  });

export const CHANGE_PASSWORD_SCHEMA = {
  OLD_PASSWORD: 'oldPassword',
  NEW_PASSWORD: 'newPassword',
  CONFIRM_NEW_PASSWORD: 'confirmNewPassword'
};

export const changePasswordSchema = () =>
  yup.object().shape({
    [CHANGE_PASSWORD_SCHEMA.OLD_PASSWORD]: yup
      .string()
      .trim()
      .required('Mật khẩu không được để trống')
      .min(MIN_LEN_PASSWORD, 'Mật khẩu phải có ít nhất 8 ký tự')
      .label('Mật khẩu cũ'),
    [CHANGE_PASSWORD_SCHEMA.NEW_PASSWORD]: yup
      .string()
      .trim()
      .required('Mật khẩu không được để trống')
      .min(MIN_LEN_PASSWORD, 'Mật khẩu phải có ít nhất 8 ký tự')
      .label('Mật khẩu mới'),
    [CHANGE_PASSWORD_SCHEMA.CONFIRM_NEW_PASSWORD]: yup
      .string()
      .trim()
      .oneOf([yup.ref(CHANGE_PASSWORD_SCHEMA.NEW_PASSWORD)], 'Mật khẩu nhập lại không khớp')
      .required('Vui lòng nhập lại mật khẩu')
      .label('Nhập lại mật khẩu')
      .min(MIN_LEN_PASSWORD, 'Mật khẩu phải có ít nhất 8 ký tự')
      .label('Nhập lại mật khẩu')
  });

export const UPDATE_PASSWORD_SCHEMA = {
  NEW_PASSWORD: 'newPassword',
  CONFIRM_PASSWORD: 'confirmPassword'
};

export const updatePasswordSchema = () =>
  yup.object().shape({
    [UPDATE_PASSWORD_SCHEMA.NEW_PASSWORD]: yup
      .string()
      .trim()
      .required('Mật khẩu không được để trống')
      .min(MIN_LEN_PASSWORD, 'Mật khẩu phải có ít nhất 8 ký tự')
      .label('Mật khẩu mới'),
    [UPDATE_PASSWORD_SCHEMA.CONFIRM_PASSWORD]: yup
      .string()
      .trim()
      .oneOf([yup.ref(UPDATE_PASSWORD_SCHEMA.NEW_PASSWORD)], 'Mật khẩu nhập lại không khớp')
      .required('Vui lòng nhập lại mật khẩu')
      .label('Nhập lại mật khẩu')
      .min(MIN_LEN_PASSWORD, 'Mật khẩu phải có ít nhất 8 ký tự')
      .label('Nhập lại mật khẩu')
  });
