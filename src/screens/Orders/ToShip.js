import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {View, Text, FlatList, ScrollView, Image} from 'react-native';
import {odst} from './style';
import appst from '../../constants/AppStyle';
import OrderItem from '../../items/OrderItem/OrderItem.js';
import {getOrderProcess} from '../../api/OrderApi.js';
import OrderHistorySkeleton from '../../placeholders/product/order/OrderHistory.js';
import {useTranslation} from 'react-i18next';
import ProductList from '../Product/ProductList.js';
import {shuffleArray} from '../../utils/functions/formatData.js';

const ToShip = ({navigation}) => {
  const {t} = useTranslation();
  const useAppSelector = useSelector;
  const products = useAppSelector(state => state.products);
  const [processOrders, setProcessOrders] = useState([]);
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
        const response = await getOrderProcess();
        if (response.status) {
          setProcessOrders(response.data);
          setLoading(true);
        }
      } catch (error) {
        console.log('Get order error: ', error);
        setLoading(true);
      }
    };
    fetchOrder();
  }, []);

  // console.log('processOrders', processOrders);

  return (
    <View style={appst.container}>
      {loading ? (
        <ScrollView style={appst.container}>
          {processOrders.length !== 0 ? (
            <FlatList
              style={odst.flat1}
              data={processOrders.slice().reverse()}
              renderItem={({item}) => (
                <OrderItem item={item} navigation={navigation} ship={true} />
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

          <ProductList listProduct={listProduct} wishList={products.wishList} />
        </ScrollView>
      ) : (
        <OrderHistorySkeleton />
      )}
    </View>
  );
};

export default ToShip;
