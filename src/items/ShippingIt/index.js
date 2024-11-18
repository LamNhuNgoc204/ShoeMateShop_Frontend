import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import itship from './style';
import appst from '../../constants/AppStyle';
import {colors} from '../../constants/colors';

const ShipItem = ({item, id, isDefault, onSelect}) => {
  return (
    <TouchableOpacity
      onPress={() => onSelect(item.item)}
      style={itship.container}>
      <View style={isDefault && id === item?.item?._id && itship.border}>
        <View style={itship.view1}>
          <Text style={itship.text1}>
            {item.item.name}{' '}
            <Text style={{color: colors.primary}}>{item.item.cost}d</Text>
          </Text>
          <Text style={{color: 'black'}}>
            Dam bao nhan hang tu {item.item.deliveryTime}{' '}
          </Text>
          <Text>
            Kenh giao hang co the can them thoi gian xu ly do thoi tiet
          </Text>
        </View>
      </View>

      {isDefault && id === item?.item?._id && (
        <Image
          style={[appst.icon24]}
          source={require('../../assets/icons/check.png')}
        />
      )}
    </TouchableOpacity>
  );
};

export default ShipItem;
