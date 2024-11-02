import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView, FlatList, Image} from 'react-native';
import {useSelector} from 'react-redux';
import {odst} from './style';
import appst from '../../constants/AppStyle';
import ProductItem from '../../items/ProductItem';
import OrderItem from '../../items/OrderItem/OrderItem';
import {getOrderCompeleted} from '../../api/OrderApi';
import OrderHistorySkeleton from '../../placeholders/product/order/OrderHistory';

const ToReceive = ({navigation}) => {
  const useAppSelector = useSelector;
  const products = useAppSelector(state => state.products.products);
  const [completedOrders, setCompletedOrders] = useState([]);
  const [loading, setLoading] = useState(false);

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

          <View style={appst.rowCenter}>
            <View style={odst.border} />
            <Text style={odst.text}>You May Also Like</Text>
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

export default ToReceive;
