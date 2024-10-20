import React from 'react';
import {useSelector} from 'react-redux';
import {View, Text, ScrollView, FlatList} from 'react-native';
import {odst} from './style';
import appst from '../../constants/AppStyle';
import ProductItem from '../../items/ProductItem';
import OrderItem from '../../items/OrderItem/OrderItem';

const Cancalled = () => {
  const useAppSelector = useSelector;
  const products = useAppSelector(state => state.products.products);

  return (
    <ScrollView style={appst.container}>
      <FlatList
        style={odst.flat1}
        data={[1, 2]}
        renderItem={({item}) => <OrderItem item={item} cancel={true} />}
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
          keyExtractor={item => item._id}
          numColumns={2}
          scrollEnabled={false}
        />
      </View>
    </ScrollView>
  );
};

export default Cancalled;
