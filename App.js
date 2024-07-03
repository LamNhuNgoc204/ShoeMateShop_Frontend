import { View, Text } from 'react-native'
import React from 'react'
import { fonts } from './src/constants/fonts'
import { colors } from './src/constants/colors'
import appst from './src/constants/AppStyle'
import OnBoardScreen from './src/screens/OnBoardScreen'

const App = () => {
  return (
    <View style={appst.container}>
      <OnBoardScreen/>
    </View>
  )
}

export default App