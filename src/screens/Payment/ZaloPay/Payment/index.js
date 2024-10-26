import {View, Image, Text, Alert} from 'react-native';
import React, {useState} from 'react';
import appst from '../../../../constants/AppStyle';
import Header from '../../../../components/Header';
import zalo from './style';
import {CustomedButton} from '../../../../components';
import {useSelector} from 'react-redux';
import AxiosInstance from '../../../../helpers/AxiosInstance';

const ZaloPayScreen = ({navigation}) => {
  const [paymentUrl, setPaymentUrl] = useState(null);
  // const user = useSelector(state => state.user.user);
  const cartState = useSelector(state => state.cart);
  // console.log('user', user);

  const handlePayment = async () => {
    try {
      const body = {
        // userid: user._id,
        orderId: cartState.orderId,
        amount: cartState.priceToPay,
      };
      const response = await AxiosInstance().post('/payment', body);
      // console.log('payment -------', response);

      // Nhận URL thanh toán từ ZaloPay
      if (response.data.return_code === 1) {
        // Lưu lại URL thanh toán ZaloPay
        setPaymentUrl(response.data.order_url);
      } else {
        Alert.alert('Error', 'Failed to create payment');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Error while creating payment');
    }
  };

  const openPaymentUrl = () => {
    navigation.navigate('ZaloPayWebView', {paymentUrl});
  };

  return (
    <View style={[appst.container, zalo.container]}>
      <View style={zalo.viewHead}>
        <Header
          iconLeft={require('../../../../assets/icons/back.png')}
          leftOnPress={() => navigation.goBack()}
          name={'Zalo Pay'}
        />
      </View>
      <View style={zalo.view}>
        <Image
          style={zalo.img}
          source={require('../../../../assets/images/zalo_pay_linh_vat.jpg')}
        />
        <Text style={zalo.text1}>Tiep tuc thanh toan voi Zalo</Text>
        <Text style={zalo.text2}>Bam xac nhan de tiep tuc</Text>
      </View>
      <View>
        {!paymentUrl ? (
          <CustomedButton
            title={'Thanh toán Zalo Pay'}
            style={zalo.button}
            titleStyle={{color: 'white'}}
            onPress={handlePayment}
          />
        ) : (
          <CustomedButton
            title={'Mở trang thanh toán'}
            style={zalo.button}
            titleStyle={{color: 'white'}}
            onPress={openPaymentUrl}
          />
        )}
      </View>
    </View>
  );
};

export default ZaloPayScreen;
