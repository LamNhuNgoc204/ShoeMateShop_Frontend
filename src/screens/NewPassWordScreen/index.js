import {Text, View, Alert,ToastAndroid} from 'react-native';
import React, {useState} from 'react';
import appst from '../../constants/AppStyle';
import CustomTextInput from '../../components/Input';
import styles from './style';
import {CustomedButton} from '../../components';
import Header from '../../components/Header';
import {useTranslation} from 'react-i18next';
import {useNavigation,useRoute} from '@react-navigation/native';
import AxiosInstance from "../../helpers/AxiosInstance"
const NewPassWordScreen = () => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const route = useRoute();
  const {email} = route.params || '';
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [secureNewPass, setsecureNewPass] = useState(true);
  const [secureConNewPass, setsecureConNewPass] = useState(true);

  // Hàm validate mật khẩu
  const handleValidate = () => {
    if (!newPassword || !confirmPassword) {
      ToastAndroid.show(
       "Không được để trống mật khẩu",
        ToastAndroid.SHORT,
      );
      return false;
    }

    if (newPassword.length < 6) {
      ToastAndroid.show(
        "Mật khẩu phải trên 6 kí tự",
         ToastAndroid.SHORT,
       );
      return false;
    }

    if (newPassword !== confirmPassword) {
      ToastAndroid.show(
        "Mật khẩu phải trùng nhau",
         ToastAndroid.SHORT,
       );
      return false;
    }

    return true;
  };

  const handleConfirm = async() => {
    if (handleValidate()) {
      console.log('Password is valid:', newPassword);
      console.log('email:', email);
      try {
        const response = await AxiosInstance().put("/auth/reset-password-forgot-password", {
          newPassword: newPassword,
          email:email
        });
        if (response.status) {
          navigation.navigate('LoginScreen');
          ToastAndroid.show(
            "Đã cập nhật mật khẩu thành công,vui lòng đăng nhập lại", 
             ToastAndroid.SHORT,
           );
        }
        else {
          ToastAndroid.show(
            "Vui lòng thử lại sau", 
             ToastAndroid.SHORT,
           );
        }
      } catch (error) {
        ToastAndroid.show(
          "Vui lòng thử lại sau nhé", 
           ToastAndroid.SHORT,
         );
      }
     
     
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
        <Text style={styles.text1}>{t('form_input.newpass')}</Text>
        <Text style={styles.text2}>{t('titles.sub_newpass')}</Text>
      </View>

      <View style={styles.ViewInput}>
        <CustomTextInput
          label={t('form_input.newpass')}
          placeholder={t('form_input.placeholder_newpass')}
          secureTextEntry={secureNewPass}
          isPassword={true}
          onTogglePassword={() => setsecureNewPass(!secureNewPass)}
          value={newPassword} 
          onChangeText={setNewPassword}
        />
      </View>

   
      <View style={styles.ViewInput}>
        <CustomTextInput
          label={t('form_input.confirm_pass')}
          placeholder={t('form_input.placeholder_confirm')}
          secureTextEntry={secureConNewPass}
          isPassword={true}
          onTogglePassword={() => setsecureConNewPass(!secureConNewPass)}
          value={confirmPassword} 
          onChangeText={setConfirmPassword} 
        />
      </View>

      <View style={{marginTop: 300}}>
        <CustomedButton
          title={t('buttons.btn_confirm')}
          titleStyle={styles.textPress}
          onPress={handleConfirm} 
          style={styles.press}
        />
      </View>
    </View>
  );
};

export default NewPassWordScreen;
