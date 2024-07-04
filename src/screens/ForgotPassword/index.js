import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import appst from '../../constants/AppStyle';

import CustomTextInput from '../../components/Input';
import styles from './style';
import { spacing } from '../../constants';

const ForgotPassWord = () => {
  

  return (
    <View style={styles.container}>
     <TouchableOpacity>
     <Image
        style={appst.icon40}
        source={require('../../assets/icons/ic_back.png')}
      />
     </TouchableOpacity>
      <View style={[appst.center,]}>
        <Text style={styles.text1}>Forgot Password</Text>
        <Text style={styles.text2}>
        Enter your Email account to reset
        your password
        </Text>
      </View>
      <View style={{marginTop: spacing.xl}}>
      <CustomTextInput
       
        placeholder="xyz@gmail.com"
      />
      </View>
      
    
      <View>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.text5}>Reset Password</Text>
        </TouchableOpacity>
      </View>
     
      
    </View>
  );
};

export default ForgotPassWord;
