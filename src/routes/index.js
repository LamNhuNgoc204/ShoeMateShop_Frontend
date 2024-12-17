import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNav from './StackNav';
import linking from '../linking';
import Toast from 'react-native-toast-message';

const MainNav = () => {
  return (
    <NavigationContainer linking={linking}>
      <StackNav />

      <Toast ref={(ref) => Toast.setRef(ref)} />
    </NavigationContainer>
  );
};

export default MainNav;
