import { View, Text, Image, TextInput } from 'react-native'
import React from 'react'
import toolBarStyle from '../ToolBar/style'
import searchInputStyle from './style'
import { TouchableOpacity } from 'react-native-gesture-handler'

const SearchInput = ({ style, onChangeText, placeholder = 'Looking for shoe',  onMicPress}) => {
    return (
        <View style={[searchInputStyle.searchContainer, style]}>
            <Image style={searchInputStyle.icon15} source={require('../../assets/icons/search.png')} />
            <TextInput onChangeText={onChangeText} style={searchInputStyle.input} placeholder={placeholder} />
            <Text>|   </Text>
            <TouchableOpacity onPress={onMicPress}>
                <Image style={searchInputStyle.icon15} source={require('../../assets/icons/ic_mic.png')} />
            </TouchableOpacity>
        </View>
    )
}


export default SearchInput