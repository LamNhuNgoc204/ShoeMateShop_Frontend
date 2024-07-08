import {View, Text} from 'react-native';
import React from 'react';
import Header from '../../components/Header';
import appst from '../../constants/AppStyle';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import ToPay from './ToPay';
import ToShip from './ToShip';
import ToReceive from './ToReceive';
import Cancalled from './Cancalled';
import {colors} from '../../constants/colors';
import {sizes} from '../../constants';
import {fonts} from '../../constants/fonts';

const OrderScreen = ({navigation}) => {
  const TopTab = createMaterialTopTabNavigator();

  return (
    <View style={[appst.container]}>
      <Header
        iconLeft={require('../../assets/icons/back.png')}
        leftOnPress={() => navigation.goBack()}
        name={'Order History'}
        iconRight={require('../../assets/icons/search.png')}
        rightOnPress={() => navigation.navigate('')}
      />
      <TopTab.Navigator
        screenOptions={{
          tabBarStyle: {
            backgroundColor: colors.background_secondary,
            paddingVertical: 0,
          },
          tabBarLabelStyle: {
            textTransform: 'none',
            fontSize: sizes.size14,
            fontWeight: fonts.rlw_semibold,
          },
          tabBarPressColor: colors.primary,
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.black,
        }}>
        <TopTab.Screen name="To Pay" component={ToPay} />
        <TopTab.Screen name="To Ship" component={ToShip} />
        <TopTab.Screen name="To Receive" component={ToReceive} />
        <TopTab.Screen name="Cancalled" component={Cancalled} />
      </TopTab.Navigator>
    </View>
  );
};

export default OrderScreen;
