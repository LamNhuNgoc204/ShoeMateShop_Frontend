import {cancelOrder} from '../../api/OrderApi';

export const handleOrderDetail = async (orderDetail, ToastAndroid, index) => {
  if (orderDetail.orderStatus === 'pending') {
    const response = await cancelOrder(index);
    if (response.status) {
      ToastAndroid.show(t('toast.cancel_order', ToastAndroid.SHORT));
    }
  }
};

export const handleReviewOrder = async () => {
  try {
    const response = 's'
  } catch (error) {
    console.log('Review failed: ', error);
  }
};
