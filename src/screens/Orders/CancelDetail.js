import {
  ActivityIndicator,
  FlatList,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../components/Header';
import {useTranslation} from 'react-i18next';
import {colors} from '../../constants/colors';
import CancelItem from '../../items/OrderItem/CancelItem';
import {oddt} from '../OrderDetail/style';
import {formatDate} from '../../utils/functions/formatData';
import odit from '../../items/OrderItem/style';
import {useSelector} from 'react-redux';
import ProductList from '../Product/ProductList';
import {useNavigation} from '@react-navigation/native';
import {getOrderDetail} from '../../api/OrderApi';
import OrderDetailSkeleton from '../../placeholders/product/order/OrderDetail';

const CancelDetail = ({route}) => {
  const navigation = useNavigation();
  const {t} = useTranslation();
  const {item} = route.params || {};
  const lstProducts = useSelector(state => state?.products?.products?.data);
  const [loading, setLoading] = useState(false);
  const [orderDetail, setOrderDetail] = useState({});
  const [isOverlayLoading, setIsOverlayLoading] = useState(false);

  console.log('cancel orderDetail===>', orderDetail);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(false);
        const response = await getOrderDetail(item._id);
        if (response) {
          setOrderDetail(response);
        }
      } catch (error) {
        console.log('error===>', error);
      } finally {
        setLoading(true);
      }
    };

    fetchData();
  }, []);

  const addToCart = async () => {
    setIsOverlayLoading(true);
    // console.log('productForCart==>', item?.orderDetails);
    let allOutOfStock = true;

    try {
      if (Array.isArray(item?.orderDetails)) {
        for (const product of item?.orderDetails) {
          const productId = product?.product?.id;
          const productSizeId = product?.product?.size_id;
          const productQuantity = product?.product?.pd_quantity;

          // Tìm sản phẩm trong lstProducts theo productId và productSizeId
          const productInList = lstProducts.find(
            item =>
              item._id === productId &&
              item.size.some(
                size => size.sizeId._id.toString() === productSizeId,
              ),
          );

          // Kiểm tra nếu sản phẩm có trong lstProducts và lấy số lượng tương ứng
          let quantityToAdd = productQuantity;

          if (productInList) {
            // Tìm size trong mảng size của sản phẩm
            const size = productInList.size.find(
              s => s.sizeId._id.toString() === productSizeId,
            );

            console.log('----size-----', size);

            if (size) {
              const availableQuantity = size.quantity;
              console.log('availableQuantity =>          ', availableQuantity);

              // Lấy số lượng nhỏ hơn hoặc bằng số lượng có sẵn
              quantityToAdd = Math.min(productQuantity, availableQuantity);

              if (quantityToAdd > 0) {
                allOutOfStock = false;
              }
            }
          }

          if (quantityToAdd === 0) {
            continue;
          }

          const itemCart = {
            product_id: productId,
            size_id: productSizeId,
            quantity: quantityToAdd,
          };

          console.log('itemCart==============>', itemCart);

          const response = await addItemToCartApi(itemCart);
          if (!response.status) {
            ToastAndroid.show(
              `${t('toast.addtocart_fail')}: ${product?.product?.name}`,
              ToastAndroid.SHORT,
            );
          }
        }

        if (allOutOfStock) {
          console.log('Sản phẩm này hết hàng, không thêm vào giỏ hàng');
          ToastAndroid.show(`${t('toast.out_of_stock')}`, ToastAndroid.SHORT);
        } else {
          ToastAndroid.show(`${t('toast.addtocart_succ')}`, ToastAndroid.SHORT);
          gotoCart(navigation);
        }
      }
    } catch (error) {
      console.log('lỗi thêm giỏ hàng received: ', error);

      ToastAndroid.show(`${t('toast.del_err')}`, ToastAndroid.SHORT);
    } finally {
      setIsOverlayLoading(false);
    }
  };

  return (
    <View style={st.container}>
      {!loading ? (
        <OrderDetailSkeleton />
      ) : (
        <>
          <Header
            backgroundColor={'white'}
            name={t('orders.cancel_detail')}
            iconLeft={require('../../assets/icons/back.png')}
            leftOnPress={() => navigation.goBack()}
          />
          <ScrollView style={{flex: 1}}>
            <View style={st.view1}>
              <View>
                <Text style={st.txt1}>{t('orders.complete_cancel')}</Text>
                <Text>
                  {t('orders.in')}{' '}
                  {formatDate(orderDetail?.timestamps?.cancelledAt)}
                </Text>
              </View>
              <Image
                source={require('../../assets/images/icon_cacelorder.png')}
                style={st.img}
              />
            </View>

            <View style={st.view3}>
              <Text style={st.text4}>{t('ship.infor')}</Text>
              <View style={oddt.row}>
                <Image
                  source={require('../../assets/icons/location.png')}
                  style={oddt.location}
                />
                <View>
                  <Text style={oddt.textt1}>{t('checkout.address')}:</Text>
                  <Text>
                    <Text style={oddt.text2}>
                      <Text style={oddt.text3}>
                        {orderDetail.receiver} | {orderDetail.receiverPhone}
                      </Text>{' '}
                      {'\n'}
                      {orderDetail.address}
                    </Text>
                  </Text>
                </View>
              </View>
            </View>

            <View style={st.view2}>
              <Text style={st.txt2}>{t('review.product')}</Text>
              <FlatList
                data={orderDetail.products}
                scrollEnabled={false}
                renderItem={pd => <CancelItem item={pd} />}
              />
            </View>

            <View style={st.view4}>
              <View style={st.viewSB}>
                <Text>{t('orders.code')}</Text>
                <Text>{orderDetail._id && orderDetail._id.toUpperCase()}</Text>
              </View>

              <View style={st.viewSB}>
                <Text>{t('orders.create_at')}</Text>
                <Text>
                  {orderDetail.timestamps &&
                    orderDetail.timestamps.placedAt &&
                    formatDate(orderDetail.timestamps.placedAt)}
                </Text>
              </View>
              <View style={st.viewSB}>
                <Text>{t('orders.requested_by')}</Text>
                <Text>
                  {orderDetail.timestamps &&
                    orderDetail.timestamps.cancelledAt &&
                    formatDate(orderDetail.timestamps.cancelledAt)}
                </Text>
              </View>
              <View style={st.viewSB}>
                <Text>{t('orders.creater_by')}</Text>
                <Text>{orderDetail.canceller}</Text>
              </View>
              <View style={st.viewSB}>
                <Text>{t('setting.payment')}</Text>
                <Text>
                  {orderDetail.payment_method === 'Thanh toán khi nhận hàng'
                    ? 'COD'
                    : orderDetail.payment_method}
                </Text>
              </View>
            </View>

            <View style={st.view5}>
              <ProductList listProduct={lstProducts} />
            </View>
          </ScrollView>
          <TouchableOpacity
            onPress={addToCart}
            style={[odit.press, {marginHorizontal: 10, paddingVertical: 5}]}>
            <Text style={odit.textTouch}>{t('buttons.btn_buy_again')}</Text>
          </TouchableOpacity>
        </>
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

export default CancelDetail;

const st = StyleSheet.create({
  text5: {fontSize: 16, marginHorizontal: 5, color: 'black'},
  view5: {
    marginTop: 10,
    borderRadius: 10,
    backgroundColor: 'white',
    paddingTop: 20,
  },
  viewSB: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  view4: {
    marginTop: 10,
    backgroundColor: 'white',
    marginHorizontal: 10,
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  text4: {
    marginBottom: 10,
    marginHorizontal: 20,
    fontSize: 16,
    textDecorationLine: 'underline',
    color: 'black',
  },
  view3: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginHorizontal: 10,
    paddingVertical: 10,
    marginTop: 10,
  },
  txt2: {
    fontSize: 16,
    color: 'black',
    textDecorationLine: 'underline',
  },
  container: {
    flex: 1,
    backgroundColor: colors.background_secondary,
  },
  view1: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginTop: 10,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  img: {
    width: 50,
    height: 50,
  },
  txt1: {
    color: colors.primary,
    fontSize: 18,
  },
  view2: {
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    marginHorizontal: 10,
  },
});
