import { View, Text, Image, TouchableOpacity, ToastAndroid } from 'react-native';
import React from 'react';
import VoucherBgSvg from './VoucherBg';
import style from './style';
import AxiosInstance from '../../helpers/AxiosInstance';
import { useNavigation } from '@react-navigation/native';

const VoucherItem = ({ voucher,cartTotal }) => {
  const navigation = useNavigation();


  const handleApplyVoucher = async(voucher_code) => {
    console.log("voucher code selected",voucher_code)
    console.log("cartTotal voucheritem",cartTotal)
   try {
    const response = await AxiosInstance().post(
      '/vouchers/apply',
      { voucher_code: voucher_code,
        totalOrderValue: cartTotal
       },
    );
    if (response.status) {
      console.log("response voucher",response)
      // navigation.navigate('CheckOutScreen',{voucher:response.data.voucher});
      ToastAndroid.show("Áp dụng voucher thành công",ToastAndroid.SHORT);
      navigation.navigate('CheckOutScreen',{response:response});
    }
    else{
      console.log("response voucher",response)
      ToastAndroid.show("Bạn đã sử dụng voucher này rồi",ToastAndroid.SHORT);
    }
   } catch (error) {
    console.log("response voucher",error.message)
    ToastAndroid.show("Không thể áp dụng voucher này",ToastAndroid.SHORT);
   }

  }
  return (
    <View style={style.container}>
      <VoucherBgSvg style={style.svgbg} />
      <View style={style.headerContainer}>
        <Text style={style.voucherTxt}>{voucher.voucher_name}</Text>
        <Text style={style.validText}>Valid Until {new Date(voucher.expiry_date).toLocaleDateString()}</Text>
      </View>
      <View style={style.bottomView}>
        <View style={style.flexRow}>
          <Image source={require('../../assets/icons/bag_icon.png')} />
          <Text style={style.firstPurchase}>Min order: {voucher.min_order_value}</Text>
        </View>

        <View style={style.headerContainer}>
          <Text style={style.endow}>{voucher.discount_value}% off, max discount {voucher.max_discount_value}</Text>
          <TouchableOpacity style={[style.buttonClaimContainer]} onPress={() => handleApplyVoucher(voucher.voucher_code)}>
        <Text style={[style.buttonClaimText]}>Apply</Text>
       </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default VoucherItem;
