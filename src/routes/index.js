import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import StackNav from './StackNav';

const MainNav = () => {
  return (
    <NavigationContainer>
      <StackNav />
    </NavigationContainer>
  );
};

export default MainNav;
