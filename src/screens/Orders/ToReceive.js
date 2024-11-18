import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView, FlatList, Image} from 'react-native';
import {useSelector} from 'react-redux';
import {odst} from './style';
import appst from '../../constants/AppStyle';
import ProductItem from '../../items/ProductItem';
import OrderItem from '../../items/OrderItem/OrderItem';
import {getOrderCompeleted} from '../../api/OrderApi';
import OrderHistorySkeleton from '../../placeholders/product/order/OrderHistory';
import {useTranslation} from 'react-i18next';
import ProductList from '../Product/ProductList';
import {shuffleArray} from '../../utils/functions/formatData';

const ToReceive = ({navigation}) => {
  const {t} = useTranslation();
  const useAppSelector = useSelector;
  const products = useAppSelector(state => state.products);
  const [completedOrders, setCompletedOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [listProduct, setListProduct] = useState([]);

  useEffect(() => {
    if (products.products && products.products.length) {
      setListProduct(shuffleArray([...products.products]));
    }
  }, []);

  useEffect(() => {
    const fetchOrder = async () => {
      setLoading(false);
      try {
        const response = await getOrderCompeleted();
        if (response.status) {
          setCompletedOrders(response.data);
          setLoading(true);
        }
      } catch (error) {
        console.log('Get order error: ', error);
        setLoading(true);
      }
    };
    fetchOrder();
  }, []);

  return (
    <View style={appst.container}>
      {loading ? (
        <ScrollView style={appst.container}>
          {completedOrders.length !== 0 ? (
            <FlatList
              style={odst.flat1}
              data={completedOrders}
              renderItem={({item, index}) => (
                <OrderItem item={item} receive={true} navigation={navigation} />
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

          <ProductList listProduct={listProduct} wishList={products.wishList} />
        </ScrollView>
      ) : (
        <OrderHistorySkeleton />
      )}
    </View>
  );
};

export default ToReceive;
