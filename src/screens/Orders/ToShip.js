import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {View, Text, FlatList, ScrollView, Image} from 'react-native';
import {odst} from './style';
import appst from '../../constants/AppStyle';
import ProductItem from '../../items/ProductItem/index.js';
import OrderItem from '../../items/OrderItem/OrderItem.js';
import {getOrderProcess} from '../../api/OrderApi.js';

const ToShip = () => {
  const useAppSelector = useSelector;
  const products = useAppSelector(state => state.products.products);
  const [processOrders, setProcessOrders] = useState([]);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await getOrderProcess();
        if (response.status) {
          setProcessOrders(response.data);
        }
      } catch (error) {
        console.log('Get order error: ', error);
      }
    };
    fetchOrder();
  }, []);

  return (
    <ScrollView style={appst.container}>
      {processOrders.length !== 0 ? (
        <FlatList
          style={odst.flat1}
          data={processOrders}
          renderItem={({item}) => <OrderItem item={item} />}
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
        />
      </View>
    </ScrollView>
  );
};

export default ToShip;
