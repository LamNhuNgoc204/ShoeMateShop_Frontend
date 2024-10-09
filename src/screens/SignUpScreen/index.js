import React, { useState } from 'react';
import { Text, View, Image, TouchableOpacity, ActivityIndicator, ToastAndroid } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import styles from './style';
import appst from '../../constants/AppStyle';
import { useNavigation } from '@react-navigation/native';
import CustomTextInput from '../../components/Input';
import { CustomedButton } from '../../components';
import Header from '../../components/Header';
import { handleNavigate } from '../../utils/functions/navigationHelper';
import { useTranslation } from 'react-i18next';
import AxiosInstance from '../../helpers/AxiosInstance';

const SignUpScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Lấy trạng thái từ authReducer
  const { loading, error, user } = useSelector(state => state.auth);

  const handleSignUp = async () => {
    dispatch({ type: 'REGISTER_REQUEST' });
    try {
      const response = await AxiosInstance().post('auth/signup', {
        email,
        password,
        name,
      });
      dispatch({ type: 'REGISTER_SUCCESS', payload: response.data });
      ToastAndroid.show('Resigster successfully', ToastAndroid.SHORT);
      navigation.navigate('OtpVerification', { email });
  
    } catch (error) {
      dispatch({ type: 'REGISTER_FAILURE', payload: error.message });
      ToastAndroid.show('Register failed', ToastAndroid.SHORT);
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
        <Text style={styles.text1}>{t('titles.signup')}</Text>
        <Text style={styles.text2}>{t('titles.sub_title')}</Text>
      </View>
      <CustomTextInput
        label={t('form_input.name')}
        placeholder={t('form_input.placeholder_name')}
        value={name}
        onChangeText={setName}
      />
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
        isPassword={true}
        onTogglePassword={() => setSecureTextEntry(!secureTextEntry)}
        value={password}
        onChangeText={setPassword}
      />

      <View>
        <CustomedButton
          title={loading ? <ActivityIndicator color="#fff" /> : t('buttons.btn_signup')}
          titleStyle={styles.textPress}
          style={styles.press}
          onPress={handleSignUp}
          disabled={loading} 
        />
      </View>
      {error && (
        <Text style={{ color: 'red', textAlign: 'center', marginTop: 10 }}>
          {t('titles.signup_failed')}: {error}
        </Text>
      )}
      <View>
        <TouchableOpacity style={styles.buttonGoogle}>
          <Image
            style={styles.iconGoogle}
            source={require('../../assets/icons/google.png')}
          />
          <Text style={styles.text6}>{t('buttons.btn_signup_gg')}</Text>
        </TouchableOpacity>
      </View>
      <View style={[appst.center, { marginTop: 50 }]}>
        <Text style={styles.text7}>
          {t('titles.have_account')}
          <Text
            style={styles.text8}
            onPress={() => handleNavigate(navigation, 'LoginScreen')}>
            {t('buttons.btn_signin')}
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default SignUpScreen;
