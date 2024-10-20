import React from 'react';
import {useSelector} from 'react-redux';
import {ScrollView, FlatList, View, Text} from 'react-native';
import {odst} from './style.js';
import appst from '../../constants/AppStyle';
import ProductItem from '../../items/ProductItem/index.js';
import OrderItem from '../../items/OrderItem/OrderItem.js';

const ToPay = () => {
  const useAppSelector = useSelector;
  const products = useAppSelector(state => state.products.products);

  return (
    <ScrollView style={appst.container}>
      <FlatList
        style={odst.flat1}
        data={[1, 2]}
        renderItem={({item}) => <OrderItem item={item} />}
        keyExtractor={(item, index) => (item._id ? item._id : index.toString())}
        scrollEnabled={false}
      />
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
          keyExtractor={item => item.id}
          numColumns={2}
          scrollEnabled={false}
          contentContainerStyle={{
            alignItems: 'center', // Căn giữa theo chiều ngang
            justifyContent: 'center', // Căn giữa theo chiều dọc
            paddingBottom: 20, // Thêm khoảng cách dưới cùng nếu cần
          }}
        />
      </View>
    </ScrollView>
  );
};

export default ToPay;
