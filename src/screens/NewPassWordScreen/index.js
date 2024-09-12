import {Text, View} from 'react-native';
import React, {useState} from 'react';
import appst from '../../constants/AppStyle';

import CustomTextInput from '../../components/Input';
import styles from './style';
import {CustomedButton} from '../../components';
import Header from '../../components/Header';

const NewPassWordScreen = ({navigation}) => {
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
        <Text style={styles.text1}>New Password</Text>
        <Text style={styles.text2}>Please enter a new password</Text>
      </View>
      <View style={styles.ViewInput}>
        <CustomTextInput
          label="New password"
          placeholder="********"
          secureTextEntry={secureNewPass}
          isPassword={true}
          onTogglePassword={() => setsecureNewPass(!secureNewPass)}
        />
      </View>
      <View style={styles.ViewInput}>
        <CustomTextInput
          label="Confirm password"
          placeholder="********"
          secureTextEntry={secureConNewPass}
          isPassword={true}
          onTogglePassword={() => setsecureConNewPass(!secureConNewPass)}
        />
      </View>

      <View style={{marginTop: 300}}>
        <CustomedButton
          title={'Confirm'}
          titleStyle={styles.textPress}
          onPress={() => console.log('Press')}
          style={styles.press}
        />
      </View>
    </View>
  );
};

export default NewPassWordScreen;
