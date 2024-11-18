import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {View, Text, ScrollView, FlatList, Image} from 'react-native';
import {odst} from './style';
import appst from '../../constants/AppStyle';
import ProductItem from '../../items/ProductItem';
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

  useEffect(() => {
    if (products.products && products.products.length) {
      setListProduct(shuffleArray([...products.products]));
    }
  }, []);

  useEffect(() => {
    const fetchOrder = async () => {
      setLoading(false);
      try {
        const response = await getOrderCancell();
        if (response.status) {
          setCancelOrders(response.data);
          setLoading(true);
        }
      } catch (error) {
        setLoading(true);
        console.log('Get order error: ', error);
      }
    };
    fetchOrder();
  }, []);

  return (
    <View style={appst.container}>
      {loading ? (
        <ScrollView style={appst.container}>
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

          <ProductList listProduct={listProduct} wishList={products.wishList} />
        </ScrollView>
      ) : (
        <OrderHistorySkeleton />
      )}
    </View>
  );
};

export default Cancalled;
