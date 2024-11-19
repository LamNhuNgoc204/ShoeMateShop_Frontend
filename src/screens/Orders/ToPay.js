import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useSelector} from 'react-redux';
import {
  ScrollView,
  FlatList,
  View,
  Text,
  Image,
  RefreshControl,
} from 'react-native';
import {odst} from './style.js';
import appst from '../../constants/AppStyle';
import OrderItem from '../../items/OrderItem/OrderItem.js';
import {getOrderPending} from '../../api/OrderApi.js';
import OrderHistorySkeleton from '../../placeholders/product/order/OrderHistory.js';
import {useTranslation} from 'react-i18next';
import ProductList from '../Product/ProductList.js';
import {shuffleArray} from '../../utils/functions/formatData.js';

const ToPay = ({navigation}) => {
  const {t} = useTranslation();
  const useAppSelector = useSelector;
  const products = useAppSelector(state => state.products);
  const [pendingOrders, setPendingOrders] = useState([]);
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
      const response = await getOrderPending();
      if (response.status) {
        setPendingOrders(response?.data?.reverse());
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

  return (
    <View style={appst.container}>
      {loading ? (
        <ScrollView
          ref={scrollViewRef}
          style={appst.container}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          {pendingOrders?.length !== 0 ? (
            <FlatList
              style={odst.flat1}
              data={pendingOrders}
              renderItem={({item}) => (
                <OrderItem navigation={navigation} item={item} />
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

          {/* <View style={appst.rowCenter}>
            <View style={odst.border} />
            <Text style={odst.text}>{t('products.similar_product')}</Text>
            <View style={odst.border} />
          </View> */}
          {/* <View style={{marginLeft: 20}}>
            <FlatList
              style={odst.flat2}
              data={products}
              renderItem={({item, index}) => (
                <ProductItem product={item} index={index} />
              )}
              keyExtractor={(item, index) =>
                item._id ? item._id : index.toString()
              }
              numColumns={2}
              scrollEnabled={false}
              contentContainerStyle={{
                alignItems: 'center',
                justifyContent: 'center',
                paddingBottom: 20,
              }}
            />
          </View> */}
          <ProductList listProduct={listProduct} wishList={products.wishList} />
        </ScrollView>
      ) : (
        <OrderHistorySkeleton />
      )}
    </View>
  );
};

export default ToPay;
