import React, { useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import appst from '../../constants/AppStyle';
import { spacing } from '../../constants';
import { CustomedButton } from '../../components';
import styles from './style';
import CustomModal from './Modal';
import { useNavigation } from '@react-navigation/native';
import AxiosInstance from '../../helpers/AxiosInstance';

const TransferWalletScreen = ({ route }) => {
  const { balance } = route.params;
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [pin, setPin] = useState(0);
  const [loading, setLoading] = useState(false); // Thêm state loading
  const navigation = useNavigation();

  const formatVND = (amount) => {
    if (typeof amount !== 'number') {
      throw new Error('Input must be a number');
    }
    return amount
      .toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
      .replace('₫', '')
      .trim();
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handlePinSubmit = async (enteredPin) => {
    setPin(enteredPin);
    performTransfer(enteredPin);
    console.log('pin', pin);
  };

  const handleEmailBlur = async () => {
    console.log('Email:', email);
    if (email.trim() !== '') {
      try {
        const response = await AxiosInstance().get(`/wallet/user-name/${email}`);
        if (response.status) {
          setName(response.name);
        } else {
          setName('Sai địa chỉ email');
        }
      } catch (error) {
        console.error('Error fetching user name:', error);
        setName('Sai địa chỉ email');
      }
    }
  };

  const validateInputs = () => {
    if (!email.trim()) {
      ToastAndroid.show('Email không được để trống!', ToastAndroid.SHORT);
      return false;
    }
    if (!name || name === 'Sai địa chỉ email') {
      ToastAndroid.show('Email không hợp lệ hoặc chưa được xác thực!', ToastAndroid.SHORT);
      return false;
    }
    if (!amount.trim()) {
      ToastAndroid.show('Số tiền không được để trống!', ToastAndroid.SHORT);
      return false;
    }
    if (isNaN(amount) || parseFloat(amount) <= 0) {
      ToastAndroid.show('Số tiền phải là một số hợp lệ!', ToastAndroid.SHORT);
      return false;
    }
    if (parseFloat(amount) > balance) {
      ToastAndroid.show('Số tiền không được lớn hơn số dư!', ToastAndroid.SHORT);
      return false;
    }
    return true;
  };

  const performTransfer = async (enteredPin) => {
    setLoading(true); 
    try {
      const transferData = {
        recipientEmail: email,
        amount: parseFloat(amount),
        message,
        pin: enteredPin,
      };

      console.log('Transfer data:', transferData);

      const response = await AxiosInstance().post('/wallet/transfer', transferData);

      setLoading(false); 
      if (response.status) {
        navigation.navigate('TransferSuccessScreen');
      } else {
        ToastAndroid.show('Chuyển tiền thất bại!', ToastAndroid.SHORT);
      }
    } catch (error) {
      setLoading(false); 
      console.error('Error transferring money:', error);
      ToastAndroid.show('Có lỗi xảy ra khi chuyển tiền!', ToastAndroid.SHORT);
    }
  };

  const handleTransfer = () => {
    if (validateInputs()) {
      setModalVisible(true);
    }
  };

  return (
    <View style={styles.container}>
      <View style={appst.rowCenter}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            style={appst.icon40}
            source={require('../../assets/icons/ic_backwhite.png')}
          />
        </TouchableOpacity>
        <Text style={styles.title}>Chuyển tiền</Text>
        <View style={{ width: 40 }} />
      </View>
      <View style={styles.viewBody}>
        <View style={styles.boxwallet}>
          <Text style={styles.textwallet}>Số dư</Text>
          <Text style={styles.textmoney}>{formatVND(balance)} VNĐ</Text>
        </View>
        <View style={{ marginTop: spacing.lg }}>
          <Text style={styles.lable}>Email người nhận</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Nhập email"
            style={styles.input}
            onBlur={handleEmailBlur}
          />
        </View>

        <View style={{ marginTop: spacing.lg }}>
          <Text style={styles.lable}>Tên người nhận</Text>
          <TextInput
            editable={false}
            value={name}
            placeholder="Tên người nhận"
            style={styles.input}
          />
        </View>
        <View style={{ marginTop: spacing.lg }}>
          <Text style={styles.lable}>Amount</Text>
          <TextInput
            value={amount}
            onChangeText={setAmount}
            placeholder="Nhập số tiền cần chuyển"
            style={styles.input}
            keyboardType="numeric"
          />
        </View>
        <View style={{ marginTop: spacing.lg }}>
          <Text style={styles.lable}>Lời nhắn</Text>
          <TextInput
            value={message}
            onChangeText={setMessage}
            style={styles.inputarea}
            placeholder="Nhập lời nhắn"
            multiline
            maxLength={50}
            numberOfLines={4}
            editable
          />
        </View>

        <View style={styles.viewButton}>
          <CustomedButton
            title={'Chuyển tiền'}
            titleStyle={styles.textPress}
            onPress={handleTransfer}
            style={styles.press}
          />
        </View>
      </View>

      {/* Modal PIN */}
      <CustomModal
        visible={modalVisible}
        closeModal={closeModal}
        title="Enter PIN"
        onPinSubmit={handlePinSubmit}
      />

     
      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}
    </View>
  );
};



export default TransferWalletScreen;
