import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import appst from '../../constants/AppStyle';

import CustomTextInput from '../../components/Input';
import styles from './style';

const LoginScreen = () => {
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  return (
    <View style={styles.container}>
      <TouchableOpacity>
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
        <Text style={styles.text4}>Recovery Password</Text>
      </View>
      <View>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.text5}>Sign In</Text>
        </TouchableOpacity>
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
      <View style={[appst.center, { marginTop: 150 }]}>
        <Text style={styles.text7}>New User? <Text style={styles.text8}>Create Account</Text></Text>
      </View>
    </View>
  );
};

export default LoginScreen;
