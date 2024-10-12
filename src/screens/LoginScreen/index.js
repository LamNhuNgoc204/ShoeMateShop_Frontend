import React, {useState} from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import styles from './style';
import Header from '../../components/Header';
import appst from '../../constants/AppStyle';
import {CustomedButton} from '../../components';
import CustomTextInput from '../../components/Input';
import {handleNavigate} from '../../utils/functions/navigationHelper';
import {login} from '../../redux/thunks/UserThunks';

const LoginScreen = () => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const {isLoading} = useSelector(state => state.user);
  const [errors, setErrors] = useState({});

  const validateFields = () => {
    const newErrors = {};
    if (!email) {
      newErrors.email = 'Email không được bỏ trống.';
    }
    if (!password) {
      newErrors.password = 'Mật khẩu không được bỏ trống.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; 
    };

  const handleLogin = async () => {
    if (!validateFields()) {
      ToastAndroid.show('Vui lòng điền đầy đủ thông tin', ToastAndroid.SHORT);
      return;
    }

    const body = {
      email,
      password,
    };

    const resultAction = await dispatch(login(body));

    if (login.fulfilled.match(resultAction)) {
      const { user } = resultAction.payload;
      ToastAndroid.show('Đăng nhập thành công', ToastAndroid.SHORT);

      if (!user.isVerified) {
        navigation.navigate('OtpVerification', { email });
      } else {
        navigation.navigate('HomeScreen'); 
      }
    } else {
      ToastAndroid.show('Đăng nhập thất bại', ToastAndroid.SHORT);
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
        <Text style={styles.text1}>{t('titles.login')}</Text>
        <Text style={styles.text2}>{t('titles.sub_title')}</Text>
      </View>

      <View style={{position: 'relative'}}>
        <CustomTextInput
          label={t('form_input.email')}
          placeholder={t('form_input.placeholder_email')}
          value={email}
          onChangeText={setEmail}
        />
        {errors.email && (
          <Text style={{color: 'red', position: 'absolute', bottom: 12}}>
            {errors.email}
          </Text>
        )}
      </View>

      <View style={{position: 'relative'}}>
        <CustomTextInput
          label={t('form_input.password')}
          placeholder={t('form_input.placeholder_password')}
          secureTextEntry={secureTextEntry}
          isPassword={true}
          onTogglePassword={() => setSecureTextEntry(!secureTextEntry)}
          value={password}
          onChangeText={setPassword}
        />
        {errors.password && (
          <Text style={{color: 'red'}}>
            {errors.password}
          </Text>
        )}
      </View>

      <View>
        <CustomedButton
          title={isLoading ? <ActivityIndicator color="#fff" /> : t('buttons.btn_login')}
          titleStyle={styles.textPress}
          style={styles.press}
          onPress={handleLogin}
          disabled={isLoading}
        />
      </View>

      <View style={[appst.center, {marginTop: 50}]}>
        <Text style={styles.text7}>
          {t('titles.no_account')}
          <Text
            style={styles.text8}
            onPress={() => handleNavigate(navigation, 'SignUpScreen')}>
            {t('buttons.btn_signup')}
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default LoginScreen;
