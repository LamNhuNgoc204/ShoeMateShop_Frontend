import React, {useState} from 'react';
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
import {spacing} from '../../constants';
import {CustomedButton} from '../../components';
import styles from './style';
import CustomModal from './Modal';
import {useNavigation} from '@react-navigation/native';
import AxiosInstance from '../../helpers/AxiosInstance';
import Toast from 'react-native-toast-message';
import {useTranslation} from 'react-i18next';
const TransferWalletScreen = ({route}) => {
  const {balance} = route.params;
  const {t} = useTranslation();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [pin, setPin] = useState(0);
  const [loading, setLoading] = useState(false); // Thêm state loading
  const navigation = useNavigation();

  const formatVND = amount => {
    if (typeof amount !== 'number') {
      throw new Error('Input must be a number');
    }
    return amount
      .toLocaleString('vi-VN', {style: 'currency', currency: 'VND'})
      .replace('₫', '')
      .trim();
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handlePinSubmit = async enteredPin => {
    setPin(enteredPin);
    performTransfer(enteredPin);
    console.log('pin', pin);
  };

  const handleEmailBlur = async () => {
    console.log('Email:', email);
    if (email.trim() !== '') {
      try {
        const response = await AxiosInstance().get(
          `/wallet/user-name/${email}`,
        );
        if (response.status) {
          setName(response.name);
        } else {
          setName(t('transferwallet.mailwrong'));
        }
      } catch (error) {
        console.error('Error fetching user name:', error);
        setName(t('transferwallet.mailwrong'));
      }
    }
  };

  const validateInputs = () => {
    if (!email.trim()) {
      Toast.show({
        text1: t('transferwallet.errorEmptyEmail'),
        type: 'error',
        position: 'bottom',
      });
      return false;
    }
    if (!name || name === t('transferwallet.mailwrong')) {
      Toast.show({
        text1: t('transferwallet.errorEmail'),
        type: 'error',
        position: 'bottom',
      });
      return false;
    }
    if (!amount.trim()) {
      Toast.show({
        text1: t('transferwallet.errorEmptyAmount'),
        type: 'error',
        position: 'bottom',
      });
      return false;
    }
    if (isNaN(amount) || parseFloat(amount) <= 0) {
      Toast.show({
        text1: t('transferwallet.errorInvalidAmount'),
        type: 'error',
        position: 'bottom',
      });
      return false;
    }
    if (parseFloat(amount) > balance) {
      Toast.show({
        text1: t('transferwallet.errorInsufficientBalance'),
        type: 'error',
        position: 'bottom',
      });
      return false;
    }
    return true;
  };

  const performTransfer = async enteredPin => {
    setLoading(true);
    try {
      const transferData = {
        recipientEmail: email,
        amount: parseFloat(amount),
        message,
        pin: enteredPin,
      };
      console.log('Transfer data:', transferData);
      const response = await AxiosInstance().post(
        '/wallet/transfer',
        transferData,
      );
      setLoading(false);
      if (response.status && response.code == 'TransferSuccessful') {
        navigation.navigate('TransferSuccessScreen');
      } else if (response.code == 'Invalidamount') {
        Toast.show({
          text1: t('transferwallet.errorInsufficientBalance'),
          type: 'error',
          position: 'bottom',
        });
      } else if (response.code == 'walletnotcreated') {
        Toast.show({
          text1: t('transferwallet.errorRecipientNoWallet'),
          type: 'error',
          position: 'bottom',
        });
      } else if (response.code == 'InvalidPIN') {
        Toast.show({
          text1: t('transferwallet.errorPinIncorrect'),
          type: 'error',
          position: 'bottom',
        });
      } else if (response.code == 'Insufficientbalance') {
        Toast.show({
          text1: t('transferwallet.errorInsufficientBalance'),
          type: 'error',
          position: 'bottom',
        });
      } else if (response.code == 'Recipientnotfound') {
        Toast.show({
          text1: t('transferwallet.errorRecipientNotFound'),
          type: 'error',
          position: 'bottom',
        });
      } else if (response.code == 'Recipientwalletnotactive') {
        Toast.show({
          text1: t('transferwallet.errorRecipientNotActivated'),
          type: 'error',
          position: 'bottom',
        });
      } else {
        Toast.show({
          text1: t('transferwallet.errorTransferFailed'),
          type: 'error',
          position: 'bottom',
        });
      }
    } catch (error) {
      setLoading(false);
      Toast.show({
        text1: t('transferwallet.errorTransferError'),
        type: 'error',
        position: 'bottom',
      });
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
        <Text style={styles.title}>{t('transferwallet.transferMoney')}</Text>
        <View style={{width: 40}} />
      </View>
      <View style={styles.viewBody}>
        <View style={styles.boxwallet}>
          <Text style={styles.textwallet}>
            {t('transferwallet.walletBalance')}
          </Text>
          <Text style={styles.textmoney}>{formatVND(balance)} VNĐ</Text>
        </View>
        <View style={{marginTop: spacing.lg}}>
          <Text style={styles.lable}>{t('transferwallet.recipientEmail')}</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder={t('transferwallet.enterEmail')}
            style={styles.input}
            onBlur={handleEmailBlur}
          />
        </View>

        <View style={{marginTop: spacing.lg}}>
          <Text style={styles.lable}>{t('transferwallet.recipientName')}</Text>
          <TextInput
            editable={false}
            value={name}
            placeholder={t('transferwallet.recipientName')}
            style={styles.input}
          />
        </View>
        <View style={{marginTop: spacing.lg}}>
          <Text style={styles.lable}>Amount</Text>
          <TextInput
            value={amount}
            onChangeText={setAmount}
            placeholder={t('transferwallet.enterAmount')}
            style={styles.input}
            keyboardType="numeric"
          />
        </View>
        <View style={{marginTop: spacing.lg}}>
          <Text style={styles.lable}>{t('transferwallet.message')}</Text>
          <TextInput
            value={message}
            onChangeText={setMessage}
            style={styles.inputarea}
            placeholder={t('transferwallet.message')}
            multiline
            maxLength={50}
            numberOfLines={4}
            editable
          />
        </View>

        <View style={styles.viewButton}>
          <CustomedButton
            title={t('transferwallet.transferMoney')}
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
