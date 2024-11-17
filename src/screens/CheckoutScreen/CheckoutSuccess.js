import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import React from 'react';
import Header from '../../components/Header';
import appst from '../../constants/AppStyle';
import {useSelector} from 'react-redux';
import ProductItem from '../../items/ProductItem';

const CheckoutSuccess = ({navigation}) => {
  const productState = useSelector(state => state.products.products);
  console.log('productState', productState);

  return (
    <View>
      <Header
        iconLeft={require('../../assets/icons/back.png')}
        leftOnPress={() => {}}
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
              style={appst.icon40}
              source={require('../../assets/icons/checkout_success.png')}
            />
            <Text style={{fontSize: 24, color: 'white'}}>
              {' '}
              Đặt hàng thành công
            </Text>
          </Text>
          <Text
            style={{
              textAlign: 'center',
              color: 'white',
              marginVertical: 30,
              fontSize: 14,
            }}>
            Cùng ShoeMate bảo vệ quyền lợi của bạn - chỉ nhận hàng & thanh toán
            khi đã nhận được hàng
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
              <Text style={{fontSize: 18, color: 'white'}}>Trang chủ</Text>
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
              <Text style={{fontSize: 18, color: 'white'}}>Đơn mua</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{alignItems: 'center', marginTop: 20, marginLeft: 20}}>
          <Text style={{color: 'black', paddingBottom: 20, fontSize: 20}}>
            San pham danh cho ban
          </Text>
          <FlatList
            data={productState}
            renderItem={({item}) => <ProductItem product={item} />}
            keyExtractor={(item, index) => index.toString()}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default CheckoutSuccess;
