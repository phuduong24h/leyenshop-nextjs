import { toast } from 'sonner';

export const getErrorMessage = (error, { defaultMessage = 'Something went wrong' } = {}) => {
  return error?.response?.data?.message || error?.message || defaultMessage;
};

export const showCommonError = error => {
  const errorMessage = getErrorMessage(error);

  toast.error(errorMessage);
};
