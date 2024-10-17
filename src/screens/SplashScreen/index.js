import {View, Image} from 'react-native';
import React, {useEffect} from 'react';
import appst from '../../constants/AppStyle';
import splashStyle from './style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    const checkAppStatus = async () => {
      try {
        const isFirstLaunch = await AsyncStorage.getItem('isFirstLaunch');
        const token = await AsyncStorage.getItem('token');

        if (token) {
          // Kiểm tra token
          const response = await axios.post(
            'http://192.168.1.68:3000/auth/protected',
            {
              token,
            },
          );
          if (response.status === 200) {
            // Token hợp lệ => vào Home
            navigation.replace('BottomNav');
          } else {
            // Token hết hạn => về Login
            await AsyncStorage.removeItem('token');
            navigation.replace('LoginScreen');
          }
        } else if (isFirstLaunch === null) {
          // Lần đầu vào app => vào onboarding
          AsyncStorage.setItem('isFirstLaunch', 'false');
          navigation.replace('OnBoardScreen');
        } else {
          // Không phải lần đầu, chưa đăng nhập => vào Home
          navigation.replace('BottomNav');
        }
      } catch (error) {
        console.log('Error checking token', error);
        navigation.replace('LoginScreen');
      }
    };

    setTimeout(checkAppStatus, 2000);
  }, []);

  return (
    <View style={[appst.container, splashStyle.container]}>
      <Image
        style={splashStyle.logo}
        source={require('../../assets/images/logo.png')}
      />
    </View>
  );
};

export default SplashScreen;
