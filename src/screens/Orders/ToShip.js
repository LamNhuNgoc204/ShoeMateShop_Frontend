import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useSelector} from 'react-redux';
import {
  View,
  Text,
  FlatList,
  ScrollView,
  Image,
  RefreshControl,
  ToastAndroid,
  Modal,
  ActivityIndicator,
} from 'react-native';
import {odst} from './style';
import appst from '../../constants/AppStyle';
import OrderItem from '../../items/OrderItem/OrderItem.js';
import {
  getOrderProcess,
  handleReturnRq,
  updateOrderStatus,
} from '../../api/OrderApi.js';
import OrderHistorySkeleton from '../../placeholders/product/order/OrderHistory.js';
import {useTranslation} from 'react-i18next';
import ProductList from '../Product/ProductList.js';
import {shuffleArray} from '../../utils/functions/formatData.js';
import {gotoCart} from '../../utils/functions/navigationHelper.js';
import {addItemToCartApi} from '../../api/CartApi.js';

const ToShip = ({navigation}) => {
  const {t} = useTranslation();
  const useAppSelector = useSelector;
  const products = useAppSelector(state => state.products);
  const [listProduct, setListProduct] = useState([]);
  const [processOrders, setProcessOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [isOverlayLoading, setIsOverlayLoading] = useState(false);

  const scrollViewRef = useRef(null);

  useEffect(() => {
    const unsubscribe = navigation.addListener('tabPress', () => {
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollTo({y: 0, animated: true});
      }
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    if (products?.products?.data && products?.products?.data?.length) {
      setListProduct(shuffleArray(products?.products?.data));
    }
  }, []);

  const fetchOrder = async () => {
    setLoading(false);
    try {
      const response = await getOrderProcess();
      if (response.status) {
        setProcessOrders(response?.data);
        setLoading(true);
      }
    } catch (error) {
      console.log('Get order error: ', error);
      setLoading(true);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, []);

  // console.log('processOrders', processOrders);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchOrder().then(() => setRefreshing(false));
  }, []);

  const cofirmOrder = async id => {
    try {
      const response = await updateOrderStatus(id, 'completed');
      if (response.status) {
        ToastAndroid.show('Đã xác nhận nhận hàng', ToastAndroid.SHORT);
        navigation.navigate('OrderScreen', {
          initialRoute: t('orders.completed'),
        });
      }
    } catch (error) {
      console.log('update status order error: ', error);
    }
  };

  const requestReturnOrder = async (id, reason) => {
    console.log('requestReturnOrder-------------------- ');

    try {
      const response = await handleReturnRq(id, reason);
      if (response.status) {
        ToastAndroid.show('Đã gửi yêu cầu hoàn hàng', ToastAndroid.SHORT);
        navigation.navigate('OrderScreen', {
          initialRoute: t('orders.return'),
        });
      }
    } catch (error) {
      console.log('request status order error: ', error);
    }
  };

  const addToCart = async productForCart => {
    setIsOverlayLoading(true);
    // console.log('productForCart==>', productForCart);

    try {
      if (Array.isArray(productForCart)) {
        for (const product of productForCart) {
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
        gotoCart();
      }
    } catch (error) {
      ToastAndroid.show(
        'Lỗi trong quá trình thêm vào giỏ hàng',
        ToastAndroid.SHORT,
      );
    } finally {
      setIsOverlayLoading(false);
    }
  };

  return (
    <View style={appst.container}>
      {loading ? (
        <ScrollView
          ref={scrollViewRef}
          style={appst.container}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          {processOrders.length !== 0 ? (
            <FlatList
              style={odst.flat1}
              data={processOrders}
              renderItem={({item}) => (
                <OrderItem
                  addToCart={addToCart}
                  item={item}
                  navigation={navigation}
                  ship={true}
                  updateOrderStatus={cofirmOrder}
                  requestReturnOrder={requestReturnOrder}
                />
              )}
              keyExtractor={(item, index) =>
                item._id ? item._id : index.toString()
              }
              scrollEnabled={false}
              revert
            />
          ) : (
            <View style={[appst.center, odst.view]}>
              <Image
                style={odst.img}
                source={require('../../assets/images/order.png')}
              />
              <Text style={odst.text1}>{t('orders.no_order')}</Text>
            </View>
          )}

          <ProductList listProduct={listProduct} />
        </ScrollView>
      ) : (
        <OrderHistorySkeleton />
      )}

      {/* Cho them gio hang */}
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

export default ToShip;
