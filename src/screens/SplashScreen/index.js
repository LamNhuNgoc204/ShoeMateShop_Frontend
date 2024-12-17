import {View, Image, Alert} from 'react-native';
import React, {useEffect} from 'react';
import appst from '../../constants/AppStyle';
import splashStyle from './style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AxiosInstance from '../../helpers/AxiosInstance';
import {useTranslation} from 'react-i18next';

const SplashScreen = ({navigation}) => {
  const {t} = useTranslation();

  useEffect(() => {
    const checkAppStatus = async () => {
      try {
        const isFirstLaunch = await AsyncStorage.getItem('isFirstLaunch');
        const token = await AsyncStorage.getItem('token');

        // if (token) {
        //   // Kiểm tra token
        //   const response = await AxiosInstance().post('/auth/protected', {
        //     token,
        //   });
        //   if (response.status) {
        //     // Token hợp lệ => vào Home
        //     await AsyncStorage.setItem('token', token);
        //     return navigation.replace('BottomNav');
        //   } else {
        //     // Token hết hạn => về Login
        //     Alert.alert(
        //       t('notifications.title'),
        //       t('login.sub_title1'),
        //       [
        //         {
        //           text: 'OK',
        //           onPress: async () => {
        //             await AsyncStorage.removeItem('token');
        //             return navigation.replace('LoginScreen');
        //           },
        //         },
        //       ],
        //       {cancelable: false},
        //     );
        //   }
        // } else
        if (isFirstLaunch === null) {
          // Lần đầu vào app => vào onboarding
          AsyncStorage.setItem('isFirstLaunch', 'false');
          navigation.replace('OnBoardScreen');
        } else {
          // Không phải lần đầu, chưa đăng nhập => vào Home

          if (token) {
            // Kiểm tra token
            const response = await AxiosInstance().post('/auth/protected', {
              token,
            });
            if (response.status) {
              // Token hợp lệ => vào Home
              await AsyncStorage.setItem('token', token);
              return navigation.replace('BottomNav');
            } else {
              navigation.replace('LoginScreen');
            }
          }
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
        source={require('../../assets/images/img_splash.png')}
      />
      {/* <Image source={require('../../assets/images/shoename.png')} /> */}
    </View>
  );
};

export default SplashScreen;
