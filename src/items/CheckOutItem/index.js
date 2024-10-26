import React from 'react';
import {View, Text, Image} from 'react-native';
import {c_outIt} from './style';

const CheckOutItem = ({item}) => {
  // console.log('item', item);
  // console.log('assets', item.product_id.assets[0]);

  return (
    <View style={[c_outIt.container]}>
      <Image
        style={c_outIt.image}
        source={
          item.product_id.assets &&
          item.product_id.assets &&
          item.product_id.assets.length > 0
            ? {uri: item.product_id.assets[0]}
            : require('../../assets/images/placeholder_image.jpg')
        }
      />
      <View style={c_outIt.viewText}>
        <Text style={c_outIt.name} numberOfLines={1}>
          {item.product_id.name}
        </Text>
        <Text style={c_outIt.text}>
          Size: <Text style={c_outIt.size1}>{item.size_id.name}</Text>
        </Text>
        <Text style={c_outIt.text}>
          Quantity: <Text style={c_outIt.size1}> {item.quantity}</Text>
        </Text>
        <Text style={c_outIt.text}>
          Price:
          <Text style={c_outIt.price1}>
            {' '}
            ${item && item.product_id.price.toLocaleString('vi-VN')}
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default CheckOutItem;
