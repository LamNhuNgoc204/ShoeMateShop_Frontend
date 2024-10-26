import {View} from 'react-native';
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
import {useTranslation} from 'react-i18next';

const OrderScreen = ({navigation}) => {
  const {t} = useTranslation();
  const TopTab = createMaterialTopTabNavigator();

  return (
    <View style={[appst.container]}>
      <Header
        iconLeft={require('../../assets/icons/back.png')}
        leftOnPress={() => navigation.navigate('BottomNav')}
        name={t('profiles.order_history')}
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
        <TopTab.Screen name={t('orders.pay')} component={ToPay} />
        <TopTab.Screen name={t('orders.ship')} component={ToShip} />
        <TopTab.Screen name={'Đã giao'} component={ToReceive} />
        <TopTab.Screen name={t('orders.cancel')} component={Cancalled} />
      </TopTab.Navigator>
    </View>
  );
};

export default OrderScreen;
