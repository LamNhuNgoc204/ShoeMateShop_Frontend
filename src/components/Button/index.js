import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import buttonStyle from './style'

const CustomedButton = ({onPress, style, titleStyle, title}) => {
  return (
    <TouchableOpacity onPress={onPress} style={[buttonStyle.container, buttonStyle]}>
      <Text style={[buttonStyle.text, titleStyle]}>{title}</Text>
    </TouchableOpacity>
  )
}

export default CustomedButton