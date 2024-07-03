import {KeyboardAvoidingView} from 'react-native';
import React from 'react';
import appst from './src/constants/AppStyle';
import MainNav from './src/routes';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const App = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <KeyboardAvoidingView style={appst.container}>
        <MainNav />
      </KeyboardAvoidingView>
    </GestureHandlerRootView>
  );
};
export default App;
