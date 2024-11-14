import 'intl-pluralrules';
import {Alert, KeyboardAvoidingView, PermissionsAndroid} from 'react-native';
import React, {useEffect, useState} from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import appst from './src/constants/AppStyle';
import MainNav from './src/routes';
import i18next from './src/services/i18next';
import {I18nextProvider} from 'react-i18next';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from './src/redux/store/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging, { firebase } from '@react-native-firebase/messaging';
const App = () => {
  useEffect(() => {
    const getLanguage = async () => {
      const storedLanguage = await AsyncStorage.getItem('language');
      if (storedLanguage) {
        i18next.changeLanguage(storedLanguage);
      } else {
        i18next.changeLanguage('vi');
      }
    };
    getLanguage();
  }, []);

  async function checkPermission() {
    try {
      const granted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
      if (granted) {
        console.log('Quyền đã được cấp.');
        getFCMtoken();
      } else {
        console.log('Quyền chưa được cấp.');
        const requestResult = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
        if (requestResult === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Quyền đã được cấp sau khi yêu cầu.');
          getFCMtoken();
        } else {
          console.log('Quyền bị từ chối.');
        }
      }
    } catch (err) {
      console.warn(err);
    }
  }


  const getFCMtoken = async () => {
    try {
      console.log('get token..')
      const fcmToken = await messaging().getToken();
      console.log('FCM token: ', fcmToken);
    } catch (error) {
      console.log('error: ', error);
    }
  }

  useEffect(() => {
    // Xử lý thông báo khi ứng dụng đang mở
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('A new FCM message arrived!', remoteMessage);
    });

    return unsubscribe;
  }, []);
  useEffect(() => {
    checkPermission()
  }, []);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <GestureHandlerRootView style={{flex: 1}}>
          <KeyboardAvoidingView style={appst.container}>
            <I18nextProvider i18n={i18next}>
              <MainNav />
            </I18nextProvider>
          </KeyboardAvoidingView>
        </GestureHandlerRootView>
      </PersistGate>
    </Provider>
  );
};
export default App;
