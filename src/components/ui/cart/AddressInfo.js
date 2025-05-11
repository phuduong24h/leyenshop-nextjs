'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Dialog } from 'components/common';
import { TextArea, TextInput } from 'components/form';
import { ORDER_STATUS, PAYMENT_METHOD } from 'constants/custom';
import { useCreateOrder, useUser } from 'hooks/api';
import { useCartStoreActions } from 'hooks/store';
import { Routes } from 'routes';
import { ORDER_SCHEMA, orderSchema } from 'utils';

const AddressInfo = ({ open, onCancel, productActivated, onSuccess }) => {
  const router = useRouter();
  const { me } = useUser();

  const { doRequest: doCreateOrder, loading: loadingCreateOrder } = useCreateOrder();
  const { removeCartWithIds } = useCartStoreActions();

  const form = useForm({
    resolver: yupResolver(orderSchema()),
    defaultValues: {
      [ORDER_SCHEMA.NAME]: me?.fullName || '',
      [ORDER_SCHEMA.PHONE]: me?.phone || '',
      [ORDER_SCHEMA.ADDRESS]: me?.address || '',
      [ORDER_SCHEMA.NOTE]: ''
    },
    mode: 'onChange'
  });

  const onSubmit = values => {
    const products = productActivated.map(product => ({
      productId: product.id,
      sizeId: product.sizeId,
      colorId: product.colorId,
      quantity: product.quantity,
      unitPrice: product.price
    }));

    const body = {
      customerName: values[ORDER_SCHEMA.NAME],
      customerPhone: values[ORDER_SCHEMA.PHONE],
      customerAddress: values[ORDER_SCHEMA.ADDRESS],
      totalPrice: productActivated.reduce((total, product) => total + product.price * product.quantity, 0),
      shippingFee: 0,
      paymentPaid: 0,
      paymentMethod: PAYMENT_METHOD.CASH,
      paymentStatus: ORDER_STATUS.UNPAID,
      products
    };

    doCreateOrder(body, res => {
      removeCartWithIds(productActivated.map(product => product.id));
      form.reset();
      toast.success('Đặt hàng thành công');
      router.push(Routes.HOA_DON.replace(':id', res?.data?.orderCode));
      onCancel();
      onSuccess();
    });
  };

  return (
    <Dialog
      open={open}
      onOpenChange={onCancel}
      title="Thông tin người nhận"
      cancelText="Huỷ"
      submitText="Xác nhận"
      loading={loadingCreateOrder}
      onSubmit={form.handleSubmit(onSubmit)}>
      <FormProvider {...form}>
        <div className="flex flex-col gap-4">
          <TextInput title="Họ và tên" name={ORDER_SCHEMA.NAME} />
          <TextInput title="Số điện thoại" name={ORDER_SCHEMA.PHONE} />
          <TextArea title="Địa chỉ" name={ORDER_SCHEMA.ADDRESS} />
          <TextArea title="Ghi chú" name={ORDER_SCHEMA.NOTE} />
        </div>
      </FormProvider>
    </Dialog>
  );
};

export default AddressInfo;
