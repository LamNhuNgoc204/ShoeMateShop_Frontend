import {
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ToastAndroid,
} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import appst from '../../constants/AppStyle';
import {spacing} from '../../constants';
import styles from './style';
import {useNavigation, useRoute} from '@react-navigation/native';
import {CustomedButton} from '../../components';
import {useTranslation} from 'react-i18next';
import AxiosInstance from '../../helpers/AxiosInstance';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OtpVerification = () => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const route = useRoute();
  const {email} = route.params || '';
  const [otp, setOtp] = useState(['', '', '', '']);
  const [completeOtp, setCompleteOtp] = useState('');
  const inputs = useRef([]);
  const [resendOtp, setResendOtp] = useState(false);
  const [timer, setTimer] = useState(60);

  useEffect(() => {
    if (resendOtp && timer > 0) {
      const countdown = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);
      return () => clearInterval(countdown);
    }
  }, [resendOtp, timer]);

  const handleResendOtp = async () => {
    try {
      await AxiosInstance().post('auth/resend-otp', {email});
      ToastAndroid.show(
        t('notifications.send_otp_success'),
        ToastAndroid.SHORT,
      );
      setResendOtp(true);
      setTimer(60);
    } catch (error) {
      ToastAndroid.show(t('notifications.send_otp_error'), ToastAndroid.SHORT);
    }
  };

  const handleChangeText = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text.length === 1 && index < 3) {
      inputs.current[index + 1].focus();
    }

    if (newOtp.every(digit => digit.length === 1)) {
      setCompleteOtp(newOtp.join(''));
    }
  };

  const handleVerify = async () => {
    try {
      const response = await AxiosInstance().post('auth/verify-email', {
        email,
        otpCode: completeOtp,
      });

      if (response.status && response.data.token) {
        await AsyncStorage.setItem('token', response.data.token);
        ToastAndroid.show(
          t('notifications.verify_success'),
          ToastAndroid.SHORT,
        );
        navigation.navigate('BottomNav');
      }
    } catch (error) {
      ToastAndroid.show(t('notifications.verify_error'), ToastAndroid.SHORT);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image
          style={appst.icon40}
          source={require('../../assets/icons/ic_back.png')}
        />
      </TouchableOpacity>
      <View style={[appst.center]}>
        <Text style={styles.text1}>{t('titles.otp')}</Text>
        <Text style={styles.text2}>{t('titles.sub_otp')}</Text>
        <Text style={styles.text3}>OTP Code</Text>
      </View>
      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            style={styles.otpInput}
            value={digit}
            onChangeText={text => handleChangeText(text, index)}
            onKeyPress={e => handleKeyPress(e, index)}
            keyboardType="number-pad"
            maxLength={1}
            ref={ref => (inputs.current[index] = ref)}
          />
        ))}
      </View>
      <View>
        <CustomedButton
          title={t('buttons.btn_verify')}
          titleStyle={styles.textPress}
          onPress={handleVerify}
          style={styles.press}
        />
      </View>
      <View style={[appst.rowCenter, {marginTop: spacing.xm}]}>
        <TouchableOpacity
          onPress={handleResendOtp}
          disabled={resendOtp && timer > 0}>
          <Text style={styles.text4}>{t('titles.resend_code')}</Text>
        </TouchableOpacity>
        {resendOtp && (
          <Text style={styles.text4}>{` 0:${
            timer < 10 ? `0${timer}` : timer
          }`}</Text>
        )}
      </View>
    </View>
  );
};

export default OtpVerification;
