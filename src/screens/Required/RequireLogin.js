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
        <Text style={styles.title}>{t('login.continue')}</Text>
        <Text style={styles.subtitle}>{t('login.title1')}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={async () => {
            await AsyncStorage.removeItem('token');
            navigation.replace('LoginScreen');
          }}>
          <Text style={styles.buttonText}>{t('buttons.btn_signin')}</Text>
        </TouchableOpacity>

        <Text style={styles.footer}>
          {t('login.no_acc')}{' '}
          <Text
            style={styles.signUpLink}
            onPress={() => {
              navigation.navigate('SignUpScreen');
            }}>
            {t('buttons.btn_signup')}
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default RequireLogin;
