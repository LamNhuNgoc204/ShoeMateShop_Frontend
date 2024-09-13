import 'intl-pluralrules';
import {KeyboardAvoidingView} from 'react-native';
import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import appst from './src/constants/AppStyle';
import MainNav from './src/routes';
import i18next from './src/services/i18next';
import {I18nextProvider} from 'react-i18next';

const App = () => {
  i18next.changeLanguage('en');

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <KeyboardAvoidingView style={appst.container}>
        <I18nextProvider i18n={i18next}>
          <MainNav />
        </I18nextProvider>
      </KeyboardAvoidingView>
    </GestureHandlerRootView>
  );
};
export default App;
