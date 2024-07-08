import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import categoryDetailStyle from './style'
import ToolBar from '../../components/ToolBar'
import appst from '../../constants/AppStyle'
import { FlatList } from 'react-native-gesture-handler'
import ProductItem from '../../items/ProductItem'

const products = new Array(10).fill(1)

const CategoryDetail = () => {
  return (
    <View style={[categoryDetailStyle.container, appst.container]}>
      <ToolBar iconLeft={require('../../assets/icons/ic_back.png')}/>
      <View style={[categoryDetailStyle.marginTop16, categoryDetailStyle.headerView]}>
        <Text style={categoryDetailStyle.textContainer}>
            Hot {`\n`}
            <Text style={categoryDetailStyle.subContent}>25 products found</Text>
        </Text>

        <TouchableOpacity>
            <Image style={categoryDetailStyle.icon52} source={require('../../assets/icons/ic_filter.png')}/>
        </TouchableOpacity>
      </View>

      <FlatList
        data={products}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) => <ProductItem product={item} index={index}/>}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        style={categoryDetailStyle.marginTop16}
      />
    </View>
  )
}

export default CategoryDetail