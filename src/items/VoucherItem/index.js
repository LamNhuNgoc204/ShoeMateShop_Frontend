import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import VoucherBgSvg from './VoucherBg';
import styleItem from './styleItem';

const VoucherItem = () => {
  return (
    <View style={[styleItem.container]}>
      <VoucherBgSvg style={styleItem.svgbg} />
      <View style={styleItem.headerContainer}>
        <Text style={styleItem.voucherTxt}>Voucher</Text>
        <Text style={styleItem.validText}>Valid Until 5.16.20</Text>
      </View>
      <View style={styleItem.bottomView}>
        <View style={styleItem.flexRow}>
          <Image source={require('../../assets/icons/bag_icon.png')} />
          <Text style={styleItem.firstPurchase}>First Purchase</Text>
        </View>

        <View style={styleItem.headerContainer}>
          <Text style={styleItem.endow}>5% off for your next order</Text>
          <TouchableOpacity
            style={[styleItem.buttonClaimContainer]}>
            <Text
              style={[styleItem.buttonClaimText]}>
              Apply
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default VoucherItem;
