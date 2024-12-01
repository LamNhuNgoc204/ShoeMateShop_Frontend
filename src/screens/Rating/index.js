import {View} from 'react-native';
import React, {useEffect} from 'react';
import ratingst from './style';
import appst from '../../constants/AppStyle';
import Header from '../../components/Header';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import ToRate from './ToRate';
import MyReviews from './MyReviews';
import {colors} from '../../constants/colors';
import {sizes} from '../../constants';
import {fonts} from '../../constants/fonts';
import {useTranslation} from 'react-i18next';

const MyRating = ({navigation, route}) => {
  const {t} = useTranslation();
  const TopTab = createMaterialTopTabNavigator();

  const initialRoute = route?.params?.initialRoute || t('review.rating');
  console.log('initialRoute', initialRoute);

  useEffect(() => {
    if (route.params?.initialRoute) {
      navigation.navigate(route.params.initialRoute);
    }
  }, [route.params?.initialRoute]);

  return (
    <View style={[ratingst.container, appst.container]}>
      <Header
        name={t('profiles.rating')}
        iconLeft={require('../../assets/icons/back.png')}
        leftOnPress={() => navigation.goBack()}
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
          },
          tabBarStyle: {
            backgroundColor: colors.colorF3F6FF,
            padding: 0,
            margin: 0,
          },
          lazy: true,
        }}>
        <TopTab.Screen name={t('review.rating')} component={ToRate} />
        <TopTab.Screen name={t('review.to_review')} component={MyReviews} />
      </TopTab.Navigator>
    </View>
  );
};

export default MyRating;
