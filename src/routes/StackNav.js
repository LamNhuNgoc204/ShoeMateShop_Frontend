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
import RecentlyViewedScreen from '../screens/RecentlyViewedScreen';
import ResetPasswordScreen from '../screens/ResetPasswordScreen';
import MyRating from '../screens/Rating';
import SearchResult from '../screens/SearchResult';
import AddNewAddress from '../screens/Address/AddNewAddress';
import MessageScreen from '../screens/MessageScreen';
import HomeWallet from '../screens/HomeWalletScreen';
import DepositWalletScreen from '../screens/DepositWalletScreen';
import TransferWalletScreen from '../screens/TransferWalletScreen';
import ProductDetail from '../screens/ProductDetail';
import BottomNav from './BottomNav';
import VoucherScreen from '../screens/VoucherScreen';
import Notifycation from '../screens/Notifycation';
import ShipScreen from '../screens/Shipping';
import ChoosePaymentScreen from '../screens/Payment/ChoosePayment';
import ZaloPayScreen from '../screens/Payment/ZaloPay/Payment';
import ZaloPayWebView from '../screens/Payment/ZaloPay/WebView';
import CheckoutSuccess from '../screens/CheckoutScreen/CheckoutSuccess';
import ChooseLanguage from '../screens/Languages';
import CancelDetail from '../screens/Orders/CancelDetail';
import MultiProductReviewForm from '../screens/Review/MultiProductReviewForm';
import ProductReviews from '../screens/Review/ProductReviews';
import SetupWallet from '../screens/WalletSetUp';
import WalletScreen from '../screens/HomeWalletScreen';
import HelpScreen from '../screens/SettingScreen/Other/HelpScreen';
import AboutScreen from '../screens/SettingScreen/Other/AboutScreen';
import PrivacyScreen from '../screens/SettingScreen/Other/PrivacyScreen';
import CommunityStandardsScreen from '../screens/SettingScreen/Other/CommunityStandardsScreen';
import TermsAndConditionsScreen from '../screens/SettingScreen/Other/TermsAndConditionsScreen';
import AccountDeletionReasonScreen from '../screens/SettingScreen/DeleteAccountDetail/AccountDeletionReasonScreen';
import AccountVerificationScreen from '../screens/SettingScreen/DeleteAccountDetail/AccountVerificationScreen ';
import ConsequencesScreen from '../screens/SettingScreen/DeleteAccountDetail/ConsequencesScreen ';
import DeletionCompletedScreen from '../screens/SettingScreen/DeleteAccountDetail/DeletionCompletedScreen ';
import FinalConfirmationScreen from '../screens/SettingScreen/DeleteAccountDetail/FinalConfirmationScreen ';
import DeleteAccountScreen from '../screens/SettingScreen/Other/DeleteAccountScreen ';
import BuyAgain from '../screens/Profile/BuyAgain';

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
      <Stack.Screen name="Notifycation" component={Notifycation} />
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
      <Stack.Screen
        name="RecentlyViewedScreen"
        component={RecentlyViewedScreen}
      />
      <Stack.Screen
        name="ResetPasswordScreen"
        component={ResetPasswordScreen}
      />
      <Stack.Screen name="MyRating" component={MyRating} />
      <Stack.Screen name="ProductReviews" component={ProductReviews} />
      <Stack.Screen name="SearchResult" component={SearchResult} />
      <Stack.Screen name="AddNewAddress" component={AddNewAddress} />
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
      <Stack.Screen name="ShipScreen" component={ShipScreen} />
      <Stack.Screen name="ZaloPayScreen" component={ZaloPayScreen} />
      <Stack.Screen name="ZaloPayWebView" component={ZaloPayWebView} />
      <Stack.Screen name="CheckoutSuccess" component={CheckoutSuccess} />
      <Stack.Screen name="ChooseLanguage" component={ChooseLanguage} />
      <Stack.Screen name="CancelDetail" component={CancelDetail} />
      <Stack.Screen
        name="ChoosePaymentScreen"
        component={ChoosePaymentScreen}
      />
      <Stack.Screen
        name="MultiProductReviewForm"
        component={MultiProductReviewForm}
      />
      <Stack.Screen name="Help" component={HelpScreen} />
      <Stack.Screen name="About" component={AboutScreen} />
      <Stack.Screen name="Privacy" component={PrivacyScreen} />
      <Stack.Screen
        name="CommunityStandards"
        component={CommunityStandardsScreen}
      />
      <Stack.Screen
        name="TermsAndConditions"
        component={TermsAndConditionsScreen}
      />
      <Stack.Screen
        name="AccountDeletionReasonScreen"
        component={AccountDeletionReasonScreen}
      />
      <Stack.Screen
        name="AccountVerificationScreen"
        component={AccountVerificationScreen}
      />
      <Stack.Screen name="ConsequencesScreen" component={ConsequencesScreen} />
      <Stack.Screen
        name="DeletionCompletedScreen"
        component={DeletionCompletedScreen}
      />
      <Stack.Screen
        name="FinalConfirmationScreen"
        component={FinalConfirmationScreen}
      />
      <Stack.Screen
        name="DeleteAccountScreen"
        component={DeleteAccountScreen}
      />
      <Stack.Screen
        name="BuyAgain"
        component={BuyAgain}
      />
    </Stack.Navigator>
  );
};

export default StackNav;
