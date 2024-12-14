import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  FlatList,
  Image,
  RefreshControl,
  Modal,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import {useSelector} from 'react-redux';
import {odst} from './style';
import appst from '../../constants/AppStyle';
import OrderItem from '../../items/OrderItem/OrderItem';
import {getOrderCompeleted} from '../../api/OrderApi';
import OrderHistorySkeleton from '../../placeholders/product/order/OrderHistory';
import {useTranslation} from 'react-i18next';
import ProductList from '../Product/ProductList';
import {shuffleArray} from '../../utils/functions/formatData';
import {addItemToCartApi} from '../../api/CartApi';
import {gotoCart} from '../../utils/functions/navigationHelper';

const ToReceive = ({navigation}) => {
  const {t} = useTranslation();
  const useAppSelector = useSelector;
  const products = useAppSelector(state => state.products);
  const [completedOrders, setCompletedOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [listProduct, setListProduct] = useState([]);
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
      const response = await getOrderCompeleted();
      if (response.status) {
        setCompletedOrders(response?.data);
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

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchOrder().then(() => setRefreshing(false));
  }, []);

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
        gotoCart(navigation);
      }
    } catch (error) {
      console.log('lỗi thêm giỏ hàng received: ', error);

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
          {completedOrders.length !== 0 ? (
            <FlatList
              style={odst.flat1}
              data={completedOrders}
              renderItem={({item, index}) => (
                <OrderItem
                  addToCart={addToCart}
                  item={item}
                  receive={true}
                  navigation={navigation}
                />
              )}
              keyExtractor={(item, index) =>
                item._id ? item._id : index.toString()
              }
              scrollEnabled={false}
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

export default ToReceive;
