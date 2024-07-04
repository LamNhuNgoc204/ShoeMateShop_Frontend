import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import OnBoardScreen from '../screens/OnBoardScreen';
import SplashScreen from '../screens/SplashScreen';
import CartScreen from '../screens/CartScreen';
import HomeScreen from '../screens/HomeScreen';
import CheckOutScreen from '../screens/CheckoutScreen';
import ChooseAddress from '../screens/Address/ChooseAddress';

const Stack = createNativeStackNavigator();

const StackNav = () => {
  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="OnBoardScreen" component={OnBoardScreen} />
      <Stack.Screen name="CartScreen" component={CartScreen} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="CheckOutScreen" component={CheckOutScreen} />
      <Stack.Screen name="ChooseAddress" component={ChooseAddress} />
    </Stack.Navigator>
  );
};

export default StackNav;
