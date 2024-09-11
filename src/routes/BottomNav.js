import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  createBottomTabNavigator,
  BottomTabBarProps,
} from '@react-navigation/bottom-tabs';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Svg, {Path} from 'react-native-svg';
import HomeScreen from '../screens/HomeScreen';
import CartScreen from '../screens/CartScreen';
import FavoriteScreen from '../screens/FavoriteScreen';
import ProfileScreen from '../screens/Profile';
import SearchScreen from '../screens/SearchScreen';

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
                    navigation.navigate(route.name);
                    setActiveTab(route.name);
                  }}
                  isCartScreen={isCartScreen}>
                  <Text>{isCartScreen ? '🛒' : '?'}</Text>
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
      screenOptions={{
        tabBarStyle: {
          height: 80,
        },
        headerShown: false,
      }}
      tabBar={props => <AnimatedTabBar {...props} />}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="CartScreen" component={CartScreen} />
      <Tab.Screen name="FavoriteScreen" component={FavoriteScreen} />
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
    backgroundColor: 'blue',
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
