import numeral from 'numeral';
import { toast } from 'sonner';

export const formatMoney = (value, unit = '0,0') => {
  return numeral(value).format(unit);
};

export const deDuplicate = (arr, key = 'id') => {
  const map = new Map();
  return arr?.filter?.(item => {
    const keyValue = item[key];
    if (map.has(keyValue)) {
      return false;
    }
    map.set(keyValue, true);
    return true;
  });
};

export const getFormFunction = ({ form, name, error, value } = {}) => {
  return {
    errorForm: error || form?.error?.(name),
    valueForm: value || form?.values?.[name],
    onChangeForm: form?.onChange?.(name)
  };
};

export const onCopy = async text => {
  try {
    // eslint-disable-next-line no-undef
    await navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard');
  } catch (err) {
    toast.error('Failed to copy');
  }
};
