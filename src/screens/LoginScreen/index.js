import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import styles from './style';
import Header from '../../components/Header';
import appst from '../../constants/AppStyle';
import {CustomedButton} from '../../components';
import CustomTextInput from '../../components/Input';
import {login, loginWithGG} from '../../redux/thunks/UserThunks';
import DropdownComponent from '../../components/ButtonLanguages';
import {validateFieldsLogin} from '../../utils/functions/validData';
import {checkTokenValidity} from '../../utils/functions/checkToken';
import Toast from 'react-native-toast-message';

GoogleSignin.configure({
  webClientId:
    '376658898807-l5sdnif3gi80l9e9o07ldiv5kitk03mn.apps.googleusercontent.com',
});
const LoginScreen = () => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [errors, setErrors] = useState({});
  const [email, setEmail] = useState('nora@gmail.com');
  const [password, setPassword] = useState('Nora@123');
  const {isLoading} = useSelector(state => state.user);
  const authState = useSelector(state => state.user);
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const handleLogin = async () => {
    if (!validateFieldsLogin(email, password, setErrors)) {
      Toast.show({text1: `${t('toast.type')}`, type: 'error'});
      return;
    }
    const body = {
      email,
      password,
    };

    const resultAction = await dispatch(login(body));
    if (login.fulfilled.match(resultAction)) {
      const {user} = resultAction.payload;
      if (!user?.isVerified) {
        navigation.navigate('OtpVerification', {email});
      } else {
        navigation.reset({
          index: 0,
          routes: [{name: 'BottomNav'}],
        });
      }
      Toast.show({text1: `${t('toast.login_succ')}`, type: 'success'});
    } else {
      Toast.show({text1: `${t('toast.login_fail')}`, type: 'error'});
    }
  };

  const singinWithGG = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo.data.user);
      dispatch(
        loginWithGG({
          name: userInfo.data.user.name,
          email: userInfo.data.user.email,
          avatar: userInfo.data.user.photo,
        }),
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      const isTokenValid = await checkTokenValidity();
      if (isTokenValid) {
        if (authState.user) {
          navigation.reset({
            index: 0,
            routes: [{name: 'BottomNav'}],
          });
        }
      } else {
        return;
      }
    };

    checkAuth();

    const user = authState?.user;
    if (user?.isVerified) {
      navigation.reset({
        index: 0,
        routes: [{name: 'BottomNav'}],
      });
    }
  }, [authState?.user]);

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
          <Text style={{color: 'red'}}>{errors.password}</Text>
        )}
      </View>

      <TouchableOpacity
        onPress={() => navigation.navigate('ForgotPassWord')}
        style={appst.rowEnd}>
        <Text style={styles.text4}>{t('titles.forgot_password')}?</Text>
      </TouchableOpacity>

      <View>
        <CustomedButton
          title={
            isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              t('buttons.btn_login')
            )
          }
          titleStyle={styles.textPress}
          style={styles.press}
          onPress={handleLogin}
          disabled={isLoading}
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
      <View style={[appst.center, {marginTop: 130}]}>
        <Text style={styles.text7}>
          {t('titles.new_users')}
          <Text
            style={styles.text8}
            onPress={() => navigation.navigate('SignUpScreen')}>
            {t('buttons.btn_create_account')}
          </Text>
        </Text>
        <DropdownComponent />
      </View>
    </View>
  );
};

export default LoginScreen;
