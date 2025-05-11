import { Button, Table } from 'components/form';
import { VND } from 'constants/common';
import { formatMoney } from 'utils';

const CartDesktop = ({ table, disabled, total, loading, onPay }) => {
  return (
    <div className="pb-[94px] pt-7 sm:pt-0">
      <Table table={table} />

      <div className="mt-4 flex">
        <span className="ml-auto">
          TỔNG CỘNG:
          <span className="ml-1 font-bold">
            {formatMoney(total)}
            <span className="underline">{VND}</span>
          </span>
        </span>
      </div>

      <div className="flex">
        <Button
          label="Thanh toán"
          disabled={disabled}
          loading={loading}
          className="ml-auto mt-[50px]"
          onClick={onPay}
        />
      </div>
    </div>
  );
};

export default CartDesktop;
