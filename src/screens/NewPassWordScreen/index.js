import {Text, View} from 'react-native';
import React, {useState} from 'react';
import appst from '../../constants/AppStyle';

import CustomTextInput from '../../components/Input';
import styles from './style';
import {CustomedButton} from '../../components';
import Header from '../../components/Header';
import {useTranslation} from 'react-i18next';

const NewPassWordScreen = ({navigation}) => {
  const {t} = useTranslation();
  const [secureNewPass, setsecureNewPass] = useState(true);
  const [secureConNewPass, setsecureConNewPass] = useState(true);

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

      <View style={{marginTop: 300}}>
        <CustomedButton
          title={t('buttons.btn_confirm')}
          titleStyle={styles.textPress}
          onPress={() => console.log('Press')}
          style={styles.press}
        />
      </View>
    </View>
  );
};

export default NewPassWordScreen;
