import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import toolBarStyle from './style'
import appst from '../../constants/AppStyle'


const SearchInput = ({ style, onChangeText, placeholder = 'Looking for shoe' }) => {
    return (
        <View style={[toolBarStyle.searchContainer, style]}>
            <Image style={toolBarStyle.icon15} source={require('../../assets/icons/search.png')} />
            <TextInput onChangeText={onChangeText} style={toolBarStyle.input} placeholder={placeholder} />
        </View>
    )
}

const ToolBar = ({ iconRight, iconLeft, style, onIconRightPress, onIconLeftPress, title, onChangeText, placeholder }) => {
    return (
        <View style={[toolBarStyle.container, style]}>
            <TouchableOpacity onPress={onIconLeftPress} style={[toolBarStyle.icon35, !iconLeft && toolBarStyle.hide]}>
                <Image source={iconLeft || require('../../assets/icons/message.png')} />
            </TouchableOpacity>
            {
                title ? (
                    <Text style={toolBarStyle.title}>Title</Text>
                ) : (
                    <SearchInput placeholder={placeholder} onChangeText={onChangeText} style={[iconRight && toolBarStyle.marginRight20, iconLeft && toolBarStyle.marginLeft20]} />

                )
            }
            <TouchableOpacity onPress={onIconRightPress} style={[toolBarStyle.icon35, !iconRight && toolBarStyle.hide]}>
                <Image source={iconRight || require('../../assets/icons/message.png')} />
            </TouchableOpacity>
        </View>
    )
}

export default ToolBar