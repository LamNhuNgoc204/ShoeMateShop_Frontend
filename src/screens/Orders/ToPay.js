import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {ScrollView, FlatList, View, Text, Image} from 'react-native';
import {odst} from './style.js';
import appst from '../../constants/AppStyle';
import ProductItem from '../../items/ProductItem/index.js';
import OrderItem from '../../items/OrderItem/OrderItem.js';
import {getOrderPending} from '../../api/OrderApi.js';
import OrderHistorySkeleton from '../../placeholders/product/order/OrderHistory.js';

const ToPay = () => {
  const useAppSelector = useSelector;
  const products = useAppSelector(state => state.products.products);
  const [pendingOrders, setPendingOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchOrder = async () => {
      setLoading(false);
      try {
        const response = await getOrderPending();
        if (response.status) {
          setPendingOrders(response.data);
          setLoading(true);
        }
      } catch (error) {
        console.log('Get order error: ', error);
        setLoading(true);
      }
    };
    fetchOrder();
  }, []);

  console.log('initialParams={{ orders }} ', pendingOrders);

  return (
    <View style={appst.container}>
      {loading ? (
        <ScrollView style={appst.container}>
          {pendingOrders.length !== 0 ? (
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
              <Text style={odst.text1}>You don't have any orders yet</Text>
            </View>
          )}

          <View style={appst.rowCenter}>
            <View style={odst.border} />
            <Text style={odst.text}>You May Also Like</Text>
            <View style={odst.border} />
          </View>
          <View style={{marginLeft: 20}}>
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
          </View>
        </ScrollView>
      ) : (
        <OrderHistorySkeleton />
      )}
    </View>
  );
};

export default ToPay;
