import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import toolBarStyle from './style'
import appst from '../../constants/AppStyle'
import SearchInput from '../SearchInput'



const ToolBar = ({ iconRight, iconLeft, style, onIconRightPress, onIconLeftPress, title, onChangeText, placeholder, editable = true, onEditPress }) => {
    return (
        <View style={[toolBarStyle.container, style]}>
            {
                iconLeft? (
                    <TouchableOpacity onPress={onIconLeftPress} style={[toolBarStyle.icon35, !iconLeft && toolBarStyle.hide]}>
                        <Image style={toolBarStyle.icon35} source={iconLeft || require('../../assets/icons/ic_back.png')} />
                    </TouchableOpacity>
                ) : (
                    title && <View style={toolBarStyle.view35} />
                )
            }
            {
                title ? (
                    <Text style={toolBarStyle.title}>{title}</Text>
                ) : (
                    <SearchInput onEditPress={onEditPress} editable={editable} placeholder={placeholder} onChangeText={onChangeText} style={[iconRight && toolBarStyle.marginRight20, iconLeft && toolBarStyle.marginLeft20, {flex: 1}]} />

                )
            }
            {
                iconRight ? (
                    <TouchableOpacity onPress={onIconRightPress} style={[toolBarStyle.icon35, !iconRight && toolBarStyle.hide]}>
                        <Image style={toolBarStyle.icon35} source={iconRight || require('../../assets/icons/ic_back.png')} />
                    </TouchableOpacity>
                ) : (
                    title && <View style={toolBarStyle.view35} />
                )
            }
        </View>
    )
}

export default ToolBar