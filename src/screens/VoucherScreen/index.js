import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import appst from '../../constants/AppStyle'
import VoucherItem from '../../items/VoucherItem'
import Header from '../../components/Header'
import style from './style'
import { FlatList, TextInput } from 'react-native-gesture-handler'

const list = new Array(10).fill(0)

const SearchSection = () =>  {
  return(
    <View style={style.searchSection}>
      <TextInput placeholder='Tìm kiếm vouchers' style={style.inputText}/>
      <TouchableOpacity style={style.buttonSearch}>
        <Text style={style.btnText}>Tìm kiếm</Text>
      </TouchableOpacity>
    </View>
  )
}

const VoucherScreen = () => {
  return (
    <View style={[appst.container, style.container]}>
      <Header iconLeft={require('../../assets/icons/ic_back.png')} iconRight={require('../../assets/icons/ic_bag.png')} name={'Vouchers'}/>
      <SearchSection/>
      <FlatList
        data={list}
        renderItem={({item, index}) => <VoucherItem/>}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        style={style.flat}
        contentContainerStyle={style.flatContainer}
      />
    </View>
  )
}

export default VoucherScreen