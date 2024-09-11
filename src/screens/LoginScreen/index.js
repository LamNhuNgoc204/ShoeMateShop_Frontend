import {Text, View, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import appst from '../../constants/AppStyle';
import {useNavigation} from '@react-navigation/native';
import CustomTextInput from '../../components/Input';
import styles from './style';
import {CustomedButton} from '../../components';
import Header from '../../components/Header';
import {handleNavigate} from '../../utils/functions/navigationHelper';

const LoginScreen = () => {
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
        <Text style={styles.text1}>Hello Again!</Text>
        <Text style={styles.text2}>
          Fill your details or continue with social media
        </Text>
      </View>
      <CustomTextInput label="Email Address" placeholder="xyz@gmail.com" />
      <CustomTextInput
        label="Password"
        placeholder="********"
        secureTextEntry={secureTextEntry}
        isPassword={true}
        onTogglePassword={() => setSecureTextEntry(!secureTextEntry)}
      />
      <View style={appst.rowEnd}>
        <Text
          style={styles.text4}
          onPress={() => handleNavigate(navigation, 'ForgotPassWord')}>
          Recovery Password
        </Text>
      </View>
      <View>
        <CustomedButton
          title={'Sign In'}
          titleStyle={styles.textPress}
          onPress={() => handleNavigate(navigation, 'BottomNav')}
          style={styles.press}
        />
      </View>
      <View>
        <TouchableOpacity style={styles.buttonGoogle}>
          <Image
            style={styles.iconGoogle}
            source={require('../../assets/icons/google.png')}
          />
          <Text style={styles.text6}>Sign In With Google</Text>
        </TouchableOpacity>
      </View>
      <View style={[appst.center, {marginTop: 150}]}>
        <Text style={styles.text7}>
          New User?
          <Text
            style={styles.text8}
            onPress={() => handleNavigate(navigation, 'SignUpScreen')}>
            Create Account
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default LoginScreen;
