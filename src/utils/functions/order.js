import {ToastAndroid} from 'react-native';
import {cancelOrder} from '../../api/OrderApi';
import {gotoCart} from './navigationHelper';
import {addItemToCartApi} from '../../api/CartApi';

export const handleOrderDetail = async (
  navigation,
  t,
  orderDetail,
  ToastAndroid,
  index,
) => {
  if (orderDetail.orderStatus === 'pending') {
    const response = await cancelOrder(index);
    if (response.status) {
      ToastAndroid.show(t('toast.cancel_order'), ToastAndroid.SHORT);
      navigation.goBack();
    }
  }
};
