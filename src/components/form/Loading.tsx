'use client';

import { IconBaseProps } from 'react-icons';
import { LuLoader } from 'react-icons/lu';

import { cn } from 'utils';

interface ILoading extends IconBaseProps {
  wrapperClassName?: string;
  className?: string;
}

function Loading({ wrapperClassName, className, color = 'var(--primary)', ...props }: ILoading) {
  return (
    <div className={cn('flex items-center justify-center', wrapperClassName)}>
      <LuLoader
        color={color}
        size={30}
        className={cn(
          'animate-[spin_2s_linear_infinite] font-bold',
          // 'animate-spin',
          className
        )}
        {...props}
      />
    </div>
  );
}

export default Loading;
