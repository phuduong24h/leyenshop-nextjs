'use client';

import { cn } from 'utils';

const Quantity = ({ onIncrease, onDecrease, value, minAmount = 1 }) => {
  return (
    <div className="flex w-fit justify-center border border-border-primary">
      <button
        className={cn('flex-center size-6 font-bold', 'disabled:cursor-not-allowed disabled:bg-background-disable')}
        disabled={value <= minAmount}
        type="button"
        onClick={() => onDecrease?.(false)}>
        -
      </button>
      <div className="flex-center size-6 border-x border-border-primary font-medium">{value || minAmount}</div>
      <button className="flex-center size-6 font-bold" onClick={() => onIncrease?.(true)} type="button">
        +
      </button>
    </div>
  );
};

export default Quantity;
