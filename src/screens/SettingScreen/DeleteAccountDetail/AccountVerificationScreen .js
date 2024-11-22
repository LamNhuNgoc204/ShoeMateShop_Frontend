import React, {useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet, TouchableOpacity} from 'react-native';
import Header from '../../../components/Header';
import {colors} from '../../../constants/colors';

const AccountVerificationScreen = ({navigation}) => {
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');

  const handleVerification = () => {
    if (password || otp) {
      navigation.navigate('ConsequencesScreen');
    } else {
      alert('Vui lòng nhập mật khẩu hoặc mã OTP');
    }
  };

  return (
    <>
      <Header
        iconLeft={require('../../../assets/icons/back.png')}
        leftOnPress={() => navigation.goBack()}
        name={'Xác thực bảo mật'}
      />
      <View style={styles.container}>
        {/* <Text style={styles.title}>Xác thực bảo mật</Text> */}
        <Text style={styles.description}>
          Vui lòng nhập mật khẩu hoặc mã OTP để xác nhận.
        </Text>

        <TextInput
          placeholder="Nhập mật khẩu"
          secureTextEntry
          style={styles.input}
          onChangeText={setPassword}
          value={password}
        />

        <TextInput
          placeholder="Nhập mã OTP"
          style={styles.input}
          keyboardType="numeric"
          onChangeText={setOtp}
          value={otp}
        />

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={handleVerification}>
          <Text style={styles.deleteButtonText}>Xác nhận</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 20},
  title: {fontSize: 22, fontWeight: 'bold', marginBottom: 20},
  description: {fontSize: 16, marginBottom: 20},
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
  },
  deleteButton: {
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AccountVerificationScreen;
