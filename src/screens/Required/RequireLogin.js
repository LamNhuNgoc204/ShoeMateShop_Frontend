import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import styles from './style';
import appst from '../../constants/AppStyle';
import Header from '../../components/Header';
import {useTranslation} from 'react-i18next';

const RequireLogin = () => {
  const navigation = useNavigation();
  const {t} = useTranslation();

  return (
    <View style={appst.container}>
      <Header
        iconLeft={require('../../assets/icons/back.png')}
        leftOnPress={() => navigation.goBack()}
      />
      <View style={styles.container}>
        <Image
          source={require('../../assets/icons/logo.png')}
          style={styles.image}
        />
        <Text style={styles.title}>Đăng nhập để tiếp tục</Text>
        <Text style={styles.subtitle}>
          Để trải nghiệm đầy đủ các tính năng, hãy đăng nhập vào tài khoản của
          bạn.
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={async () => {
            await AsyncStorage.removeItem('token');
            navigation.replace('LoginScreen');
          }}>
          <Text style={styles.buttonText}>Đăng nhập</Text>
        </TouchableOpacity>

        <Text style={styles.footer}>
          Chưa có tài khoản?{' '}
          <Text
            style={styles.signUpLink}
            onPress={() => {
              navigation.navigate('SignUpScreen');
            }}>
            Đăng ký ngay
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default RequireLogin;
