import Toast from 'react-native-toast-message';
import {cancelOrder} from '../../api/OrderApi';

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
      Toast.show({text1: t('toast.cancel_order'), type: 'success'});
      navigation.goBack();
    }
  }
};
