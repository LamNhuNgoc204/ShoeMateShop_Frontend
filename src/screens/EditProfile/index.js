import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import appst from '../../constants/AppStyle';
import CustomTextInput from '../../components/Input';
import {CustomedButton} from '../../components';
import styles from './style';
const EditProfile = () => {
  const navigation = useNavigation();
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
      <View style={appst.center}>
        <Image
          style={styles.avatar}
          source={require('../../assets/images/avatar.png')}
        />
        <Text style={styles.text}>Change Profile Picture</Text>
      </View>
      <View style={styles.ViewInput}>
        <CustomTextInput
          label="Name"
          placeholder="Your Name"
          value="Nguyen Van A"
        />
        <CustomTextInput
          label="Email"
          placeholder="Your Email"
          value="xyyz@gmail"
        />
        <CustomTextInput
          label="Mobile Number"
          placeholder="Your Mobile Number"
          value="0987654321"
          keyboardtype="numeric"
        />
      </View>
      <View style={styles.button}>
        <CustomedButton
          title={'Save Now'}
          titleStyle={styles.textPress}
          onPress={() => navigation.navigate('HomeScreen')}
          style={styles.press}
        />
      </View>
    </View>
  );
};

export default EditProfile;
