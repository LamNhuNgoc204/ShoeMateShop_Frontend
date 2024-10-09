import { Text, View, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import appst from '../../constants/AppStyle';
import { useNavigation } from '@react-navigation/native';
import CustomTextInput from '../../components/Input';
import styles from './style';
import { CustomedButton } from '../../components';
import Header from '../../components/Header';
import { handleNavigate } from '../../utils/functions/navigationHelper';
import { useTranslation } from 'react-i18next';
import { loginRequest, loginSuccess, loginFailure } from '../../redux/actions/authActions';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AxiosInstance from '../../helpers/AxiosInstance';

const LoginScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { loading, error } = useSelector(state => state.auth);

  const handleLogin = async () => {
    console.log(email, password);
    dispatch(loginRequest());
    try {
      const response = await AxiosInstance().post('auth/login', { email, password });

      console.log("response: ",response.data);
      const { user, token } = response.data;

    

      // Navigate based on isVerified
      if (user.isVerified === false) {
        navigation.navigate('OtpVerification', { email });
      } else {
          // Save token
      await AsyncStorage.setItem('token', token);
      dispatch(loginSuccess(user, token));
        navigation.navigate('HomeScreen');
      }
    } catch (error) {
      dispatch(loginFailure(error.message));
    }
  };

  return (
    <View style={styles.container}>
      <Header
        background={'#efefef'}
        iconLeft={require('../../assets/icons/back.png')}
        leftOnPress={() => navigation.goBack()}
      />
      <View style={appst.center}>
        <Text style={styles.text1}>{t('titles.signin')}</Text>
        <Text style={styles.text2}>{t('titles.sub_title')}</Text>
      </View>
      <CustomTextInput
        label={t('form_input.email')}
        placeholder={t('form_input.placeholder_email')}
        value={email}
        onChangeText={setEmail}
      />
      <CustomTextInput
        label={t('form_input.password')}
        placeholder={t('form_input.placeholder_password')}
        secureTextEntry={secureTextEntry}
        value={password}
        onChangeText={setPassword}
        isPassword={true}
        onTogglePassword={() => setSecureTextEntry(!secureTextEntry)}
      />
      <View style={appst.rowEnd}>
        <Text
          style={styles.text4}
          onPress={() => handleNavigate(navigation, 'ForgotPassWord')}
        >
          {t('titles.reset_password')}
        </Text>
      </View>
      <View>
        <CustomedButton
          title={loading ? <ActivityIndicator color="#fff" /> : t('buttons.btn_signin')}
          onPress={handleLogin}
          titleStyle={styles.textPress}
          disabled={loading}
          style={styles.press}
        />
      </View>
      <View>
        <TouchableOpacity style={styles.buttonGoogle}>
          <Image
            style={styles.iconGoogle}
            source={require('../../assets/icons/google.png')}
          />
          <Text style={styles.text6}>{t('buttons.btn_signin_gg')}</Text>
        </TouchableOpacity>
      </View>
      <View style={[appst.center, { marginTop: 150 }]}>
        <Text style={styles.text7}>
          {t('titles.new_users')}
          <Text
            style={styles.text8}
            onPress={() => handleNavigate(navigation, 'SignUpScreen')}
          >
            {t('buttons.btn_create_account')}
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default LoginScreen;
