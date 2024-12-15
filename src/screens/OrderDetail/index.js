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
import {
  cancelOrder,
  getOrderDetail,
  updateOrderStatus,
} from '../../api/OrderApi';
import OrderItemDetail from '../../items/OrderItem/OrderItemDetail';
import {formatDate, formatPrice} from '../../utils/functions/formatData';
import Loading from '../../components/Loading';
import odit from '../../items/OrderItem/style';
import {addItemToCartApi} from '../../api/CartApi';
import {ActivityIndicator} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';

const OrderDetail = ({route}) => {
  const {item} = route.params;
  const {t, i18n} = useTranslation();
  const lag = i18n.language;
  const [loading, setLoading] = useState(false);
  const [orderDetail, setOrderDetail] = useState({});
  const [titleButton, setTitleButton] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [isCancel, setisCancel] = useState(false);
  const navigation = useNavigation();
  const [isOverlayLoading, setIsOverlayLoading] = useState(false);
  const lstProducts = useSelector(state => state?.products?.products?.data);

  const addToCart = async () => {
    setIsOverlayLoading(true);
    // console.log('productForCart==>', item?.orderDetails);

    try {
      if (Array.isArray(item?.orderDetails)) {
        for (const product of item?.orderDetails) {
          const itemCart = {
            product_id: product?.product?.id,
            size_id: product?.product?.size_id,
            quantity: product?.product?.pd_quantity,
          };
          const response = await addItemToCartApi(itemCart);
          if (!response.status) {
            ToastAndroid.show(
              `Không thể thêm sản phẩm: ${product?.product?.name}`,
              ToastAndroid.SHORT,
            );
          }
        }
        ToastAndroid.show(
          'Thêm tất cả sản phẩm vào giỏ hàng thành công',
          ToastAndroid.SHORT,
        );
        navigation.reset({
          // Đảm bảo tab này là tab đầu tiên khi reset
          index: 0,
          routes: [{name: 'BottomNav', params: {screen: 'CartScreen'}}],
        });
      }
    } catch (error) {
      console.log('Lỗi them sp vào giỏ hàng: ', error);

      ToastAndroid.show(
        'Lỗi trong quá trình thêm vào giỏ hàng',
        ToastAndroid.SHORT,
      );
    } finally {
      setIsOverlayLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(false);
      const response = await getOrderDetail(item._id);
      if (response) {
        setOrderDetail(response);
        if (response.orderStatus === 'pending') {
          setTitleButton('orders.cancelled');
        } else if (response.orderStatus === 'processing') {
          setTitleButton('orders.status_process');
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

  const orderTotal = orderDetail?.products?.reduce((total, product) => {
    const price = product.product?.price || 0;
    const quantity = product.product?.pd_quantity || 0;
    return total + price * quantity;
  }, 0);

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
              <View style={oddt.body1}>
                <ScrollView>
                  <View style={oddt.itemContainer}>
                    <View style={oddt.row}>
                      <Image
                        source={require('../../assets/icons/location.png')}
                        style={oddt.location}
                      />
                      <View>
                        <Text style={oddt.txt1}>{t('checkout.address')}:</Text>
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
                            ? `${t('orders.pending')}`
                            : ''}
                        </Text>
                      </Text>
                      <View style={[appst.rowCenter]}>
                        <Text style={oddt.text7}>
                          {t('orders.order_total')}
                        </Text>
                        <Text style={oddt.text7}>
                          {lag === 'en' && '$'}
                          {formatPrice(orderTotal, lag)}
                          {lag === 'vi' && ' VNĐ '}
                        </Text>
                      </View>
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
                          lag === 'en'
                            ? '$' + formatPrice(orderDetail.total_price, lag)
                            : lag === 'vi'
                            ? formatPrice(orderDetail.total_price, lag) + ' VNĐ'
                            : ''
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
                          lag === 'en'
                            ? '$' + formatPrice(orderDetail.shipCost, lag)
                            : lag === 'vi'
                            ? formatPrice(orderDetail.shipCost, lag) + ' VNĐ'
                            : ''
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

                {orderDetail.orderStatus === 'completed' ? (
                  <View style={[appst.rowCenter, {marginHorizontal: 10}]}>
                    <TouchableOpacity
                      onPress={() => addToCart()}
                      style={[odit.press, oddt.button]}>
                      <Text style={odit.textTouch}>
                        {true ? t('orders.return') : t('buttons.btn_buy_again')}
                      </Text>
                    </TouchableOpacity>
                    {item.isReviewed ? (
                      <TouchableOpacity
                        onPress={() => navigation.navigate('ProductReviews')}
                        style={[odit.press, oddt.button]}>
                        <Text style={odit.textTouch}>{t('review.see')}</Text>
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate('MultiProductReviewForm', {
                            products: item.orderDetails,
                            orderId: item._id,
                          })
                        }
                        style={[odit.press, oddt.button]}>
                        <Text style={odit.textTouch}>{t('review.review')}</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                ) : orderDetail.orderStatus === 'delivered' ? (
                  <View style={[appst.rowCenter, {marginHorizontal: 10}]}>
                    <TouchableOpacity
                      style={[odit.press, odit.press1, oddt.button]}>
                      <Text style={[odit.textTouch, odit.textTouch1]}>
                        {t('orders.return')}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate('OrderScreen', {
                          initialRoute: t('orders.completed'),
                        });
                        updateOrderStatus(item._id);
                      }}
                      style={[odit.press, oddt.button]}>
                      <Text style={odit.textTouch}>{t('orders.received')}</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  orderDetail.orderStatus === 'cancelled' && (
                    <View style={[appst.center, {marginHorizontal: 10}]}>
                      <TouchableOpacity
                        onPress={() => addToCart()}
                        style={[
                          odit.press,
                          {
                            width: '90%',
                            height: 40,
                          },
                        ]}>
                        <Text style={odit.textTouch}>
                          {t('buttons.btn_buy_again')}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  )
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
            <View style={oddt.overlay}>
              <View style={oddt.modalView}>
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
                    <Text style={oddt.text1}>{t('buttons.btn_ok')}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={oddt.modalbuttons}
                    onPress={() => setModalVisible(false)}>
                    <Text style={oddt.text1}>{t('buttons.close')}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      )}

      <Modal transparent={true} visible={isOverlayLoading}>
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

export default OrderDetail;
