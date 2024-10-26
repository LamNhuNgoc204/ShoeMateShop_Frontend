import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  Switch,
  ToastAndroid,
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
import AxiosInstance from '../../helpers/AxiosInstance';
import {useDispatch, useSelector} from 'react-redux';
import {setOrderId, setPriceToPay} from '../../redux/reducer/cartReducer';
import {createOrder} from '../../api/OrderApi';

const CheckOutScreen = ({navigation}) => {
  const state = useSelector(state => state.cart);
  const dispatch = useDispatch();
  // console.log(
  //   'order item:',
  //   state.productOrder,
  //   // '-',
  //   // state.ship,
  //   // '_',
  //   // state.payment,
  // );

  const {t} = useTranslation();
  const [isswitch, setIsswitch] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [addressDefault, setAddressDefault] = useState({});

  const ship = state.ship && state.ship.cost && state.ship.cost;
  const tongchiphi = state.totalPrice + ship;

  useEffect(() => {
    const getAddresDefault = async () => {
      try {
        const response = await AxiosInstance().get(
          '/addresses/default-address',
        );
        if (response.status) {
          setAddressDefault(response.data);
        }
      } catch (error) {
        console.log('Error get address default: ', error);
      }
    };
    getAddresDefault();
  }, []);

  const handleOrder = async () => {
    const products = state.productOrder.map(item => ({
      _id: item.product_id._id,
      assets: item.product_id.assets,
      name: item.product_id.name,
      size_name: item.size_id.name,
      price: item.product_id.price,
      quantity: item.quantity,
      size_id: item.size_id._id,
    }));

    const body = {
      products: products,
      method_id: state.payment && state.payment._id,
      voucher_id: '',
      shipping_id: state.ship && state.ship._id,
      total_price: tongchiphi,
      receiver: addressDefault.recieverName,
      receiverPhone: addressDefault.recieverPhoneNumber,
      address: addressDefault.address,
    };

    // console.log('body orrder: ', body);

    const response = await createOrder(body);
    if (response.status) {
      if (state.payment && state.payment.payment_method === 'Zalo Pay') {
        dispatch(setPriceToPay(tongchiphi));
        dispatch(setOrderId(response.data.order._id));
        navigation.navigate('ZaloPayScreen');
      } else if (
        state.payment &&
        state.payment.payment_method === 'Thanh toán khi nhận hàng'
      ) {
        // setModalVisible(true);
        ToastAndroid.show('tao don thanh cong', ToastAndroid.show);
        navigation.navigate('CheckoutSuccess');
      }
    }

    //check xem chon phuong thuc nao roi chuyen man hinh tuong ung
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleToggle = value => {
    setIsswitch(value);
  };

  const goToScreen = Screen => {
    navigation.navigate(Screen);
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
          <View style={[appst.rowCenter, c_outst.body1, c_outst.borderBottom]}>
            <TouchableOpacity
              style={c_outst.view1}
              onPress={() => goToScreen('ChooseAddress')}>
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
            <TouchableOpacity onPress={() => goToScreen('ChooseAddress')}>
              <Image
                style={appst.icon24}
                source={require('../../assets/icons/arrow_right.png')}
              />
            </TouchableOpacity>
          </View>

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

          <View style={[appst.rowCenter, c_outst.body3, c_outst.borderBottom]}>
            <View style={appst.rowCenter}>
              <Image
                style={appst.icon24}
                source={require('../../assets/icons/vouchers.png')}
              />
              <Text style={c_outst.text6}>{t('checkout.vouchers')}</Text>
            </View>
            <View style={[appst.rowCenter]}>
              <Text style={c_outst.text7}>Use 1 Voucher</Text>
              <Image
                style={appst.icon24}
                source={require('../../assets/icons/arrow_right.png')}
              />
            </View>
          </View>

          <View style={[appst.rowCenter, c_outst.body3, c_outst.borderBottom]}>
            <View style={appst.rowCenter}>
              <Image
                style={appst.icon24}
                source={require('../../assets/icons/points.png')}
              />
              <Text style={c_outst.text6}>Redeem 3500 Points</Text>
            </View>
            <Switch onValueChange={handleToggle} value={isswitch} />
          </View>

          <View style={[c_outst.body3, c_outst.borderBottom]}>
            <TouchableOpacity
              onPress={() => goToScreen('ChoosePaymentScreen')}
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
              onPress={() => goToScreen('ShipScreen')}
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
              <Text style={c_outst.textPrice}>$ {state.totalPrice}</Text>
            </View>
            <View style={[appst.rowCenter, c_outst.view4Text]}>
              <Text style={c_outst.textTitle}>
                {t('checkout.shipping_total')}
              </Text>
              <Text style={c_outst.textPrice}>
                $ {state.ship && state.ship.cost ? state.ship.cost : '...'}
              </Text>
            </View>
            <View style={[appst.rowCenter, c_outst.view4Text]}>
              <Text style={c_outst.textTitle}>
                {t('checkout.shipping_discount')}
              </Text>
              <Text style={c_outst.textPrice}>$ 0</Text>
            </View>
            <View style={[appst.rowCenter, c_outst.view4Text]}>
              <Text style={[c_outst.textTitle, c_outst.textTitle1]}>
                {t('checkout.payment')}
              </Text>
              <Text style={[c_outst.textPrice, c_outst.textPrice1]}>
                $ {tongchiphi || '...'}
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
              ${tongchiphi.toLocaleString('vi-VN') || '...'}
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
        closeModal={closeModal}
        image={require('../../assets/images/img_success.png')}
        title={t('modals.title_payment')}
        content={t('modals.sub_title_mail')}
        textbutton={t('buttons.btn_back_to_shop')}
      />
    </View>
  );
};

export default CheckOutScreen;
