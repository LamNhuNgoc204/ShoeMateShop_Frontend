import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import VoucherBgSvg from './VoucherBg'
import style from './style'



const VoucherItem = ({ortherStyle}) => {
  return (
    <View style={[style.container, ortherStyle]}>
      <VoucherBgSvg style={style.svgbg} />
      <View style={style.headerContainer}>
        <Text style={style.voucherTxt}>Voucher</Text>
        <Text style={style.validText}>khả dụng</Text>
      </View>
      <View style={style.bottomView}>
        <View
          style={style.flexRow}
        >
          <Image source={require('../../assets/icons/bag_icon.png')} />
          <Text style={style.firstPurchase}>Cho đơn từ 50k</Text>
        </View>

        <View style={style.headerContainer}>
          <Text style={style.endow}>Giảm 20% tối đa 100k</Text>
          <TouchableOpacity style={style.buttonClaimContainer}>
      <Text style={style.buttonClaimText}>Áp dụng</Text>
    </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default VoucherItem