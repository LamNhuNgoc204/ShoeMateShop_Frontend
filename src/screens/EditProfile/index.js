import {Image, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import appst from '../../constants/AppStyle';
import CustomTextInput from '../../components/Input';
import {CustomedButton} from '../../components';
import styles from './style';
import {useTranslation} from 'react-i18next';

const EditProfile = () => {
  const {t} = useTranslation();
  const navigation = useNavigation();

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
      <View style={appst.center}>
        <Image
          style={styles.avatar}
          source={require('../../assets/images/avatar.png')}
        />
        <Text style={styles.text}>{t('buttons.btn_change_img_profile')}</Text>
      </View>
      <View style={styles.ViewInput}>
        <CustomTextInput
          label={t('form_input.name')}
          placeholder={t('form_input.placeholder_name')}
          value="Nguyen Van A"
        />
        <CustomTextInput
          label={t('form_input.email')}
          placeholder={t('form_input.placeholder_email')}
          value="xyyz@gmail"
        />
        <CustomTextInput
          label={t('form_input.phone')}
          placeholder={t('form_input.placeholder_phone')}
          value="0987654321"
          keyboardtype="numeric"
        />
      </View>
      <View style={styles.button}>
        <CustomedButton
          title={t('buttons.btn_save_now')}
          titleStyle={styles.textPress}
          onPress={() => navigation.navigate('HomeScreen')}
          style={styles.press}
        />
      </View>
    </View>
  );
};

export default EditProfile;
