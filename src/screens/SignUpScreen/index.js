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
import appst from '../../constants/AppStyle';
import Header from '../../components/Header';
import {CustomedButton} from '../../components';
import CustomTextInput from '../../components/Input';
import {register} from '../../redux/thunks/UserThunks';
import {validateFields} from '../../utils/functions/validData';
import DropdownComponent from '../../components/ButtonLanguages';

const SignUpScreen = () => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {isLoading} = useSelector(state => state.user);
  const [errors, setErrors] = useState({});

  const handleSignUp = () => {
    if (!validateFields(name, email, password, setErrors)) {
      ToastAndroid.show('Vui lòng điền đầy đủ thông tin', ToastAndroid.SHORT);
      return;
    }

    dispatch(register({email, password, name}))
      .unwrap()
      .then(() => {
        ToastAndroid.show('Register successfully', ToastAndroid.SHORT);
        navigation.navigate('OtpVerification', {email});
      })
      .catch(error => {
        ToastAndroid.show(
          'Register failed: ' + error.message,
          ToastAndroid.SHORT,
        );
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
        <Text style={styles.text1}>{t('titles.signup')}</Text>
        <Text style={styles.text2}>{t('titles.sub_title')}</Text>
      </View>
      <View style={{position: 'relative'}}>
        <CustomTextInput
          label={t('form_input.name')}
          placeholder={t('form_input.placeholder_name')}
          value={name}
          onChangeText={setName}
        />
        {errors.name && (
          <Text style={{color: 'red', position: 'absolute', bottom: 12}}>
            {errors.name}
          </Text>
        )}
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

      <View>
        <CustomedButton
          title={
            isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              t('buttons.btn_signup')
            )
          }
          titleStyle={styles.textPress}
          style={styles.press}
          onPress={handleSignUp}
          disabled={isLoading}
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
      <View style={[appst.center, {marginTop: 30}]}>
        <Text style={styles.text7}>
          {t('titles.have_account')}{' '}
          <Text
            style={styles.text8}
            onPress={() => navigation.navigate('LoginScreen')}>
            {t('buttons.btn_signin')}
          </Text>
        </Text>
        <DropdownComponent />
      </View>
    </View>
  );
};

export default SignUpScreen;
