import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Pressable,
  ScrollView,
  FlatList,
} from 'react-native';
import React from 'react';
import appst from '../../constants/AppStyle';
import {c_outst} from './style';
import CheckOutItem from '../../items/CheckOutItem';
import {spacing} from '../../constants';

const CheckOutScreen = () => {
  return (
    <View style={[appst.container]}>
      <View style={c_outst.viewHeader} />
      <ScrollView showsVerticalScrollIndicator={false} style={c_outst.viewBody}>
        <View style={[appst.rowCenter, c_outst.body1, c_outst.borderBottom]}>
          <TouchableOpacity style={c_outst.view1}>
            <Image
              style={appst.icon24}
              source={require('../../assets/icons/address.png')}
            />
            <View style={c_outst.body1Text}>
              <Text style={c_outst.text1}>Delivery Address:</Text>
              <Text style={c_outst.text2}>
                Minh Quan | <Text style={c_outst.text3}>(+84) 336758295</Text>{' '}
                số 10 phố Phạm Văn Bạch, phường Dịch Vọng, quận Cầu Giấy, Hà
                Nội, Việt Nam
              </Text>
            </View>
          </TouchableOpacity>
          <Image
            style={appst.icon24}
            source={require('../../assets/icons/arrow_right.png')}
          />
        </View>
        <View style={[c_outst.borderBottom, c_outst.body2]}>
          <Text style={c_outst.bd2Text1}>Your Products:</Text>
          <FlatList
          style={c_outst.flat}
            data={[1, 2, 3, 4, 5]}
            renderItem={({item}) => <CheckOutItem item={item} />}
            extraData={item => item.id}
            ItemSeparatorComponent={<View style={c_outst.borderBottom2} />}
          />
        </View>
      </ScrollView>
      <View style={c_outst.viewFooter}>
        <View style={[appst.rowCenter, c_outst.borderTop]}>
          <Text style={c_outst.text4}>Total Cost</Text>
          <Text style={c_outst.text5}>$30.5</Text>
        </View>
        <Pressable style={c_outst.press}>
          <Text style={c_outst.textPress}>Place Order</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default CheckOutScreen;
