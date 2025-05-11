import Invoice from 'views/order/Invoice';

const InvoicePage = ({ params }) => {
  const { id } = params || {};

  return <Invoice id={id} />;
};

export default InvoicePage;
