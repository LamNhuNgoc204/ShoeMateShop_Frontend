import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useSelector} from 'react-redux';
import {
  View,
  Text,
  ScrollView,
  FlatList,
  Image,
  RefreshControl,
} from 'react-native';
import {odst} from './style';
import appst from '../../constants/AppStyle';
import OrderItem from '../../items/OrderItem/OrderItem';
import {getOrderCancell} from '../../api/OrderApi';
import OrderHistorySkeleton from '../../placeholders/product/order/OrderHistory';
import {useTranslation} from 'react-i18next';
import ProductList from '../Product/ProductList';
import {shuffleArray} from '../../utils/functions/formatData';

const Cancalled = ({navigation}) => {
  const {t} = useTranslation();
  const useAppSelector = useSelector;
  const products = useAppSelector(state => state.products);
  const [cancelOrders, setCancelOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [listProduct, setListProduct] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

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
    if (products.products && products.products.length) {
      setListProduct(shuffleArray([...products.products]));
    }
  }, []);

  const fetchOrder = async () => {
    setLoading(false);
    try {
      const response = await getOrderCancell();
      if (response.status) {
        setCancelOrders(response?.data?.reverse());
        setLoading(true);
      }
    } catch (error) {
      setLoading(true);
      console.log('Get order error: ', error);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchOrder().then(() => setRefreshing(false));
  }, []);

  return (
    <View style={appst.container}>
      {loading ? (
        <ScrollView
          ref={scrollViewRef}
          style={appst.container}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          {cancelOrders.length !== 0 ? (
            <FlatList
              style={odst.flat1}
              data={cancelOrders}
              renderItem={({item}) => (
                <OrderItem item={item} cancel={true} navigation={navigation} />
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
    </View>
  );
};

export default Cancalled;
