import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import OnBoardScreen from '../screens/OnBoardScreen';
import SplashScreen from '../screens/SplashScreen';
import CartScreen from '../screens/CartScreen';
import HomeScreen from '../screens/HomeScreen';
import CheckOutScreen from '../screens/CheckoutScreen';
import ChooseAddress from '../screens/Address/ChooseAddress';
import FavoriteScreen from '../screens/FavoriteScreen';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import ForgotPassWord from '../screens/ForgotPassword';
import NewPasswordScreen from '../screens/NewPassWordScreen';

const Stack = createNativeStackNavigator();

const StackNav = () => {
  return (
    <Stack.Navigator
      initialRouteName="NewPasswordScreen"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="OnBoardScreen" component={OnBoardScreen} />
      <Stack.Screen name="CartScreen" component={CartScreen} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="CheckOutScreen" component={CheckOutScreen} />
      <Stack.Screen name="ChooseAddress" component={ChooseAddress} />
      <Stack.Screen name="FavoriteScreen" component={FavoriteScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
      <Stack.Screen name="ForgotPassWord" component={ForgotPassWord} />
      <Stack.Screen name="NewPasswordScreen" component={NewPasswordScreen} />
    </Stack.Navigator>
  );
};

export default StackNav;
