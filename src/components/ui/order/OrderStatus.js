import { useMemo } from 'react';

import { ORDER_STATUS } from 'constants/custom';
import { cn } from 'utils';

const OrderStatus = ({ status }) => {
  const { color, text } = useMemo(() => {
    switch (status) {
      case ORDER_STATUS.PAID:
        return {
          color: 'bg-badge-3',
          text: 'Đã thanh toán'
        };
      case ORDER_STATUS.PENDING:
        return {
          color: 'bg-badge-2',
          text: 'Chờ thanh toán'
        };
      case ORDER_STATUS.UNPAID:
      default:
        return {
          color: 'bg-badge-1',
          text: 'Chưa thanh toán'
        };
    }
  }, [status]);

  return (
    <div className="flex items-center gap-2">
      <div className={cn('size-1.5 rounded-full', color)} />
      <span className="text-base">{text}</span>
    </div>
  );
};

export default OrderStatus;
