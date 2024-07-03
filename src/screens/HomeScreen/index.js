import { View, Text } from 'react-native'
import React from 'react'
import homeStyle from './style'
import ToolBar from '../../components/ToolBar'

const HomeScreen = () => {
  return (
    <View style={homeStyle.container}>
      <ToolBar iconRight={require('../../assets/icons/message.png')}/>
    </View>
  )
}

export default HomeScreen