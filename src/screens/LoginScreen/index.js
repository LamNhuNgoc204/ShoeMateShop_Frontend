import React, { useState } from 'react';
import { Text, View, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import appst from '../../constants/AppStyle';
import { useNavigation } from '@react-navigation/native';
import CustomTextInput from '../../components/Input';
import styles from './style';
import { CustomedButton } from '../../components';
import Header from '../../components/Header';
import { handleNavigate } from '../../utils/functions/navigationHelper';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../redux/slices/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const { loading, error } = useSelector(state => state.auth);

  const handleLogin = () => {
    const validationErrors = {};

    // Kiểm tra xem trường email có để trống không
    if (!email) {
      validationErrors.email = t('Email không được bỏ trống.');
    }

    // Kiểm tra xem trường password có để trống không
    if (!password) {
      validationErrors.password = t('Mật khẩu không được bỏ trống.');
    } else if (password.length < 6) {
      validationErrors.password = t('Mật khẩu phải có ít nhất 6 ký tự.');
    }

    // Nếu có lỗi, set errors và không gửi yêu cầu đăng nhập
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Nếu không có lỗi, thực hiện đăng nhập
    dispatch(loginUser({ email, password }))
      .unwrap()
      .then(async (response) => {
        const { user, token } = response;
        if (user.isVerified === false) {
          navigation.navigate('OtpVerification', { email });
        } else {
          await AsyncStorage.setItem('token', token);
          navigation.navigate('HomeScreen');
        }
      })
      .catch((error) => {
        console.log("Login failed:", error);
      });
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
      <View style={{ position: 'relative' }}>
        <CustomTextInput
          label={t('form_input.email')}
          placeholder={t('form_input.placeholder_email')}
          value={email}
          onChangeText={setEmail}
        />
        {errors.email && (
          <Text style={{ color: 'red', position: 'absolute', bottom: 12 }}>
            {errors.email}
          </Text>
        )}
      </View>
      <View style={{ position: 'relative' }}>
        <CustomTextInput
          label={t('form_input.password')}
          placeholder={t('form_input.placeholder_password')}
          secureTextEntry={secureTextEntry}
          value={password}
          onChangeText={setPassword}
          isPassword={true}
          onTogglePassword={() => setSecureTextEntry(!secureTextEntry)}
        />
        {errors.password && (
          <Text style={{ color: 'red' }}>
            {errors.password}
          </Text>
        )}
      </View>
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
