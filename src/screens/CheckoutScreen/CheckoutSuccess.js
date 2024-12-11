import {View, Text, Image, TouchableOpacity, ScrollView} from 'react-native';
import React from 'react';
import Header from '../../components/Header';
import appst from '../../constants/AppStyle';
import {useSelector} from 'react-redux';
import ProductList from '../Product/ProductList';
import {useTranslation} from 'react-i18next';

const CheckoutSuccess = ({navigation}) => {
  const {t} = useTranslation();
  const productState = useSelector(state => state.products);
  // console.log('productState', productState);

  return (
    <View>
      <Header
        name={t('checkout.checkout_success')}
        iconLeft={require('../../assets/icons/back.png')}
        leftOnPress={() => navigation.replace('BottomNav')}
        iconRight={require('../../assets/icons/bag_icon.png')}
        rightOnPress={() => {}}
      />
      <ScrollView style={{marginBottom: 20}}>
        <View
          style={[
            {
              backgroundColor: 'blue',
              paddingVertical: 30,
              paddingHorizontal: 40,
            },
            appst.center,
          ]}>
          <Text style={{alignItems: 'center'}}>
            <Image
              style={appst.icon50}
              source={require('../../assets/icons/checkout_success.png')}
            />
            <Text style={{fontSize: 24, color: 'white'}}>
              {' '}
              {t('checkout.checkout_success')}
            </Text>
          </Text>
          <Text
            style={{
              textAlign: 'center',
              color: 'white',
              marginVertical: 30,
              fontSize: 14,
            }}>
            {t('checkout.checkout_success_des')}
          </Text>
          <View style={[appst.rowCenter, {marginTop: 15}]}>
            <TouchableOpacity
              onPress={() => navigation.navigate('BottomNav')}
              style={{
                paddingVertical: 5,
                paddingHorizontal: 40,
                borderColor: 'white',
                borderWidth: 1,
                borderRadius: 5,
                marginRight: 20,
              }}>
              <Text style={{fontSize: 18, color: 'white'}}>
                {t('buttons.home')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('OrderScreen')}
              style={{
                paddingVertical: 5,
                paddingHorizontal: 40,
                borderColor: 'white',
                borderWidth: 1,
                borderRadius: 5,
              }}>
              <Text style={{fontSize: 18, color: 'white'}}>
                {t('buttons.order')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{marginTop: 20, marginBottom: 20}}>
          <ProductList listProduct={productState?.products?.data} />
        </View>
      </ScrollView>
    </View>
  );
};

export default CheckoutSuccess;
