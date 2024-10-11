import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import styles from './style';
import Header from '../../components/Header';
import appst from '../../constants/AppStyle';
import {CustomedButton} from '../../components';
import CustomTextInput from '../../components/Input';
import {handleNavigate} from '../../utils/functions/navigationHelper';
import {
  validateEmail,
  validatePassword,
} from '../../utils/validate/ValidString';
import {login, loginWithGG} from '../../redux/thunks/UserThunks';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId:
    '376658898807-l5sdnif3gi80l9e9o07ldiv5kitk03mn.apps.googleusercontent.com',
});
const LoginScreen = () => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const [email, setEmail] = useState('HongLinh@gmail.com');
  const [password, setPassword] = useState('Linh@08012004');
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const useAppDispatch = () => useDispatch();
  const dispatch = useAppDispatch();
  const useAppSelector = useSelector;
  const userState = useAppSelector(state => state.user);

  const handleLogin = async () => {
    try {
      const body = {
        email: email,
        password: password,
      };

      if (!email || !password) {
        ToastAndroid.show('Khong de trong form', ToastAndroid.SHORT);
        return;
      }

      if (!validateEmail(email)) {
        ToastAndroid.show('Mail sai dinh dang', ToastAndroid.SHORT);
        return;
      }

      if (!validatePassword(password)) {
        ToastAndroid.show('Mk sai dinh dang', ToastAndroid.SHORT);
        return;
      }

      console.log('user information =>>>>', userState);

      const resultAction = await dispatch(login(body));

      if (login.fulfilled.match(resultAction)) {
        ToastAndroid.show('Đăng nhập thành công', ToastAndroid.SHORT);
        handleNavigate(navigation, 'BottomNav');
      } else {
        ToastAndroid.show('Đăng nhập thất bại', ToastAndroid.SHORT);
      }
    } catch (error) {
      console.log('error', error);
      ToastAndroid.show('Đăng nhập failed', ToastAndroid.SHORT);
    }
  };

  const singinWithGG = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo.data.user);
      const resultF = await dispatch(
        loginWithGG({
          name: userInfo.data.user.name,
          email: userInfo.data.user.email,
          avatar: userInfo.data.user.photo,
        }),
      );
      if (loginWithGG.fulfilled.match(resultF)) {
        navigation.navigate('BottomNav');
      }
    } catch (error) {
      console.log(error);
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
        isPassword={true}
        onTogglePassword={() => setSecureTextEntry(!secureTextEntry)}
        value={password}
        onChangeText={setPassword}
      />
      <View style={appst.rowEnd}>
        <Text
          style={styles.text4}
          onPress={() => handleNavigate(navigation, 'ForgotPassWord')}>
          {t('titles.reset_password')}
        </Text>
      </View>
      <View>
        <CustomedButton
          title={t('buttons.btn_signin')}
          // title={
          //   loading ? (
          //     <ActivityIndicator color="#fff" />
          //   ) : (
          //     t('buttons.btn_signin')
          //   )
          // }
          onPress={handleLogin}
          titleStyle={styles.textPress}
          // onPress={() => handleNavigate(navigation, 'BottomNav')}
          // disabled={loading}
          style={styles.press}
        />
      </View>
      <View>
        <TouchableOpacity onPress={singinWithGG} style={styles.buttonGoogle}>
          <Image
            style={styles.iconGoogle}
            source={require('../../assets/icons/google.png')}
          />
          <Text style={styles.text6}>{t('buttons.btn_signin_gg')}</Text>
        </TouchableOpacity>
      </View>
      <View style={[appst.center, {marginTop: 150}]}>
        <Text style={styles.text7}>
          {t('titles.new_users')}
          <Text
            style={styles.text8}
            onPress={() => handleNavigate(navigation, 'SignUpScreen')}>
            {t('buttons.btn_create_account')}
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default LoginScreen;
