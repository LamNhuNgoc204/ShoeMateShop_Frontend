import {Text, View, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import appst from '../../constants/AppStyle';
import {useNavigation} from '@react-navigation/native';
import CustomTextInput from '../../components/Input';
import styles from './style';
import {CustomedButton} from '../../components';
import Header from '../../components/Header';
import {handleNavigate} from '../../utils/functions/navigationHelper';
import {useTranslation} from 'react-i18next';
import { GoogleSignin } from '@react-native-google-signin/google-signin';


GoogleSignin.configure({
  webClientId: "376658898807-l5sdnif3gi80l9e9o07ldiv5kitk03mn.apps.googleusercontent.com"
})
const LoginScreen = () => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const singinWithGG = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn()
      console.log(userInfo.data.user);
    } catch (error) {
      console.log(error);
    }
  }

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
      />
      <CustomTextInput
        label={t('form_input.password')}
        placeholder={t('form_input.placeholder_password')}
        secureTextEntry={secureTextEntry}
        isPassword={true}
        onTogglePassword={() => setSecureTextEntry(!secureTextEntry)}
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
          titleStyle={styles.textPress}
          onPress={() => handleNavigate(navigation, 'BottomNav')}
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
