import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import StackNav from './StackNav';
import linking from '../../linking';

const MainNav = () => {
  return (
    <NavigationContainer linking={linking}>
      <StackNav />
    </NavigationContainer>
  );
};

export default MainNav;
