import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import categoryDetailStyle from './style'
import ToolBar from '../../components/ToolBar'
import appst from '../../constants/AppStyle'
import { FlatList } from 'react-native-gesture-handler'
import ProductItem from '../../items/ProductItem'
import FilterPanel from '../../components/FilterPanel'

const products = new Array(10).fill(1)

const CategoryDetail = () => {
  const [filterOpen, setFilterOpen] = useState(false)
  const [listSelectedBrand, setListSelectedBrand] = useState([])
  const [listSelectedStar, setListSelectedStar] = useState([])
  const [minPrice, setMinPrice] = useState(0)
  const [maxPrice, setMaxPrice] = useState(0)
  

  const onOpenFilter = () => {
    setFilterOpen(true)
  }

  const onCloseFilterPress = () => {
    setFilterOpen(false)
  }

  const onBrandPress = (index) => {
    const newList = [...listSelectedBrand]
    if (newList.includes(index)) {
      newList.splice(newList.indexOf(index), 1)
    } else {
      newList.push(index)
    }
    console.log('newList: ', newList)
    setListSelectedBrand(newList)
  }

  const onStarPress = (index) => {
    const newList = [...listSelectedStar]
    if (newList.includes(index)) {
      newList.splice(newList.indexOf(index), 1)
    } else {
      newList.push(index)
    }
    console.log('newList: ', newList)
    setListSelectedStar(newList)
  }

  const onMinChange = (price) => {
    try {
      if (parseFloat(price) > 0) {
        setMinPrice(parseFloat(price))
      }
    } catch (error) {
      setMinPrice(minPrice)
    }
  }

  const onMaxPriceChange = (price) => {
    try {
      if (parseFloat(price)) {
        setMaxPrice(parseFloat(price))
      }
    } catch (error) {
      setMaxPrice(maxPrice)
    }
  }
  return (
    <View style={[categoryDetailStyle.container, appst.container]}>
      <ToolBar iconLeft={require('../../assets/icons/ic_back.png')} />
      <View style={[categoryDetailStyle.marginTop16, categoryDetailStyle.headerView]}>
        <Text style={categoryDetailStyle.textContainer}>
          Hot {`\n`}
          <Text style={categoryDetailStyle.subContent}>25 products found</Text>
        </Text>

        <TouchableOpacity onPress={onOpenFilter}>
          <Image style={categoryDetailStyle.icon52} source={require('../../assets/icons/ic_filter.png')} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={products}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => <ProductItem product={item} index={index} />}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        style={categoryDetailStyle.marginTop16}
      />
      <FilterPanel minPrice={minPrice} maxPrice={maxPrice} onMaxPriceChange={onMaxPriceChange} onMinPriceChange={onMinChange} onStarPress={onStarPress} listSelectedStar={listSelectedStar} listSelectedBrand={listSelectedBrand} onBrandPress={onBrandPress} isOpen={filterOpen} onClosePress={onCloseFilterPress} />

    </View>
  )
}

export default CategoryDetail