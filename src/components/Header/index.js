import {View, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import appst from '../../constants/AppStyle';
import {hdst} from './style';

const Header = ({
  iconLeft,
  leftOnPress,
  name,
  iconRight,
  rightOnPress,
  backgroundColor,
  background,
}) => {
  return (
    <View
      style={[
        appst.rowCenter,
        hdst.container,
        {backgroundColor: backgroundColor},
      ]}>
      {iconLeft ? (
        <TouchableOpacity
          style={[hdst.press, {backgroundColor: background}]}
          onPress={leftOnPress}>
          <Image style={appst.icon24} source={iconLeft} />
        </TouchableOpacity>
      ) : (
        <View style={hdst.view} />
      )}
      <Text style={hdst.name}>{name}</Text>
      {iconRight ? (
        <TouchableOpacity style={hdst.press} onPress={rightOnPress}>
          <Image style={appst.icon24} source={iconRight} />
        </TouchableOpacity>
      ) : (
        <View style={hdst.view} />
      )}
    </View>
  );
};

export default Header;
