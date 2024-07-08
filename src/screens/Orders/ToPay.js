import {ScrollView, FlatList, View, Text} from 'react-native';
import React from 'react';
import appst from '../../constants/AppStyle';
import {odst} from './style.js';
import ProductItem from '../../items/ProductItem/index.js';
import OrderItem from '../../items/OrderItem/OrderItem.js';

const ToPay = () => {
  return (
    <ScrollView style={appst.container}>
      <FlatList
        style={odst.flat1}
        data={[1, 2]}
        renderItem={({item}) => <OrderItem item={item} />}
        extraData={item => item.id}
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
          data={[3, 4, 5, 6, 7, 8]}
          renderItem={({item, index}) => (
            <ProductItem product={item} index={index} />
          )}
          keyExtractor={item => item.id}
          numColumns={2}
          scrollEnabled={false}
        />
      </View>
    </ScrollView>
  );
};

export default ToPay;
