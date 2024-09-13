import {Text, View, Image, TouchableOpacity, TextInput} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import appst from '../../constants/AppStyle';
import {spacing} from '../../constants';
import styles from './style';
import {useNavigation} from '@react-navigation/native';
import {CustomedButton} from '../../components';
import {useTranslation} from 'react-i18next';

const OtpVerification = () => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const [otp, setOtp] = useState(['', '', '', '']);
  const [completeOtp, setCompleteOtp] = useState('');
  const inputs = useRef([]);
  console.log(completeOtp);

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

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && otp[index] === '' && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  useEffect(() => {
    if (otp.every(digit => digit.length === 1)) {
      setCompleteOtp(otp.join(''));
    }
  }, [otp]);

  const handeVerify = () => {
    if (completeOtp === '1234') {
      navigation.navigate('HomeScreen');
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
          title={'Verify'}
          titleStyle={styles.textPress}
          onPress={handeVerify}
          style={styles.press}
        />
      </View>
      <View style={[appst.rowCenter, {marginTop: spacing.xm}]}>
        <Text style={styles.text4}>{t('titles.resend_code')}</Text>
        <Text style={styles.text4}>0:30</Text>
      </View>
    </View>
  );
};

export default OtpVerification;
