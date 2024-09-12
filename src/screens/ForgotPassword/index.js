import {Text, View, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import appst from '../../constants/AppStyle';
import { useNavigation } from '@react-navigation/native';
import CustomTextInput from '../../components/Input';
import styles from './style';
import {spacing} from '../../constants';
import CustomModal from '../../components/Modal';
import { CustomedButton } from '../../components';

const ForgotPassWord = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  const closeModal = () => {
    setModalVisible(false);
    navigation.navigate('OtpVerification');
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
      onPress={() => navigation.goBack()}
      >
        <Image
          style={appst.icon40}
          source={require('../../assets/icons/ic_back.png')}
        />
      </TouchableOpacity>
      <View style={[appst.center]}>
        <Text style={styles.text1}>Forgot Password</Text>
        <Text style={styles.text2}>
          Enter your Email account to reset your password
        </Text>
      </View>
      <View style={{marginTop: spacing.xl}}>
        <CustomTextInput placeholder="xyz@gmail.com" />
      </View>
      <View>
      
        <CustomedButton
          title={'Reset Password'}
          titleStyle={styles.textPress}
          onPress={() => setModalVisible(true)}
          style={styles.press}
        />
      </View>
      <CustomModal
       visible={modalVisible} 
       closeModal={closeModal}
       image = {require('../../assets/icons/email.png')}
       title = 'Check your email'
       content='We have send password recovery code in your email'
       textbutton = 'OK'
       />
    </View>
  );
};

export default ForgotPassWord;
