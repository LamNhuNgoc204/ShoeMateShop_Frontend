import {View, Text, FlatList, TouchableOpacity, Image} from 'react-native';
import React, {useState} from 'react';
import appst from '../../constants/AppStyle';
import {cartst} from './style';
import ItemCart from '../../items/CartItem/ItemCart';
import {spacing} from '../../constants';
import Header from '../../components/Header';
import {CustomedButton} from '../../components';

const CartScreen = ({navigation}) => {
  const [currentlyOpenSwipeable, setCurrentlyOpenSwipeable] = useState(null);

  return (
    <View style={[appst.container, cartst.container]}>
      <View style={cartst.header}>
        <Header
          background={'#fff'}
          iconLeft={require('../../assets/icons/back.png')}
          name={'My Cart'}
        />
      </View>
      <View style={cartst.viewBody}>
        <Text style={cartst.text1}>3 item</Text>
        <FlatList
          style={cartst.flat}
          data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
          renderItem={({item}) => (
            <ItemCart
              item={item}
              currentlyOpenSwipeable={currentlyOpenSwipeable}
              setCurrentlyOpenSwipeable={setCurrentlyOpenSwipeable}
            />
          )}
          extraData={item => item.id}
          ItemSeparatorComponent={<View style={{marginBottom: spacing.sm}} />}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <View style={cartst.viewFooter}>
        <View style={appst.rowCenter}>
          <Text style={cartst.text2}>Subtotal</Text>
          <Text style={cartst.text3}>$753.95</Text>
        </View>
        <View style={[appst.rowCenter, cartst.borderBottom]}>
          <Text style={cartst.text2}>Delivery</Text>
          <Text style={cartst.text3}>$60.2</Text>
        </View>
        <View style={[appst.rowCenter, cartst.view1]}>
          <Text style={cartst.text4}>Total Cost</Text>
          <Text style={cartst.text5}>$814.15</Text>
        </View>
        <View style={[appst.rowCenter]}>
          <View style={appst.rowCenter}>
            <TouchableOpacity>
              <Image
                style={appst.icon24}
                source={require('../../assets/icons/icon_check.png')}
              />
            </TouchableOpacity>
            <Text style={cartst.text6}>All products</Text>
          </View>
          <CustomedButton
            title={'Checkout'}
            style={cartst.btCheckout}
            titleStyle={cartst.textTouch}
            onPress={() => navigation.navigate('CheckOutScreen')}
          />
        </View>
      </View>
    </View>
  );
};

export default CartScreen;
