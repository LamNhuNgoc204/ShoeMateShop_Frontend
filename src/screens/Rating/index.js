import {View, Text} from 'react-native';
import React from 'react';
import ratingst from './style';
import appst from '../../constants/AppStyle';
import Header from '../../components/Header';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import ToRate from './ToRate';
import MyReviews from './MyReviews';
import {colors} from '../../constants/colors';
import {sizes} from '../../constants';
import {fonts} from '../../constants/fonts';

const MyRating = () => {
  const TopTab = createMaterialTopTabNavigator();

  return (
    <View style={[ratingst.container, appst.container]}>
      <Header
        name={'My Rating'}
        iconLeft={require('../../assets/icons/back.png')}
        leftOnPress={() => {}}
      />
      <TopTab.Navigator
        screenOptions={{
          tabBarLabelStyle: {
            textTransform: 'none',
            fontSize: sizes.size15,
            fontFamily: fonts.rlw_semibold,
          },
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.black,
          tabBarIndicatorStyle: {
            backgroundColor: 'blue',
            width: '25%',
            marginHorizontal: '13%',
          },
          tabBarStyle: {
            backgroundColor: colors.colorF3F6FF,
            padding: 0,
            margin: 0
          },
        }}>
        <TopTab.Screen name="To Rate" component={ToRate} />
        <TopTab.Screen name="My Reviews" component={MyReviews} />
      </TopTab.Navigator>
    </View>
  );
};

export default MyRating;
