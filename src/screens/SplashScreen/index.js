import { View, Text, Image } from 'react-native'
import React from 'react'
import appst from '../../constants/AppStyle'
import splashStyle from './style'

const SplashScreen = () => {
  return (
    <View style={[appst.container, splashStyle.container]}>
      <Image style={splashStyle.logo} source={require('../../assets/images/logo.png')} />
    </View>
  )
}

export default SplashScreen