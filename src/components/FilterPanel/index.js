import { View, Text, Image, TouchableOpacity, TextInput, Modal, Button } from 'react-native'
import React, { useRef, useState } from 'react'
import filterPanelStyle from './style'
import appst from '../../constants/AppStyle'
import CustomedButton from '../Button'

const star = new Array(5).fill(1)

const FilterPanel = ({ isOpen, listSelectedBrand, listBrand, listSelectedStar,
  minPrice, maxPrice, onMinPriceChange, onMaxPriceChange, onClosePress, onConfirmPress,
  onBrandPress, onStarPress
}) => {
  console.log('listSelectedBrand', listSelectedBrand)
  console.log('listSelectedStar', listSelectedStar)
  return (
    <View style={[filterPanelStyle.container, appst.container, !isOpen && filterPanelStyle.hide]}>
      <View style={[filterPanelStyle.overlay]} />
      <Modal
        style={appst.container}
        transparent
        visible={isOpen}
      >
        <View style={filterPanelStyle.panel}>
          <Text style={filterPanelStyle.title}>
            Filter
          </Text>
          <Text style={filterPanelStyle.subTitle}>
            Brand
          </Text>
          <View style={filterPanelStyle.wrapContainer}>
            {
              listBrand.map((item, index) => {
                return (
                  <TouchableOpacity onPress={() => onBrandPress(item._id)} key={index} style={[filterPanelStyle.view44, listSelectedBrand?.includes(item._id) && filterPanelStyle.selected]}>
                    <Image style={filterPanelStyle.icon34} source={{uri: item.image}} />
                  </TouchableOpacity>
                )
              })
            }

          </View>

          <Text style={filterPanelStyle.subTitle}>
            Price
          </Text>
          <View style={filterPanelStyle.priceFilterConTainer}>
            <TextInput onChangeText={onMinPriceChange} value={minPrice} keyboardType='decimal-pad' placeholder='min' style={filterPanelStyle.priceInput} />
            <Text style={filterPanelStyle.minus}>  -  </Text>
            <TextInput onChangeText={onMaxPriceChange} value={maxPrice} keyboardType='decimal-pad' placeholder='max' style={filterPanelStyle.priceInput} />
          </View>

          <Text style={filterPanelStyle.subTitle}>
            Rate
          </Text>

          <View style={filterPanelStyle.wrapContainer}>
            {
              star.map((item, index) => {
                return (
                  <TouchableOpacity onPress={() => onStarPress(index)} key={index} style={[filterPanelStyle.viewStar, listSelectedStar?.includes(index) && filterPanelStyle.selected]}>
                    <Text style={filterPanelStyle.startText}>{index + " - " + (index + 1)}</Text>
                    <Image source={require('../../assets/icons/star.png')} style={filterPanelStyle.star} />
                  </TouchableOpacity>
                )
              })
            }
          </View>

          <View style={filterPanelStyle.spacer} />
          <CustomedButton onPress={onConfirmPress} titleStyle={filterPanelStyle.textButton} style={filterPanelStyle.button} title={'Confirm'} />
          <CustomedButton onPress={onClosePress} titleStyle={filterPanelStyle.textButtonClose} style={filterPanelStyle.buttonClose} title={'Close'} />
        </View>
      </Modal>
    </View>
  )
}

export default FilterPanel