import { View, Text } from 'react-native'
import React from 'react'
import { fonts } from './src/constants/fonts'
import { colors } from './src/constants/colors'

const App = () => {
  return (
    <View style={{backgroundColor: colors.background_primary}}>
      <Text style={{fontFamily: fonts.rlw_Italic, fontSize: 20}}>App</Text>
    </View>
  )
}

export default App