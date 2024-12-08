import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import StackNav from './StackNav';

const linking = {
  prefixes: ['http://mateshoe.com', 'mateshoe://'],
  config: {
    screens: {
      BottomNav: '/main/home',
      ProductDetail: '/main/product/:index', 
    },
  },
};

const MainNav = () => {
  return (
    <NavigationContainer linking={linking}>
      <StackNav />
    </NavigationContainer>
  );
};

export default MainNav;
