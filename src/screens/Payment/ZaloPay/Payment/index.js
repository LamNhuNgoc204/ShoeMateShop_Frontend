import {View, Image, Text, Alert, Linking} from 'react-native';
import React, {useState} from 'react';
import appst from '../../../../constants/AppStyle';
import Header from '../../../../components/Header';
import zalo from './style';
import {CustomedButton} from '../../../../components';
import {useSelector} from 'react-redux';
import AxiosInstance from '../../../../helpers/AxiosInstance';
import {useTranslation} from 'react-i18next';

const ZaloPayScreen = ({navigation}) => {
  const {t} = useTranslation();
  const [paymentUrl, setPaymentUrl] = useState(null);
  const user = useSelector(state => state.user.user);
  const cartState = useSelector(state => state.cart);
  // console.log('user', user);

  const handlePayment = async () => {
    try {
      const body = {
        userid: user._id,
        orderId: cartState.orderId,
        amount: cartState.priceToPay,
      };
      const response = await AxiosInstance().post('/payment', body);
      console.log('payment -------', response);

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

  // const openPaymentUrl = () => {
  //   navigation.navigate('ZaloPayWebView', {paymentUrl});
  // };

  const openPaymentUrl = () => {
    if (paymentUrl) {
      // Mở trực tiếp URL thanh toán ZaloPay trong trình duyệt
      Linking.openURL(paymentUrl).catch(err =>
        console.error('Failed to open URL', err),
      );
    }
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
        <Text style={zalo.text1}>{t('payment.continue')}</Text>
        <Text style={zalo.text2}>{t('payment.click')}</Text>
      </View>
      <View>
        {!paymentUrl ? (
          <CustomedButton
            title={t('payment.button')}
            style={zalo.button}
            titleStyle={{color: 'white'}}
            onPress={handlePayment}
          />
        ) : (
          <CustomedButton
            title={t('payment.open_web')}
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
