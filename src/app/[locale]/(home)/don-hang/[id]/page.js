import OrderHistoryDetail from 'views/order/OrderHistoryDetail';

const OrderHistoryDetailPage = ({ params }) => {
  const { id } = params || {};

  return <OrderHistoryDetail id={id} />;
};

export default OrderHistoryDetailPage;
