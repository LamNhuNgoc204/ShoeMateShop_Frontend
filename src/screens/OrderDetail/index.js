import {View, Text, Image} from 'react-native';
import React from 'react';
import appst from '../../constants/AppStyle';
import {oddt} from './style';
import Header from '../../components/Header';

const OrderDetail = () => {
  return (
    <View style={[appst.container, oddt.container]}>
      <Header
        iconLeft={require('../../assets/icons/back.png')}
        name={'Order Detail'}
      />
      <View style={oddt.itemContainer}>
        <View style={appst.rowStart}>
          <View>
            <Image source={require('../../assets/icons/location.png')} />
          </View>
          <View>
            <Text>Delivery Address:</Text>
            <Text>
              <Text>
                Minh Quan | (+84) 336758295 {'\n'}
                số 10 phố Phạm Văn Bạch, phường Dịch Vọng, quận Cầu Giấy, Hà
                Nội, Việt Nam
              </Text>
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default OrderDetail;
