import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  StyleSheet,
  ToastAndroid,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import appst from '../../constants/AppStyle';
import CustomModal from './Modal';
import AxiosInstance from "../../helpers/AxiosInstance"
import Toast from 'react-native-toast-message';
const ShopeePaySetup = () => {
const navigation = useNavigation();
  const [isChecked, setIsChecked] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [pin, setPin] = useState(0);

  const {t} = useTranslation();
  const HanldeSetupWallet =() => {
    setModalVisible(true);
    // navigation.navigate('WalletScreen')
  }
  const closeModal = () => {
    setModalVisible(false);
 
  };

  const handlePinSubmit =  async(enteredPin) => {
    setPin(enteredPin);
    try {
      const response = await AxiosInstance().post('/wallet/activate', {
        pin: enteredPin
      });

      if (response.status) {
        Toast.show({text1: 'Ví đã được kích hoạt', type: 'success'});
        navigation.navigate('HomeWallet',{balance: response.balance});
      }
      else {
          Toast.show({type: 'error',text1: 'Vui lòng thử lại sau'});
      }
    } catch (error) {
      console.error(error);
    }

  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={appst.rowCenter}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            style={appst.icon40}
            source={require('../../assets/icons/ic_back.png')}
          />
        </TouchableOpacity>
        <Text style={styles.title}>{t('wallets.title')}</Text>
        <View style={{width: 40}} />
      </View>


      {/* Main Content */}
      <View style={styles.content}>
        <Image
          source={require('../../assets/images/walletlock.png')}
          style={styles.walletIcon}
          resizeMode="contain"
        />
        
        <Text style={styles.title}>Ví của chính bạn</Text>
        
        <Text style={styles.description}>
          Để đảm bảo chỉ bạn có quyền truy cập vào Ví ShoeMatePay từ ứng dụng ShoeMate, chúng tôi cần một vài thông tin cá nhân của bạn để thiết lập Ví ShoeMatePay.
        </Text>
        
        <TouchableOpacity 
          style={styles.learnMore}
          onPress={() => {/* Handle learn more */}}
        >
          <Text style={styles.learnMoreText}>Tìm hiểu</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Section */}
      <View style={styles.bottomSection}>
        <TouchableOpacity 
          style={styles.checkboxContainer}
          onPress={() => setIsChecked(!isChecked)}
        >
          <View style={styles.checkbox}>
            {isChecked && <Text style={styles.checkmark}>✓</Text>}
          </View>
          <Text style={styles.termsText}>
            Tôi đồng ý với các <Text style={styles.linkText}>Điều khoản & Điều kiện</Text>
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.setupButton, !isChecked && styles.setupButtonDisabled]}
          disabled={!isChecked}
          onPress={HanldeSetupWallet}
        >
          <Text style={styles.setupButtonText}>Thiết lập Ví ShoeMatePay </Text>
        </TouchableOpacity>
      </View>
      <CustomModal
       visible={modalVisible} 
       closeModal={closeModal}
       title = 'Enter PIN'
       onPinSubmit={handlePinSubmit}
       />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

 
  headerTitle: {
    fontSize: 18,
    fontWeight: '500',
    marginLeft: 8,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 60,
  },
  walletIcon: {
    width: 120,
    height: 120,
    marginBottom: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
    marginBottom: 16,
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 8,
  },
  learnMore: {
    padding: 8,
  },
  learnMoreText: {
    color: '#004CFF',
    fontSize: 14,
  },
  bottomSection: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#004CFF',
    borderRadius: 4,
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmark: {
    color: '#004CFF',
    fontSize: 14,
  },
  termsText: {
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
  linkText: {
    color: '#004CFF',
  },
  setupButton: {
    backgroundColor: '#004CFF',
    borderRadius: 4,
    padding: 12,
    alignItems: 'center',
  },
  setupButtonDisabled: {
    opacity: 0.6,
  },
  setupButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  title: {
    fontSize: 20,
    fontWeight: 'semibold',
    color: '#2B2B2B',
    fontFamily:  'Raleway-Medium',
  },
});

export default ShopeePaySetup;

