import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import appst from '../../constants/AppStyle';
import {sizes, spacing} from '../../constants';
import {colors} from '../../constants/colors';
import {fonts} from '../../constants/fonts';
import CustomTextInput from '../../components/Input';
import {CustomedButton} from '../../components';
import styles from './style';
import { useNavigation } from '@react-navigation/native';

const ResetPasswordScreen = () => {
  const navigation = useNavigation();
  const [secureCurrentPass, setsecureCurrentPass] = useState(true);
  const [secureNewPass, setsecureNewPass] = useState(true);
  const [secureConNewPass, setsecureConNewPass] = useState(true);
  return (
    <View style={styles.container}>
      <View style={appst.rowCenter}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            style={appst.icon40}
            source={require('../../assets/icons/ic_back.png')}
          />
        </TouchableOpacity>
        <Text style={styles.title}>Profile</Text>
        <View style={{width: 40}} />
      </View>
      <View style={styles.viewBody}>
        <View style={styles.ViewInput}>
          <CustomTextInput
            label="Current password"
            placeholder="********"
            secureTextEntry={secureCurrentPass}
            isPassword={true}
            onTogglePassword={() => setsecureCurrentPass(!secureCurrentPass)}
          />
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
      </View>
      <View style={{marginTop: 190}}>
        <CustomedButton
          title={'Save Changes'}
          titleStyle={styles.textPress}
          onPress={() => console.log('Press')}
          style={styles.press}
        />
      </View>
    </View>
  );
};

export default ResetPasswordScreen;

