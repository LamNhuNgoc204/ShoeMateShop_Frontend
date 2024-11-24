import React, {useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet} from 'react-native';
import {RadioButton} from 'react-native-paper';
import Header from '../../../components/Header';
import {CustomedButton} from '../../../components';
import {colors} from '../../../constants/colors';

const AccountDeletionReasonScreen = ({navigation}) => {
  const [reason, setReason] = useState('');
  const [customReason, setCustomReason] = useState('');

  const handleNext = () => {
    navigation.navigate('AccountVerificationScreen');
  };

  return (
    <View style={styles.container}>
      <Header
        iconLeft={require('../../../assets/icons/back.png')}
        leftOnPress={() => navigation.goBack()}
        name={'Lý do xóa tài khoản'}
      />
      {/* <Text style={styles.title}>Lý do xóa tài khoản</Text> */}

      <RadioButton.Group onValueChange={setReason} value={reason}>
        <RadioButton.Item
          label="Không còn sử dụng ứng dụng"
          value="not_using"
        />
        <RadioButton.Item label="Tài khoản bị lỗi" value="error" />
        <RadioButton.Item label="Khác (nhập lý do bên dưới)" value="other" />
      </RadioButton.Group>

      {reason === 'other' && (
        <TextInput
          placeholder="Nhập lý do..."
          style={styles.input}
          onChangeText={setCustomReason}
          value={customReason}
        />
      )}

      <CustomedButton
        title="Tiếp tục"
        onPress={handleNext}
        style={styles.buttons}
        titleStyle={{color: 'white'}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  buttons: {
    backgroundColor: colors.primary,
    marginHorizontal: 20,
    borderRadius: 10,
    width: '90%',
    marginTop: 10,
  },
  container: {flex: 1},
  title: {fontSize: 22, fontWeight: 'bold', marginBottom: 20},
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginTop: 10,
    paddingLeft: 10,
  },
});

export default AccountDeletionReasonScreen;
