import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import searchItemStyle from './style'

const SearchItem = ({ onItemPress, content, style }) => {
    return (
        <TouchableOpacity onPress={onItemPress} style={[searchItemStyle.container, style]}>
            <Image source={require('../../assets/icons/ic_clock.png')} style={searchItemStyle.icon16} />
            <Text style={searchItemStyle.searchContent}>{content}</Text>
            <TouchableOpacity>
                <Image style={searchItemStyle.icon14} source={require('../../assets/icons/ic_x.png')}/>
            </TouchableOpacity>
        </TouchableOpacity>
    )
}

export default SearchItem