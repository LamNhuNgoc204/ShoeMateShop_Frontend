import {Text, View, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import appst from '../../constants/AppStyle';
import {useNavigation} from '@react-navigation/native';
import CustomTextInput from '../../components/Input';
import styles from './style';
import {spacing} from '../../constants';
import CustomModal from '../../components/Modal';
import {CustomedButton} from '../../components';
import {useTranslation} from 'react-i18next';

const ForgotPassWord = () => {
  const {t} = useTranslation();
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  const closeModal = () => {
    setModalVisible(false);
    navigation.navigate('OtpVerification');
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
        <Text style={styles.text1}>{t('titles.forgot_password')}</Text>
        <Text style={styles.text2}>{t('titles.sub_forgot_password')}</Text>
      </View>
      <View style={styles.view}>
        <CustomTextInput placeholder={t('form_input.placeholder_email')} />
        <CustomedButton
          title={t('home.reset_pass')}
          titleStyle={styles.textPress}
          onPress={() => setModalVisible(true)}
          style={styles.press}
        />
      </View>
      <CustomModal
        visible={modalVisible}
        closeModal={closeModal}
        image={require('../../assets/icons/email.png')}
        title={t('modals.title_mail')}
        content={t('modals.sub_title_mail')}
        textbutton={t('buttons.btn_ok')}
      />
    </View>
  );
};

export default ForgotPassWord;
