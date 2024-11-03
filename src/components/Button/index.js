import {Text, TouchableOpacity} from 'react-native';
import React from 'react';
import buttonStyle from './style';

const CustomedButton = ({onPress, disabled, style, titleStyle, title}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={[buttonStyle.container, buttonStyle, style]}>
      <Text style={[buttonStyle.text, titleStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomedButton;
