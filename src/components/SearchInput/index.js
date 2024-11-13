import { View, Text, Image, TextInput } from 'react-native'
import React from 'react'
import searchInputStyle from './style'
import { TouchableOpacity } from 'react-native-gesture-handler'

const SearchInput = ({ style, onChangeText, placeholder = 'Looking for shoe', onMicPress, editable = true, onEditPress, handleSubmit, value , autoFocus = false}) => {
    return (
        <View style={[searchInputStyle.searchContainer, style]}>
            <TouchableOpacity onPress={onEditPress} >
                <Image style={searchInputStyle.icon15} source={require('../../assets/icons/search.png')} />

            </TouchableOpacity>
            <TextInput autoFocus={autoFocus} value={value} onSubmitEditing={handleSubmit} editable={editable} onChangeText={onChangeText} style={searchInputStyle.input} placeholder={placeholder} />
            <Text>|   </Text>
            <TouchableOpacity onPress={onMicPress}>
                <Image style={searchInputStyle.icon15} source={require('../../assets/icons/ic_mic.png')} />
            </TouchableOpacity>
        </View>
    )
}


export default SearchInput