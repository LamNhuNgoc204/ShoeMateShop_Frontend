import {
  View,
  Text,
  FlatList,
  Image,
  ScrollView,
  RefreshControl,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import appst from '../../constants/AppStyle';
import {getOrderReturn} from '../../api/OrderApi';
import OrderHistorySkeleton from '../../placeholders/product/order/OrderHistory';
import {odst} from './style';
import {useSelector} from 'react-redux';
import OrderItem from '../../items/OrderItem/OrderItem';
import {useTranslation} from 'react-i18next';
import ProductList from '../Product/ProductList';
import {shuffleArray} from '../../utils/functions/formatData';

const ToReturn = ({navigation}) => {
  const {t} = useTranslation();
  const products = useSelector(state => state.products);
  const [returnOrder, setReturnOrder] = useState([]);
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
    if (products?.products?.data && products?.products?.data?.length) {
      setListProduct(shuffleArray(products?.products?.data));
    }
  }, []);

  const fetchOrder = async () => {
    setLoading(false);
    try {
      const response = await getOrderReturn();
      if (response.status) {
        setReturnOrder(response?.data?.reverse());
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
          {returnOrder.length !== 0 ? (
            <FlatList
              style={odst.flat1}
              data={returnOrder}
              renderItem={({item}) => (
                <OrderItem
                  item={item}
                  refunded={true}
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
              <Text style={[odst.text1, {marginTop: 5}]}>
                {t('orders.no_order')}
              </Text>
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

export default ToReturn;
