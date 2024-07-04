import { View, Text, Image } from 'react-native'
import React from 'react'
import { c_outIt } from './style'
import appst from '../../constants/AppStyle'

const CheckOutItem = ({item}) => {
  return (
    <View style={[c_outIt.container]}>
      <Image style={c_outIt.image} source={require('../../assets/images/onboard1.png')} />
      <View style={c_outIt.viewText}>
        <Text style={c_outIt.name} numberOfLines={1}>Spring New Style Women Casual .....</Text>
        <Text style={c_outIt.text}>Size: <Text style={c_outIt.size1}>X</Text></Text>
        <Text style={c_outIt.text}>Price: <Text style={c_outIt.price1}>$11</Text></Text>
      </View>
    </View>
  )
}

export default CheckOutItem