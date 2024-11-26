import React, {useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Pressable, StyleSheet, Text, View, Image} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Svg, {Path} from 'react-native-svg';
import HomeScreen from '../screens/HomeScreen';
import CartScreen from '../screens/CartScreen';
import FavoriteScreen from '../screens/FavoriteScreen';
import ProfileScreen from '../screens/Profile';
import Notifycation from '../screens/Notifycation';

const Tab = createBottomTabNavigator();

const TabBarComponent = ({onPress, isCartScreen, children}) => {
  return (
    <Pressable
      onPress={onPress}
      style={[style.component, isCartScreen && style.cartComponent]}>
      <View style={[isCartScreen && style.componentCircle]} />
      <View style={style.iconContainer}>{children}</View>
    </Pressable>
  );
};

const BottomNav = () => {
  const [activeTab, setActiveTab] = useState('Home');
  const [homeKey, setHomeKey] = useState(0);

  const AnimatedTabBar = ({
    state: {index: activeIndex, routes},
    navigation,
    descriptors,
    insets,
  }) => {
    const {bottom} = useSafeAreaInsets();

    return (
      <View style={[style.tabBar, {paddingBottom: bottom}]}>
        <View style={style.tabBarContainer}>
          {routes.map((route, index) => {
            const isCartScreen = route.name === 'CartScreen';
            const isHomeScreen = route.name === 'Home';

            let iconImage;
            if (route.name === 'Home') {
              iconImage = require('../assets/icon_bottom/home.png');
            } else if (route.name === 'Search') {
              iconImage = require('../assets/icon_bottom/heart.png');
            } else if (route.name === 'Notifycation') {
              iconImage = require('../assets/icon_bottom/notification.png');
            } else if (route.name === 'ProfileScreen') {
              iconImage = require('../assets/icon_bottom/profile.png');
            }

            return (
              <View key={route.key} style={{flex: 1, alignItems: 'center'}}>
                {isCartScreen && (
                  <Svg
                    width={110}
                    height={60}
                    viewBox="0 0 110 60"
                    style={style.activeBackground}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none">
                    <Path
                      fill="#fff"
                      d="M20 0H0c11.046 0 20 8.954 20 20v5c0 19.33 15.67 35 35 35s35-15.67 35-35v-5c0-11.046 8.954-20 20-20H20z"
                    />
                  </Svg>
                )}
                <TabBarComponent
                  onPress={() => {
                    if (isHomeScreen && activeTab === 'Home') {
                      // Khi nhấn vào icon `Home` đã active
                      navigation.navigate('Home', {reload: true}); // truyền biến để reload
                    } else {
                      // Khi nhấn vào tab khác
                      navigation.navigate(route.name);
                      setActiveTab(route.name);
                    }
                  }}
                  // onPress={() => {
                  //   navigation.navigate(route.name);
                  //   setActiveTab(route.name);
                  // }}
                  isCartScreen={isCartScreen}>
                  {isCartScreen ? (
                    <Image
                      source={require('../assets/icon_bottom/cart.png')}
                      style={{
                        width: 24,
                        height: 24,
                        // tintColor: activeIndex === index ? '#0F6DFA' : '#000',
                      }}
                    />
                  ) : (
                    <Image
                      source={iconImage}
                      style={{
                        width: 24,
                        height: 24,
                        tintColor: activeIndex === index ? '#0F6DFA' : '#000',
                      }}
                    />
                  )}
                </TabBarComponent>
              </View>
            );
          })}
        </View>
      </View>
    );
  };

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarStyle: {
          height: 80,
        },
        headerShown: false,
        lazy: true,
        tabBarHideOnKeyboard: true,
      }}
      tabBar={props => <AnimatedTabBar {...props} />}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={FavoriteScreen} />
      <Tab.Screen name="CartScreen" component={CartScreen} />
      <Tab.Screen name="Notifycation" component={Notifycation} />
      <Tab.Screen name="ProfileScreen" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default BottomNav;

const style = StyleSheet.create({
  tabBar: {
    backgroundColor: '#F0F6FB',
  },
  activeBackground: {
    position: 'absolute',
    bottom: 0,
  },
  tabBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  component: {
    height: 60,
    width: 60,
    elevation: 4,
  },
  cartComponent: {
    height: 60,
    width: 60,
    top: -20,
  },
  componentCircle: {
    flex: 1,
    borderRadius: 30,
    backgroundColor: '#0F6DFA',
    elevation: 10,
  },
  iconContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
