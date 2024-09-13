import React, {useState} from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';
import styles from './style';
import appst from '../../constants/AppStyle';
import {useNavigation} from '@react-navigation/native';
import CustomTextInput from '../../components/Input';
import {CustomedButton} from '../../components';
import Header from '../../components/Header';
import {handleNavigate} from '../../utils/functions/navigationHelper';
import {useTranslation} from 'react-i18next';

const SignUpScreen = () => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const [secureTextEntry, setSecureTextEntry] = useState(true);

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
      />
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

      <View>
        <CustomedButton
          title={t('buttons.btn_signup')}
          titleStyle={styles.textPress}
          style={styles.press}
          onPress={() => handleNavigate(navigation, 'LoginScreen')}
        />
      </View>
      <View>
        <TouchableOpacity style={styles.buttonGoogle}>
          <Image
            style={styles.iconGoogle}
            source={require('../../assets/icons/google.png')}
          />
          <Text style={styles.text6}>{t('buttons.btn_signup_gg')}</Text>
        </TouchableOpacity>
      </View>
      <View style={[appst.center, {marginTop: 50}]}>
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
