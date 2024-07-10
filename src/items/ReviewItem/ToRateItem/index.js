import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { rtit } from './style'
import appst from '../../../constants/AppStyle'

const RatingItem = ({item}) => {
  return (
    <View style={rtit.container}>
      <Text style={rtit.code}>Product code: ahgJuOR846Kc</Text>
      <View style={rtit.itemContainer}>
        <Image style={rtit.img} source={require('../../../assets/images/onboard3.png')} />
        <Text style={rtit.name}>Blue Blue Sky</Text>
      </View>
      <View style={[appst.rowCenter, rtit.view]}>
        <Text style={rtit.time}>7 days left to review</Text>
        <TouchableOpacity style={rtit.press}>
            <Text style={rtit.textTouch}>Review Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default RatingItem