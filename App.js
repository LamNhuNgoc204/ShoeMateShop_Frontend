import 'intl-pluralrules';
import {KeyboardAvoidingView} from 'react-native';
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
