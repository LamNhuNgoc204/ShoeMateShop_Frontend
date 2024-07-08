import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import odit from './style';
import appst from '../../constants/AppStyle';
import {CustomedButton} from '../../components';
import {spacing} from '../../constants';

const OrderItem = ({receive, cancel}) => {
  return (
    <TouchableOpacity onPress={() => {}} style={odit.container}>
      <Text style={odit.textCode}>Code orders: ExAmPlE123XYZ</Text>
      <View style={[appst.rowStart, odit.itemContainer]}>
        <Image
          style={odit.img}
          source={{
            uri: 'https://i.pinimg.com/236x/e1/8a/7e/e18a7e2f5849a81c2829002440b0962f.jpg',
          }}
        />
        <View style={odit.viewContent}>
          <Text style={odit.name}>Spring New Style Women Casual .....</Text>
          <Text style={odit.text}>
            Size: <Text style={odit.text1}>38</Text>
          </Text>
          <Text style={odit.text}>
            Price: <Text style={odit.text1}>3800000</Text>
          </Text>
        </View>
      </View>
      <View style={[appst.rowCenter, odit.view1]}>
        <Text style={odit.quatity}>1 item</Text>
        <Text style={odit.total}>
          Total Price: <Text style={odit.price}>3800000</Text>
        </Text>
      </View>
      {!receive && !cancel ? (
        <View style={[appst.rowCenter, odit.view2]}>
          <Text style={odit.textWait}>Wait for confirmation</Text>
          <Image
            style={appst.icon24}
            source={require('../../assets/icons/chevron_right.png')}
          />
        </View>
      ) : (
        <View
          style={[
            appst.center,
            cancel && appst.rowCenter,
            {paddingHorizontal: spacing.lg},
          ]}>
          {cancel && <Text style={odit.textCancel}>Canceled by you</Text>}
          <TouchableOpacity style={[odit.press, {width: '50%'}]}>
            <Text style={odit.textTouch}>Buy this product again</Text>
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default OrderItem;
