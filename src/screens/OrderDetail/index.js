import {
  View,
  Text,
  Image,
  FlatList,
  ScrollView,
  ToastAndroid,
  TouchableOpacity,
  Modal,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import appst from '../../constants/AppStyle';
import {oddt} from './style';
import Header from '../../components/Header';
import {spacing} from '../../constants';
import {CustomedButton} from '../../components';
import {useTranslation} from 'react-i18next';
import OrderDetailSkeleton from '../../placeholders/product/order/OrderDetail';
import {cancelOrder, getOrderDetail} from '../../api/OrderApi';
import OrderItemDetail from '../../items/OrderItem/OrderItemDetail';
import {formatDate} from '../../utils/functions/formatData';
import Loading from '../../components/Loading';
import odit from '../../items/OrderItem/style';

const OrderDetail = ({route, navigation}) => {
  const {item} = route.params;
  const {t} = useTranslation();
  const [loading, setLoading] = useState(false);
  const [orderDetail, setOrderDetail] = useState({});
  const [titleButton, setTitleButton] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [isCancel, setisCancel] = useState(false);

  // console.log('orderDetail => ', item);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(false);
      const response = await getOrderDetail(item._id);
      if (response) {
        setOrderDetail(response);
        if (response.orderStatus === 'pending') {
          setTitleButton('orders.cancelled');
        } else if (response.orderStatus === 'processing') {
          setTitleButton('orders.processing');
        } else if (response.orderStatus === 'shipped') {
          setTitleButton('orders.track');
        }
        setLoading(true);
      }
    };

    fetchData();
  }, []);

  const confirmCancelOrder = async () => {
    setisCancel(true);
    const response = await cancelOrder(item._id);
    if (response.status) {
      setisCancel(false);
      ToastAndroid.show(t('toast.cancel_order'), ToastAndroid.SHORT);
      navigation.navigate('OrderScreen', {initialRoute: t('orders.cancel')});
    }
    setModalVisible(false);
  };

  const handleOrderDetail = () => {
    if (orderDetail.orderStatus === 'pending') {
      setModalVisible(true);
    }
  };

  const Item = ({content1, content2}) => {
    return (
      <View style={appst.rowCenter}>
        <Text style={oddt.text9}>{content1}</Text>
        <Text style={oddt.text10}>{content2}</Text>
      </View>
    );
  };

  const Item2 = ({contetn1, content2, onPress}) => {
    return (
      <TouchableOpacity onPress={onPress} View style={appst.rowCenter}>
        <Text style={oddt.text12}>{contetn1}</Text>
        <Text style={oddt.text11}>{content2}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={appst.container}>
      {isCancel ? (
        <Loading />
      ) : (
        <View style={[appst.container, oddt.container]}>
          <Header
            iconLeft={require('../../assets/icons/back.png')}
            leftOnPress={() => navigation.goBack()}
            name={t('orders.order_detail')}
          />
          <View style={{flex: 1}}>
            {loading ? (
              <View
                style={{
                  flex: 1,
                  height: '100%',
                  justifyContent: 'space-between',
                }}>
                <ScrollView>
                  <View style={oddt.itemContainer}>
                    <View style={oddt.row}>
                      <Image
                        source={require('../../assets/icons/location.png')}
                        style={oddt.location}
                      />
                      <View>
                        <Text style={oddt.text1}>{t('checkout.address')}:</Text>
                        <Text>
                          <Text style={oddt.text2}>
                            <Text style={oddt.text3}>
                              {orderDetail.receiver} |{' '}
                              {orderDetail.receiverPhone}
                            </Text>{' '}
                            {'\n'}
                            {orderDetail.address}
                          </Text>
                        </Text>
                      </View>
                    </View>

                    <View style={oddt.border} />

                    <View style={[oddt.body]}>
                      <View style={[appst.rowCenter, oddt.view]}>
                        <Text style={oddt.text4}>{t('orders.code')}</Text>
                        <Text style={oddt.text4}>
                          {orderDetail.orderCode &&
                            orderDetail.orderCode.toUpperCase()}
                        </Text>
                      </View>
                      <FlatList
                        data={orderDetail.products}
                        renderItem={item => <OrderItemDetail item={item} />}
                        keyExtractor={item => item._id.toString()}
                        scrollEnabled={false}
                      />
                    </View>

                    <View style={oddt.border} />

                    <View style={oddt.body}>
                      <Text style={oddt.text5}>
                        {t('orders.status')}:{' '}
                        <Text style={oddt.text6}>
                          {orderDetail.statusShip === 'pending'
                            ? t('orders.pending')
                            : ''}
                        </Text>
                      </Text>
                      <Text style={oddt.text7}>{t('orders.order_total')}</Text>
                      <View style={oddt.view2}>
                        <Text style={oddt.text7}>{t('orders.fees')}</Text>
                        <View style={[appst.rowCenter]}>
                          <View
                            style={[appst.rowCenter, {marginLeft: spacing.xm}]}>
                            <Image
                              style={oddt.icon}
                              source={require('../../assets/icons/vouchersss.png')}
                            />
                            <Text style={oddt.text8}>
                              {t('checkout.vouchers')}
                            </Text>
                          </View>
                          <Text style={oddt.text8}>0</Text>
                        </View>
                        <View style={[appst.rowCenter]}>
                          <View
                            style={[appst.rowCenter, {marginLeft: spacing.xm}]}>
                            <Image
                              style={oddt.icon}
                              source={require('../../assets/icons/point.png')}
                            />
                            <Text style={oddt.text8}>
                              {t('checkout.points')}
                            </Text>
                          </View>
                          <Text style={oddt.text8}>200</Text>
                        </View>
                      </View>
                    </View>

                    <View style={oddt.border} />

                    <View style={[oddt.body]}>
                      <Item
                        content1={t('orders.total')}
                        content2={
                          '$' + orderDetail.total_price &&
                          orderDetail.total_price.toLocaleString('vi-VN')
                        }
                      />
                      <Item
                        content1={t('setting.payment')}
                        content2={
                          orderDetail.payment_method ===
                          'Thanh toán khi nhận hàng'
                            ? 'COD'
                            : orderDetail.payment_method
                        }
                      />
                      <Item
                        content1={t('orders.shipprice')}
                        content2={
                          '$' + orderDetail.shipCost &&
                          orderDetail.shipCost.toLocaleString('vi-VN')
                        }
                      />
                    </View>

                    <View style={oddt.border} />

                    <View style={oddt.body}>
                      <Item2
                        contetn1={t('orders.time')}
                        content2={formatDate(orderDetail.timestamps.placedAt)}
                      />
                      {orderDetail.timestamps.paidAt && (
                        <Item2
                          contetn1={t('orders.payment')}
                          content2={formatDate(orderDetail.timestamps.paidAt)}
                        />
                      )}
                      {orderDetail.timestamps.shippedAt && (
                        <Item2
                          contetn1={t('orders.shipping')}
                          content2={formatDate(
                            orderDetail.timestamps.shippedAt,
                          )}
                        />
                      )}
                      {orderDetail.timestamps.deliveredAt && (
                        <Item2
                          contetn1={t('orders.delivery')}
                          content2={formatDate(
                            orderDetail.timestamps.deliveredAt,
                          )}
                        />
                      )}
                      {orderDetail.timestamps.completedAt && (
                        <Item2
                          contetn1={t('orders.complete')}
                          content2={formatDate(
                            orderDetail.timestamps.completedAt,
                          )}
                        />
                      )}
                      {orderDetail.timestamps.cancelledAt && (
                        <Item2
                          contetn1={t('orders.timeCancel')}
                          content2={formatDate(
                            orderDetail.timestamps.cancelledAt,
                          )}
                        />
                      )}
                    </View>
                  </View>
                </ScrollView>

                {orderDetail.orderStatus === 'completed'
                  ? ''
                  : orderDetail.orderStatus === 'delivered'
                  ? ''
                  : orderDetail.orderStatus === 'cancelled' && (
                      <View style={[appst.rowCenter, {marginHorizontal: 10}]}>
                        <TouchableOpacity
                          // onPress={() =>
                          //   gotoOrderDetail('CancelDetail', navigation, item)
                          // }
                          style={[
                            odit.press,
                            odit.press1,
                            {paddingHorizontal: 10, width: '47%', height: 40},
                          ]}>
                          <Text style={[odit.textTouch, odit.textTouch1]}>
                            {t('orders.watch_order_detail')}
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          // onPress={() => addToCart(productForCart)}
                          style={[
                            odit.press,
                            {
                              marginLeft: 10,
                              width: '47%',
                              height: 40,
                            },
                          ]}>
                          <Text style={odit.textTouch}>
                            {t('buttons.btn_buy_again')}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    )}

                {orderDetail.orderStatus !== 'completed' &&
                  orderDetail.orderStatus !== 'delivered' &&
                  orderDetail.orderStatus !== 'cancelled' && (
                    <CustomedButton
                      disabled={
                        orderDetail.orderStatus === 'processing' && true
                      }
                      title={t(titleButton)}
                      style={
                        orderDetail.orderStatus === 'processing'
                          ? oddt.disable
                          : oddt.press
                      }
                      titleStyle={
                        orderDetail.orderStatus === 'processing'
                          ? oddt.titleDisable
                          : oddt.titleStyle
                      }
                      onPress={() => handleOrderDetail()}
                    />
                  )}
              </View>
            ) : (
              <OrderDetailSkeleton />
            )}
          </View>

          {/* Confirmation Modal */}
          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}>
            <View style={styles.overlay}>
              <View style={styles.modalView}>
                <Text style={oddt.modalText1}>{t('home.noti')}</Text>
                <Text style={oddt.modalText}>{t('nothing.cancel_order')}</Text>
                <Image
                  source={require('../../assets/icons/warning.jpeg')}
                  style={{width: 100, height: 100}}
                />
                <View style={[oddt.modalButtonContainer]}>
                  <TouchableOpacity
                    style={oddt.modalbuttons}
                    onPress={confirmCancelOrder}>
                    <Text style={{color: 'white', fontWeight: 'bold'}}>
                      {t('buttons.btn_ok')}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={oddt.modalbuttons}
                    onPress={() => setModalVisible(false)}>
                    <Text style={{color: 'white', fontWeight: 'bold'}}>
                      {t('buttons.close')}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      )}
    </View>
  );
};

const styles = {
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
  },
  modalView: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    elevation: 5,
  },
};
export default OrderDetail;
