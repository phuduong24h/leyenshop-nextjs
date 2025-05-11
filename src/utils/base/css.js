import classNames from 'classnames';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(classNames(inputs));
}

export function mergeRefs(refs) {
  return value => {
    refs.forEach(ref => {
      if (typeof ref === 'function') {
        ref(value);
      } else if (ref != null) {
        ref.current = value;
      }
    });
  };
}
