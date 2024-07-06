import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import appst from '../../constants/AppStyle';
import { useNavigation } from '@react-navigation/native';
import CustomTextInput from '../../components/Input';
import styles from './style';

const SignUpScreen = () => {
  const navigation = useNavigation();
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const handleSignUp = () => {
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
        <Text style={styles.text1}>Register Account</Text>
        <Text style={styles.text2}>
          Fill your details or continue with social media
        </Text>
      </View>
      <CustomTextInput
        label="Your Name"
        placeholder="Nguyen Van A"
      />
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
     
      <View>
        <TouchableOpacity style={styles.button}
        onPress={handleSignUp}
        >
          <Text style={styles.text5}>Sign Up</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity style={styles.buttonGoogle}
        onPress={handleGoogle}
        >
          <Image
            style={styles.iconGoogle}
            source={require('../../assets/icons/google.png')}
          />
          <Text style={styles.text6}
          >Sign Up With Google</Text>
        </TouchableOpacity>
      </View>
      <View style={[appst.center, { marginTop: 50 }]}>
        <Text style={styles.text7}>Already Have Account?  <Text style={styles.text8}
        onPress={() => navigation.navigate('LoginScreen')}>Log In</Text></Text>
      </View>
    </View>
  );
};

export default SignUpScreen;
