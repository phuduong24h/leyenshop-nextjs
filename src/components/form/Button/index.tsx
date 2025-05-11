'use client';

import type { ReactNode } from 'react';

import { cn } from 'utils';

import styles from './index.module.scss';
import Loading from '../Loading';

interface ButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  label?: string;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'outline';
  children?: ReactNode | ReactNode[];
}

const Button = ({
  label,
  loading = false,
  disabled,
  size = 'md',
  variant,
  className,
  children,
  ...rest
}: ButtonProps) => {
  const renderContent = () => {
    if (loading) {
      return <Loading color="var(--secondary-1)" size={21} />;
    }
    if (label) {
      return label;
    }
    return children;
  };

  return (
    <button
      type="button"
      className={cn(
        'relative overflow-hidden rounded bg-primary px-3 font-medium text-text-on-primary transition active:scale-95',
        'disabled:pointer-events-none disabled:opacity-60',
        {
          [styles[`button--${size}`]]: size,
          [styles[`button--${variant}`]]: variant
        },
        className
      )}
      disabled={disabled}
      {...rest}>
      {renderContent()}
    </button>
  );
};

export default Button;
