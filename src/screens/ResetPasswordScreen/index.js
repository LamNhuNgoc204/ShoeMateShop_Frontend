import {Image, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import appst from '../../constants/AppStyle';
import CustomTextInput from '../../components/Input';
import {CustomedButton} from '../../components';
import styles from './style';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';

const ResetPasswordScreen = () => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const [secureCurrentPass, setsecureCurrentPass] = useState(true);
  const [secureNewPass, setsecureNewPass] = useState(true);
  const [secureConNewPass, setsecureConNewPass] = useState(true);

  return (
    <View style={styles.container}>
      <View style={appst.rowCenter}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            style={appst.icon40}
            source={require('../../assets/icons/ic_back.png')}
          />
        </TouchableOpacity>
        <Text style={styles.title}>{t('home.profile')}</Text>
        <View style={{width: 40}} />
      </View>
      <View style={styles.viewBody}>
        <View style={styles.ViewInput}>
          <CustomTextInput
            label={t('form_input.curr_pass')}
            placeholder={t('form_input.placeholder_currpass')}
            secureTextEntry={secureCurrentPass}
            isPassword={true}
            onTogglePassword={() => setsecureCurrentPass(!secureCurrentPass)}
          />
        </View>
        <View style={styles.ViewInput}>
          <CustomTextInput
            label={t('form_input.newpass')}
            placeholder={t('form_input.placeholder_newpass')}
            secureTextEntry={secureNewPass}
            isPassword={true}
            onTogglePassword={() => setsecureNewPass(!secureNewPass)}
          />
        </View>
        <View style={styles.ViewInput}>
          <CustomTextInput
            label={t('form_input.confirm_pass')}
            placeholder={t('form_input.placeholder_confirm')}
            secureTextEntry={secureConNewPass}
            isPassword={true}
            onTogglePassword={() => setsecureConNewPass(!secureConNewPass)}
          />
        </View>
      </View>
      <View style={{marginTop: 190}}>
        <CustomedButton
          title={t('buttons.btn_save_change')}
          titleStyle={styles.textPress}
          onPress={() => console.log('Press')}
          style={styles.press}
        />
      </View>
    </View>
  );
};

export default ResetPasswordScreen;
