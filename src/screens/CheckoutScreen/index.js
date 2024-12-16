import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  Switch,
  ToastAndroid,
  Modal,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import appst from '../../constants/AppStyle';
import {c_outst} from './style';
import CheckOutItem from '../../items/CheckOutItem';
import {spacing} from '../../constants';
import CustomModal from '../../components/Modal';
import Header from '../../components/Header';
import {CustomedButton} from '../../components';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import {setOrderId, setPriceToPay} from '../../redux/reducer/cartReducer';
import {createOrder} from '../../api/OrderApi';
import AxiosInstance from '../../helpers/AxiosInstance';

import {
  getAdressDefault,
  getPaymentDefault,
  getShipDefault,
} from '../../redux/thunks/CartThunks';
import LoadingModal from '../../components/Modal/LoadingModal';
import {useNavigation} from '@react-navigation/native';
import { formatPrice } from '../../utils/functions/formatData';

const CheckOutScreen = ({route}) => {
  const {responseVoucher} = route.params || {};
  const state = useSelector(state => state.cart);
  const [responseVouchers, setResponseVouchers] = useState({});
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const {t, i18n} = useTranslation();
  const lag = i18n.language;
  const [isswitch, setIsswitch] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const addressDefault = state.address;
  var tongchiphi = 0;
  // const [isComplete, setisComplete] = useState(false);

  // console.log('addressDefault', addressDefault);
  // console.log('state.ship', state.ship);
  useEffect(() => {
    if (responseVoucher) {
      setResponseVouchers(responseVoucher);
    }
  }, [responseVoucher]);

  const ship = state.ship && state.ship.cost && state.ship.cost;

  tongchiphi = state.totalPrice + ship;
  if (responseVoucher) {
    tongchiphi = responseVoucher.discountedPrice + ship;
  }
  useEffect(() => {
    const getInforDefault = async () => {
      await Promise.all([
        dispatch(getShipDefault()),
        dispatch(getAdressDefault()),
        dispatch(getPaymentDefault()),
      ]);
    };
    getInforDefault();
  }, []);

  const handleOrder = async () => {
    if (!addressDefault) {
      ToastAndroid.show(`${t('nothing.adress_war')}`, ToastAndroid.SHORT);
      return;
    }
  
    setIsLoading(true);
  
    const products = Array.isArray(state.productOrder)
    ? state.productOrder.map(item => ({
        _id: item.product_id._id,
        assets: item.product_id.assets,
        name: item.product_id.name,
        size_name: item.size_id.name,
        price: item.product_id.price,
        quantity: item.quantity,
        size_id: item.size_id._id,
      }))
    : [];
  
    const body = {
      products: products,
      method_id: state.payment && state.payment._id,
      voucher_id: '',
      shipping_id: state.ship && state.ship._id,
      total_price: tongchiphi,
      receiver: addressDefault.recieverName,
      receiverPhone: addressDefault.recieverPhoneNumber,
      address: addressDefault.address,
      voucher_code: responseVouchers.voucher_code,
    };
  
    try {
      if (state.payment && state.payment.payment_method === 'Shoes Mate Wallet') {
        console.log('Shoes Mate Wallet');
  
        // Kiểm tra số dư hoặc trạng thái ví trước khi tạo đơn hàng
        const walletResponse = await AxiosInstance().post('/wallet/payment', {
          amount: tongchiphi,
        });
        console.log('walletResponse', walletResponse);
        if (walletResponse.status) {
          ToastAndroid.show('Đặt hàng thành công', ToastAndroid.SHORT);
          navigation.navigate('CheckoutSuccess');
          return;
        } else if (walletResponse.code === 'Insufficientbalance') {
          ToastAndroid.show('Không đủ số dư', ToastAndroid.SHORT);
          setIsLoading(false);
          return;
        } else if (walletResponse.code === 'walletnotcreated') {
          ToastAndroid.show('Vui lòng tạo ví trước khi thanh toán', ToastAndroid.SHORT);
          setIsLoading(false);
          return;
        } else if (walletResponse.code === 'walletnotactive') {
          ToastAndroid.show('Ví chưa được kích hoạt', ToastAndroid.SHORT);
          setIsLoading(false);
          return;
        } else {
          ToastAndroid.show('Có lỗi xảy ra, vui lòng thử lại sau', ToastAndroid.SHORT);
          setIsLoading(false);
          return;
        }
      }else{
        const response = await createOrder(body);
      if (response.status) {
        setIsLoading(false);
  
        if (state.payment.payment_method === 'Zalo Pay') {
          dispatch(setPriceToPay(tongchiphi));
          dispatch(setOrderId(response.data.order._id));
          navigation.navigate('ZaloPayScreen');
        } else if (state.payment.payment_method === 'Thanh toán khi nhận hàng') {
          ToastAndroid.show('Tạo đơn thành công', ToastAndroid.SHORT);
          navigation.navigate('CheckoutSuccess');
        }
      } else {
        ToastAndroid.show('Tạo đơn không thành công', ToastAndroid.SHORT);
      }
      }
  
      // Nếu không sử dụng ví Shoes Mate Wallet, tiếp tục tạo đơn hàng
      
    } catch (error) {
      console.log('Error:', error);
      ToastAndroid.show('Đã xảy ra lỗi, vui lòng thử lại', ToastAndroid.SHORT);
      setIsLoading(false);
    }
  };
  

  const handeToVouchers = () => {
    navigation.navigate('Voucher', {totalOrderValue: state.totalPrice});
  };

  return (
    <View style={[appst.container, c_outst.containerPosition]}>
      <View style={[appst.container]}>
        <Header
          leftOnPress={() => navigation.goBack()}
          iconLeft={require('../../assets/icons/back.png')}
          name={t('buttons.btn_checkout')}
        />
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={c_outst.viewBody}>
          {!addressDefault ? (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('AddNewAddress', {screen: 'CheckOutScreen'})
              }
              style={[appst.rowStart, c_outst.wrapaddress]}>
              <Image
                style={c_outst.address}
                source={require('../../assets/icons/add_adr.png')}
              />
              <Text style={c_outst.textAdress}>{t('address.add')}</Text>
            </TouchableOpacity>
          ) : (
            <View
              style={[appst.rowCenter, c_outst.body1, c_outst.borderBottom]}>
              <TouchableOpacity
                style={c_outst.view1}
                onPress={() =>
                  navigation.navigate('ChooseAddress', {
                    isChoose: true,
                    addressDefault: addressDefault._id,
                  })
                }>
                <Image
                  style={appst.icon24}
                  source={require('../../assets/icons/address.png')}
                />
                <View style={c_outst.body1Text}>
                  <Text style={c_outst.text1}>{t('checkout.address')}:</Text>
                  <Text style={c_outst.text2}>
                    {addressDefault.recieverName} |{' '}
                    <Text style={c_outst.text3}>
                      (+84) {addressDefault.recieverPhoneNumber}
                    </Text>{' '}
                    {addressDefault.address}
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('ChooseAddress')}>
                <Image
                  style={appst.icon24}
                  source={require('../../assets/icons/arrow_right.png')}
                />
              </TouchableOpacity>
            </View>
          )}

          <View style={[c_outst.borderBottom, c_outst.body2]}>
            <Text style={c_outst.bd2Text1}>{t('checkout.your_product')}</Text>
            <FlatList
              style={[c_outst.flat]}
              scrollEnabled={false}
              data={state.productOrder}
              renderItem={({item}) => <CheckOutItem item={item} />}
              extraData={item => item._id}
              ItemSeparatorComponent={<View style={c_outst.borderBottom2} />}
            />
          </View>

          <TouchableOpacity
            style={[appst.rowCenter, c_outst.body3, c_outst.borderBottom]}
            onPress={handeToVouchers}>
            <View style={appst.rowCenter}>
              <Image
                style={appst.icon24}
                source={require('../../assets/icons/vouchers.png')}
              />
              <Text style={c_outst.text6}>{t('checkout.vouchers')}</Text>
            </View>
            <View style={[appst.rowCenter]}>
              <Text style={c_outst.text7}>
                {(responseVoucher && `${t('voucher.use')} 1 ${t('voucher.vc')}`) || ''}
                              </Text>
              <Image
                style={appst.icon24}
                source={require('../../assets/icons/arrow_right.png')}
              />
            </View>
          </TouchableOpacity>

          <View style={[c_outst.body3, c_outst.borderBottom]}>
            <TouchableOpacity
              onPress={() => navigation.navigate('ChoosePaymentScreen')}
              style={[appst.rowCenter]}>
              <View style={appst.rowCenter}>
                <Image
                  style={appst.icon24}
                  source={require('../../assets/icons/payoption.png')}
                />
                <Text style={c_outst.text6}>
                  {state.payment && state.payment.payment_method
                    ? state.payment.payment_method
                    : t('checkout.pay_option')}
                </Text>
              </View>
              <Image
                style={appst.icon24}
                source={require('../../assets/icons/arrow_right.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('ShipScreen', {
                  shipId: state?.ship?._id,
                  isDefault: true,
                })
              }
              style={[appst.rowCenter, {marginTop: 5}]}>
              <View style={appst.rowCenter}>
                <Image
                  style={appst.icon24}
                  source={require('../../assets/icons/shipment.png')}
                />
                <Text style={c_outst.text6}>
                  {state.ship && state.ship.name
                    ? state.ship.name
                    : t('checkout.ship_option')}
                </Text>
              </View>
              <Image
                style={appst.icon24}
                source={require('../../assets/icons/arrow_right.png')}
              />
            </TouchableOpacity>
            <View style={[appst.rowCenter, c_outst.body4]}>
              <View style={appst.rowCenter}>
                <Image
                  style={appst.icon24}
                  source={require('../../assets/icons/payment.png')}
                />
                <Text style={c_outst.text6}>{t('checkout.pay_detail')}</Text>
              </View>
            </View>
            <View style={[appst.rowCenter, c_outst.view4Text]}>
              <Text style={c_outst.textTitle}>{t('checkout.merchandise')}</Text>
              <Text style={c_outst.textPrice}>
                {lag === 'en' && '$'}
                {state.totalPrice && formatPrice(state.totalPrice, lag)}
                {lag === 'vi' && ' VNĐ '}${' '}
              </Text>
            </View>
            <View style={[appst.rowCenter, c_outst.view4Text]}>
              <Text style={c_outst.textTitle}>
                {t('checkout.shipping_total')}
              </Text>
              <Text style={c_outst.textPrice}>
                {lag === 'en' && '$'}
                {state.ship && state.ship.cost
                  ? state.ship.cost && formatPrice(state?.ship?.cost, lag)
                  : '...'}
                {lag === 'vi' && ' VNĐ '}
              </Text>
            </View>
            <View style={[appst.rowCenter, c_outst.view4Text]}>
              <Text style={c_outst.textTitle}>{t('Áp dụng voucher')}</Text>
              <Text style={c_outst.textPrice}>
                {' '}
                -
                {(responseVouchers.discountAmount &&
                  responseVouchers.discountAmount.toLocaleString('vi-VN')) ||
                  '0'}{' '}
                VNĐ
              </Text>
            </View>
            <View style={[appst.rowCenter, c_outst.view4Text]}>
              <Text style={[c_outst.textTitle, c_outst.textTitle1]}>
                {t('checkout.payment')}
              </Text>
              <Text style={[c_outst.textPrice, c_outst.textPrice1]}>
                {lag === 'en' && '$'}
                {(tongchiphi && formatPrice(tongchiphi, lag)) || '...'}
                {lag === 'vi' && ' VNĐ '}
              </Text>
            </View>
          </View>
          <View style={[appst.rowCenter, c_outst.body5]}>
            <View>
              <Image
                style={[appst.icon24, {marginLeft: spacing.md}]}
                source={require('../../assets/icons/term.png')}
              />
            </View>
            <Text style={c_outst.textTerm}>
              {t('checkout.detail')}
              <Text style={c_outst.textTerm1}> {t('checkout.term')}</Text>
            </Text>
          </View>
        </ScrollView>

        <View style={c_outst.viewFooter}>
          <View style={[appst.rowCenter, c_outst.borderTop]}>
            <Text style={c_outst.text4}>{t('home.total')}</Text>
            <Text style={c_outst.text5}>
              {lag === 'en' && '$'}
              {formatPrice(tongchiphi) || '...'}
              {lag === 'vi' && ' VNĐ '}
            </Text>
          </View>
          <CustomedButton
            title={t('buttons.btn_place_order')}
            titleStyle={c_outst.textPress}
            onPress={() => handleOrder()}
            style={c_outst.press}
          />
        </View>
      </View>

      <CustomModal
        visible={modalVisible}
        closeModal={() => setModalVisible(false)}
        image={require('../../assets/images/img_success.png')}
        title={t('modals.title_payment')}
        content={t('modals.sub_title_mail')}
        textbutton={t('buttons.btn_back_to_shop')}
      />

      <Modal transparent={true} visible={isLoading}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      </Modal>
    </View>
  );
};

export default CheckOutScreen;
