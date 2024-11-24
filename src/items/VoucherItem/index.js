import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import VoucherBgSvg from './VoucherBg'
import style from './style'

const ButtonClaim = ({isClaimed}) => {
  return (
    <TouchableOpacity style={[style.buttonClaimContainer, isClaimed && style.bgClaimed]}>
      <Text style={[style.buttonClaimText, isClaimed && style.textClaimed]}>Claim</Text>
    </TouchableOpacity>
  )
}

const VoucherItem = ({ortherStyle}) => {
  return (
    <View style={[style.container, ortherStyle]}>
      <VoucherBgSvg style={style.svgbg} />
      <View style={style.headerContainer}>
        <Text style={style.voucherTxt}>Voucher</Text>
        <Text style={style.validText}>Valid Until 5.16.20</Text>
      </View>
      <View style={style.bottomView}>
        <View
          style={style.flexRow}
        >
          <Image source={require('../../assets/icons/bag_icon.png')} />
          <Text style={style.firstPurchase}>First Purchase</Text>
        </View>

        <View style={style.headerContainer}>
          <Text style={style.endow}>5% off for your next order</Text>
          <ButtonClaim/>
        </View>
      </View>
    </View>
  )
}

export default VoucherItem