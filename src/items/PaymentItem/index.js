import React from 'react';
import pay from './style';
import {Text, Image, TouchableOpacity} from 'react-native';
import appst from '../../constants/AppStyle';

const PaymentItem = ({item, onPress}) => {
  //   console.log('item payment', item);

  return (
    <TouchableOpacity onPress={() => onPress(item.item)} style={pay.container}>
      <Image
        style={appst.icon50}
        source={
          item.item && item.item.image
            ? {uri: item.item.image}
            : require('../../assets/images/placeholder_image.jpg')
        }
      />
      <Text style={pay.text1}>{item.item.payment_method}</Text>
    </TouchableOpacity>
  );
};

export default PaymentItem;
