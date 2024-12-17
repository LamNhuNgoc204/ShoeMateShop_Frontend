import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
  ToastAndroid,
} from 'react-native';
import React, { useState } from 'react';
import {useNavigation} from '@react-navigation/native';
import appst from '../../constants/AppStyle';
import { CustomedButton } from '../../components';
import styles from './style';
import WebView from 'react-native-webview';
import AxiosInstance from '../../helpers/AxiosInstance';
import Toast from 'react-native-toast-message';
const amoutdeposit = [
  { id: 1, amount: '100.000', value: 100000 },
  { id: 2, amount: '200.000', value: 200000 },
  { id: 3, amount: '500.000', value: 500000 },
];

const DepositWalletScreen = ({ route }) => {
  const { balance } = route.params || 0;
  const navigation = useNavigation();
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [value, setValue] = useState('');
  const [orderUrl, setOrderUrl] = useState(null);
  const [curentURL, setCurrentURL] = useState('');
  const formatVND = (amount) => {
    amount = parseFloat(amount);
    if (typeof amount !== 'number') {
      throw new Error('Input must be a number');
    }
    return amount
      .toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
      .replace('₫', '')
      .trim();
  };
  const handleValuePress = (amount) => {
    setValue(amount.toString());
  };

  const clearValue = () => {
    setValue('');
  };

  const handleDeposit = async() => {
    if (!value) {
      Toast.show({text2 : 'Tiền không được bỏ trống!', type: 'error'});
      return;
    }

    if (!selectedMethod) {
      Toast.show({text1: 'Vui lòng chọn ít nhất 1 phương thức thanh toán!', type: 'error'});
      return;
    }

    if (selectedMethod === 'bank') {
      Toast.show({
       text1:  'Ngân hàng đang bảo trì, vui lòng chọn phương thức thanh toán khác!',
       type: 'error'
    });
      return;
    }
    try {
      const response = await AxiosInstance().post('/wallet/deposit', {
        amount: parseFloat(value),
      });

      if (response.status) {
        const {order_url} = response.zaloPayData;
        setOrderUrl(order_url);
      
      } else {
       Toast.show({text2 : response.message || 'Không thể tạo giao dịch.', type: 'error'});
      }
    } catch (error) {
      Toast.show({text1: 'Có lỗi xảy ra', type: ''});
    }

  };

  const getUrlParams = url => {
    const params = {};
    const queryString = url.split('?')[1];
    if (queryString) {
      const queryParts = queryString.split('&');
      queryParts.forEach(part => {
        const [key, value] = part.split('=');
        params[decodeURIComponent(key)] = decodeURIComponent(value);
      });
    }
    return params;
  };
  const handleTransactionResult = async url => {
    setCurrentURL(url);
    try {
      const params = getUrlParams(url);
      const status = params.returncode;
      const apptransid = params.zptransid;
      if (status == 1) {
        const response = await AxiosInstance().post('/wallet/update-balance', {
          amount: parseFloat(value),
          transactionId: apptransid,
        });
        if (response.status) {
          Toast.show({text1: 'Nạp tiền thành công!', type: 'success'});
          navigation.navigate('HomeWallet');
          setOrderUrl(null); 

        } else {
          Toast.show({text2 :'Nạp tiền thất bại!', type: 'error'});
        }
      } else {
        Toast.show({text2 : 'Nạp tiền thất bại!', type: 'error'});
      }
    } catch (error) {
      Toast.show({text1: 'Nạp tiền thất bại!', type: 'error'});
    }
  };

  return (
    <View style={styles.container}>
      <View style={appst.rowCenter}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image style={appst.icon40} source={require('../../assets/icons/ic_backwhite.png')} />
        </TouchableOpacity>
        <Text style={styles.title}>Nạp tiền</Text>
        <View style={{ width: 40 }} />
      </View>
      
      {orderUrl ?(
        <WebView
        source={{uri: orderUrl}}
        onNavigationStateChange={navState => {
          const {url} = navState;
          if (url.includes('/result') && curentURL !== url) {
           handleTransactionResult(url);
          } else {
          }
        }}
        onError={err => Toast.show({text2 : 'Lỗi khi tải trang', type: 'error'})}
      />
      ):(
      
      <View style={styles.viewBody}>
      <View style={styles.viewInput}>
        <Text style={styles.label}>Nhập số tiền</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.dollarSign}>₫</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Nhập số lượng"
            keyboardType="number-pad"
            value={value}
            onChangeText={setValue}
          />
          <TouchableOpacity onPress={clearValue}>
            <Image
              style={styles.closeIcon}
              source={require('../../assets/icons/closeblack.png')}
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.currentBalance}>Số dư ví hiện tại: {formatVND(balance)} ₫</Text>

        {/* Giá trị đề xuất */}
        <View style={styles.valueButtonsContainer}>
          {amoutdeposit.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.valueButton,
                value === item.value && styles.selectedValueButton,
              ]}
              onPress={() => handleValuePress(item.value)}>
              <Text style={styles.valueButtonText}>{item.amount} ₫</Text>
            </TouchableOpacity>
          ))}
        </View>
        <Image style={styles.line} source={require('../../assets/icons/linesetting.png')} />

        {/* Phương thức thanh toán */}
        <View style={styles.depositContainer}>
          <TouchableOpacity
            style={styles.depositButton}
            onPress={() => setSelectedMethod('bank')}>
            <Image source={require('../../assets/images/vcb.png')} />
            <Text style={styles.depositButtonText}>Ngân hàng</Text>
          </TouchableOpacity>
          <View style={styles.checkboxContainer}>
            <TouchableOpacity
              style={[
                styles.checkbox,
                selectedMethod === 'bank' && styles.selectedCheckbox,
              ]}
              onPress={() => setSelectedMethod('bank')}>
              {selectedMethod === 'bank' && (
                <Text style={styles.checkboxTick}>✔</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>

        <Image style={styles.line} source={require('../../assets/icons/linesetting.png')} />

        <View style={styles.depositContainer}>
          <TouchableOpacity
            style={styles.depositButton}
            onPress={() => setSelectedMethod('zalopay')}>
            <Image
              source={require('../../assets/images/ZaloPay_logo.png')}
              style={{ width: 40, height: 40 }}
            />
            <Text style={styles.depositButtonText}>Zalo Pay</Text>
          </TouchableOpacity>
          <View style={styles.checkboxContainer}>
            <TouchableOpacity
              style={[
                styles.checkbox,
                selectedMethod === 'zalopay' && styles.selectedCheckbox,
              ]}
              onPress={() => setSelectedMethod('zalopay')}>
              {selectedMethod === 'zalopay' && (
                <Text style={styles.checkboxTick}>✔</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Tổng thanh toán */}
      <View style={styles.summaryContainer}>
        <View style={appst.rowCenter}>
          <Text>Nạp tiền </Text>
          <Text>{value ? formatVND(value) : '0'} ₫</Text>
        </View>
        <View style={appst.rowCenter}>
          <Text style={styles.totalcheckout}>Tổng thanh toán</Text>
          <Text style={styles.totalcheckout}>
{value ? formatVND(value) : '0'} ₫
</Text>
        </View>
      </View>

      {/* Nút nạp tiền */}
      <View style={styles.bottomContainer}>
        <Text style={styles.text}>
          Nhấn “Nạp tiền ngay”, bạn đã đồng ý tuân theo{' '}
          <Text style={styles.TermOfUse}>Điều khoản sử dụng</Text> và{' '}
          <Text style={styles.TermOfUse}>Chính sách bảo mật</Text> của Shoes Mate.
        </Text>
        <CustomedButton
          title={'Nạp tiền ngay'}
          titleStyle={styles.textPress}
          onPress={handleDeposit}
          style={styles.press}
        />
      </View>
    </View>
      )}
    </View>
  );
};

export default DepositWalletScreen;
