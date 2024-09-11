import React, {useState} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';

import styles from './style';

import appst from '../../constants/AppStyle';
import {useNavigation} from '@react-navigation/native';
import CustomTextInput from '../../components/Input';
import {CustomedButton} from '../../components';
import Header from '../../components/Header';
import { handleNavigate } from '../../utils/functions/navigationHelper';

const SignUpScreen = () => {
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
        <Text style={styles.text1}>Register Account</Text>
        <Text style={styles.text2}>
          Fill your details or continue with social media
        </Text>
      </View>
      <CustomTextInput label="Your Name" placeholder="Nguyen Van A" />
      <CustomTextInput label="Email Address" placeholder="xyz@gmail.com" />
      <CustomTextInput
        label="Password"
        placeholder="********"
        secureTextEntry={secureTextEntry}
        isPassword={true}
        onTogglePassword={() => setSecureTextEntry(!secureTextEntry)}
      />

      <View>
        <CustomedButton
          title={'Sign Up'}
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
          <Text style={styles.text6}>Sign Up With Google</Text>
        </TouchableOpacity>
      </View>
      <View style={[appst.center, {marginTop: 50}]}>
        <Text style={styles.text7}>
          Already Have Account?{' '}
          <Text
            style={styles.text8}
            onPress={() => handleNavigate(navigation, 'LoginScreen')}>
            Log In
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default SignUpScreen;
