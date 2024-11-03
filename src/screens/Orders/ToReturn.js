import {View, Text, FlatList, Image, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import appst from '../../constants/AppStyle';
import {getOrderReturn} from '../../api/OrderApi';
import OrderHistorySkeleton from '../../placeholders/product/order/OrderHistory';
import {odst} from './style';
import {useSelector} from 'react-redux';
import OrderItem from '../../items/OrderItem/OrderItem';
import {useTranslation} from 'react-i18next';
import ProductItem from '../../items/ProductItem';

const ToReturn = ({navigation}) => {
  const {t} = useTranslation();
  const products = useSelector(state => state.products.products);
  const [returnOrder, setReturnOrder] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchOrder = async () => {
      setLoading(false);
      try {
        const response = await getOrderReturn();
        if (response.status) {
          setReturnOrder(response.data);
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
          {returnOrder.length !== 0 ? (
            <FlatList
              style={odst.flat1}
              data={returnOrder}
              renderItem={({item}) => (
                <OrderItem item={item} refunded={true} navigation={navigation} />
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

          <View style={appst.rowCenter}>
            <View style={odst.border} />
            <Text style={odst.text}>{t('products.similar_product')}</Text>
            <View style={odst.border} />
          </View>
          <View style={[appst.center]}>
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
              contentContainerStyle={{padding: 20}}
            />
          </View>
        </ScrollView>
      ) : (
        <OrderHistorySkeleton />
      )}
    </View>
  );
};

export default ToReturn;
