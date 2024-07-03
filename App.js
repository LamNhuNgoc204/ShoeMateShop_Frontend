import { View, Text } from 'react-native'
import React from 'react'
import appst from './src/constants/AppStyle'
import HomeScreen from './src/screens/HomeScreen'

const App = () => {
  return (
    <View style={appst.container}>
      <HomeScreen/>
    </View>
  )
}

export default App