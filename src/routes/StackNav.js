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
import OtpVerification from '../screens/OtpVerification';
import SearchScreen from '../screens/SearchScreen';
import CategoryDetail from '../screens/CategoryDetail';
import OrderScreen from '../screens/Orders';
import OrderDetail from '../screens/OrderDetail';
import Profile from '../screens/Profile';
import EditProfile from '../screens/EditProfile';
import SettingScreen from '../screens/SettingScreen';
import RecentViewed from '../screens/RecentlyViewedScreen';
import ResetPasswordScreen from '../screens/ResetPasswordScreen';
import MyRating from '../screens/Rating';
import Review from '../screens/Review';
import SearchResult from '../screens/SearchResult';
import AddAddress from '../screens/AddAddressScreen';
import MessageScreen from '../screens/MessageScreen';
import HomeWallet from '../screens/HomeWalletScreen';
import DepositWalletScreen from '../screens/DepositWalletScreen';
import TransferWalletScreen from '../screens/TransferWalletScreen';
import ProductDetail from '../screens/ProductDetail';
import BottomNav from './BottomNav';
import VoucherScreen from '../screens/VoucherScreen';

const Stack = createNativeStackNavigator();

const StackNav = () => {
  return (
    <Stack.Navigator
      initialRouteName="LoginScreen"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="OnBoardScreen" component={OnBoardScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
      <Stack.Screen name="CartScreen" component={CartScreen} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="CheckOutScreen" component={CheckOutScreen} />
      <Stack.Screen name="ChooseAddress" component={ChooseAddress} />
      <Stack.Screen name="FavoriteScreen" component={FavoriteScreen} />
      <Stack.Screen name="ForgotPassWord" component={ForgotPassWord} />
      <Stack.Screen name="NewPasswordScreen" component={NewPasswordScreen} />
      <Stack.Screen name="OtpVerification" component={OtpVerification} />
      <Stack.Screen name="SearchScreen" component={SearchScreen} />
      <Stack.Screen name="CategoryDetail" component={CategoryDetail} />
      <Stack.Screen name="OrderScreen" component={OrderScreen} />
      <Stack.Screen name="OrderDetail" component={OrderDetail} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="SettingScreen" component={SettingScreen} />
      <Stack.Screen name="RecentViewed" component={RecentViewed} />
      <Stack.Screen
        name="ResetPasswordScreen"
        component={ResetPasswordScreen}
      />
      <Stack.Screen name="MyRating" component={MyRating} />
      <Stack.Screen name="Review" component={Review} />
      <Stack.Screen name="SearchResult" component={SearchResult} />
      <Stack.Screen name="AddAddress" component={AddAddress} />
      <Stack.Screen name="MessageScreen" component={MessageScreen} />
      <Stack.Screen name="HomeWallet" component={HomeWallet} />
      <Stack.Screen
        name="DepositWalletScreen"
        component={DepositWalletScreen}
      />
      <Stack.Screen
        name="TransferWalletScreen"
        component={TransferWalletScreen}
      />
      <Stack.Screen name="ProductDetail" component={ProductDetail} />
      <Stack.Screen name="Voucher" component={VoucherScreen} />
      <Stack.Screen name="BottomNav" component={BottomNav} />
    </Stack.Navigator>
  );
};

export default StackNav;
