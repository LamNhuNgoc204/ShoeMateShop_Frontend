import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  Switch,
} from 'react-native';
import React, {useState} from 'react';
import appst from '../../constants/AppStyle';
import {c_outst} from './style';
import CheckOutItem from '../../items/CheckOutItem';
import {spacing} from '../../constants';
import CustomModal from '../../components/Modal';
import Header from '../../components/Header';

const CheckOutScreen = ({navigation}) => {
  const [isswitch, setIsswitch] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    console.log('Open modal...');
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleToggle = value => {
    setIsswitch(value);
  };

  const goToScreen = Screen => {
    navigation.navigate(Screen);
  };

  return (
    <View style={[appst.container, c_outst.containerPosition]}>
      <View style={[appst.container]}>
        {/* <View style={c_outst.viewHeader} /> */}
        <Header iconLeft={require('../../assets/icons/back.png')}
        name={"Check Out"} />
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={c_outst.viewBody}>
          <View style={[appst.rowCenter, c_outst.body1, c_outst.borderBottom]}>
            <TouchableOpacity
              style={c_outst.view1}
              onPress={() => goToScreen('ChooseAddress')}>
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
              style={[c_outst.flat]}
              scrollEnabled={false}
              data={[1, 2, 3, 4, 5]}
              renderItem={({item}) => <CheckOutItem item={item} />}
              extraData={item => item.id}
              ItemSeparatorComponent={<View style={c_outst.borderBottom2} />}
            />
          </View>

          <View style={[appst.rowCenter, c_outst.body3, c_outst.borderBottom]}>
            <View style={appst.rowCenter}>
              <Image
                style={appst.icon24}
                source={require('../../assets/icons/vouchers.png')}
              />
              <Text style={c_outst.text6}>Vouchers</Text>
            </View>
            <View style={[appst.rowCenter]}>
              <Text style={c_outst.text7}>Use 1 Voucher</Text>
              <Image
                style={appst.icon24}
                source={require('../../assets/icons/arrow_right.png')}
              />
            </View>
          </View>

          <View style={[appst.rowCenter, c_outst.body3, c_outst.borderBottom]}>
            <View style={appst.rowCenter}>
              <Image
                style={appst.icon24}
                source={require('../../assets/icons/points.png')}
              />
              <Text style={c_outst.text6}>Redeem 3500 Points</Text>
            </View>
            <Switch onValueChange={handleToggle} value={isswitch} />
          </View>

          <View style={[c_outst.body3, c_outst.borderBottom]}>
            <View style={[appst.rowCenter]}>
              <View style={appst.rowCenter}>
                <Image
                  style={appst.icon24}
                  source={require('../../assets/icons/payoption.png')}
                />
                <Text style={c_outst.text6}>Payment Option</Text>
              </View>
              <Image
                style={appst.icon24}
                source={require('../../assets/icons/arrow_right.png')}
              />
            </View>
            <View style={[appst.rowCenter, c_outst.body4]}>
              <View style={appst.rowCenter}>
                <Image
                  style={appst.icon24}
                  source={require('../../assets/icons/payment.png')}
                />
                <Text style={c_outst.text6}>Payment Details</Text>
              </View>
            </View>
            <View style={[appst.rowCenter, c_outst.view4Text]}>
              <Text style={c_outst.textTitle}>Merchandise Subtotal</Text>
              <Text style={c_outst.textPrice}>$ 22</Text>
            </View>
            <View style={[appst.rowCenter, c_outst.view4Text]}>
              <Text style={c_outst.textTitle}>Shipping Subtotal</Text>
              <Text style={c_outst.textPrice}>$ 17</Text>
            </View>
            <View style={[appst.rowCenter, c_outst.view4Text]}>
              <Text style={c_outst.textTitle}>Shipping Discount Subtotal</Text>
              <Text style={c_outst.textPrice}>$ 8.5</Text>
            </View>
            <View style={[appst.rowCenter, c_outst.view4Text]}>
              <Text style={[c_outst.textTitle, c_outst.textTitle1]}>
                Total Payment:
              </Text>
              <Text style={[c_outst.textPrice, c_outst.textPrice1]}>
                $ 30.5
              </Text>
            </View>
          </View>
          <View style={[appst.rowCenter, c_outst.body5]}>
            <View>
              <Image
                style={[appst.icon24, {marginLeft: spacing.md}]}
                source={require('../../assets/icons/term.png')}
              />
            </View>
            <Text style={c_outst.textTerm}>
              By clicking “Place Order”, you are agreeing to{' '}
              <Text style={c_outst.textTerm1}>
                Shop General Transaction Terms
              </Text>
            </Text>
          </View>
        </ScrollView>

        <View style={c_outst.viewFooter}>
          <View style={[appst.rowCenter, c_outst.borderTop]}>
            <Text style={c_outst.text4}>Total Cost</Text>
            <Text style={c_outst.text5}>$30.5</Text>
          </View>
          <TouchableOpacity style={c_outst.press} onPress={() => openModal()}>
            <Text style={c_outst.textPress}>Place Order</Text>
          </TouchableOpacity>
        </View>
      </View>
      <CustomModal visible={modalVisible} closeModal={closeModal} />
    </View>
  );
};

export default CheckOutScreen;
