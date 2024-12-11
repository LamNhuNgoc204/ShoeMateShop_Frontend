import {View} from 'react-native';
import React, {useEffect} from 'react';
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
import ToReturn from './ToReturn';
import {useSelector} from 'react-redux';

const OrderScreen = ({navigation, route}) => {
  const {t} = useTranslation();
  const TopTab = createMaterialTopTabNavigator();
  const isTokenValid = useSelector(state => state?.user?.isValidToken);

  const initialRoute = route?.params?.initialRoute || t('orders.pay');

  useEffect(() => {
    if (route.params?.initialRoute) {
      navigation.navigate(route.params.initialRoute);
    }
  }, [route.params?.initialRoute]);

  // console.log('initialRoute', initialRoute);

  return (
    <View style={[appst.container]}>
      <Header
        iconLeft={require('../../assets/icons/back.png')}
        leftOnPress={() => navigation.navigate('BottomNav')}
        name={t('profiles.order_history')}
        iconRight={require('../../assets/icons/mesage.png')}
        rightOnPress={() => {
          isTokenValid
            ? navigation.navigate('MessageScreen')
            : navigation.navigate('RequireLogin');
        }}
      />
      <TopTab.Navigator
        // initialRouteName={initialRoute}
        screenOptions={{
          lazy: true,
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
          tabBarScrollEnabled: true,
          tabBarItemStyle: {width: 'auto'},
        }}>
        <TopTab.Screen name={t('orders.pay')} component={ToPay} />
        <TopTab.Screen name={t('orders.ship')} component={ToShip} />
        <TopTab.Screen name={t('orders.completed')} component={ToReceive} />
        <TopTab.Screen name={t('orders.cancel')} component={Cancalled} />
        <TopTab.Screen name={t('orders.return')} component={ToReturn} />
      </TopTab.Navigator>
    </View>
  );
};

export default OrderScreen;
