import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import appst from '../../constants/AppStyle';
import { useNavigation } from '@react-navigation/native';
import CustomTextInput from '../../components/Input';
import styles from './style';
import { CustomedButton } from '../../components';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const handleSignIn = () => {
    navigation.navigate('HomeScreen');
  };

  const handleGoogle = () => {
    navigation.navigate('HomeScreen');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}>
     <Image
        style={appst.icon40}
        source={require('../../assets/icons/ic_back.png')}
      />
     </TouchableOpacity>
      <View style={appst.center}>
        <Text style={styles.text1}>Hello Again!</Text>
        <Text style={styles.text2}>
          Fill your details or continue with social media
        </Text>
      </View>
      <CustomTextInput
        label="Email Address"
        placeholder="xyz@gmail.com"
      />
      <CustomTextInput
        label="Password"
        placeholder="********"
        secureTextEntry={secureTextEntry}
        isPassword={true}
        onTogglePassword={() => setSecureTextEntry(!secureTextEntry)}
      />
      <View style={appst.rowEnd}>
        <Text style={styles.text4}
        onPress={()=> navigation.navigate('ForgotPassWord')}
        >Recovery Password</Text>
      </View>
      <View>
       
         <CustomedButton
          title={'Sign In'}
          titleStyle={styles.textPress}
          onPress={handleSignIn}
          style={styles.press}
        />
      </View>
      <View>
        <TouchableOpacity style={styles.buttonGoogle}
         onPress={handleGoogle}>
          <Image
            style={styles.iconGoogle}
            source={require('../../assets/icons/google.png')}
          />
          <Text style={styles.text6}
         
          >Sign In With Google</Text>
        </TouchableOpacity>
       
      </View>
      <View style={[appst.center, { marginTop: 150 }]}>
        <Text style={styles.text7}>New User? <Text style={styles.text8}
        onPress={()=> navigation.navigate('SignUpScreen')}
        >Create Account</Text></Text>
      </View>
    </View>
  );
};

export default LoginScreen;
