import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';

import appst from '../../constants/AppStyle';
import {CustomedButton} from '../../components';
import styles from './style';

const DepositWalletScreen = () => {
  const [value, setValue] = useState('');

  const handleValuePress = amount => {
    setValue(amount.toString());
  };

  const clearValue = () => {
    setValue('');
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
        <Text style={styles.title}>Nạp tiền</Text>
        <View style={{width: 40}} />
      </View>
      <View style={styles.viewBody}>
        <View style={styles.viewInput}>
          <Text style={styles.label}>Nhập số tiền(vnđ)</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.dollarSign}>₫</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Số tiền"
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
          <Text style={styles.currentBalance}>
            Số dư hiên tại: 100.000 VND
          </Text>
          <View style={styles.valueButtonsContainer}>
            {['100.000', '200.000', '500.000'].map(amount => (
              <TouchableOpacity
                key={amount}
                style={[
                  styles.valueButton,
                  value === amount && styles.selectedValueButton,
                ]}
                onPress={() => handleValuePress(amount)}>
                <Text style={styles.valueButtonText}> {amount}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <Image
            style={styles.line}
            source={require('../../assets/icons/linesetting.png')}
          />

          <View style={styles.depositContainer}>
            <TouchableOpacity style={styles.depositButton}>
              <Image source={require('../../assets/images/vcb.png')} />
              <Text style={styles.depositButtonText}>Chuyển khoản từ ngân hàng</Text>
            </TouchableOpacity>
            <Image
              style={styles.rightArrow}
              source={require('../../assets/icons/right-arrow.png')}
            />
          </View>
          <Image
            style={styles.line}
            source={require('../../assets/icons/linesetting.png')}
          />
          <View style={styles.depositContainer}>
            <TouchableOpacity style={styles.depositButton}>
              <Image source={require('../../assets/images/vnpay.png')} style={styles.depositIcon} />
              <Text style={styles.depositButtonText}>VN Pay</Text>
            </TouchableOpacity>
            <Image
              style={styles.rightArrow}
              source={require('../../assets/icons/right-arrow.png')}
            />
          </View>
        </View>
        <View style={styles.summaryContainer}>
          <View style={appst.rowCenter}>
            <Text>Nạp tiền</Text>
            <Text>200.000 VNĐ</Text>
          </View>
          <View style={appst.rowCenter}>
            <Text style={styles.totalcheckout}>Tổng thanh toán</Text>
            <Text style={styles.totalcheckout}>200.000 VNĐ</Text>
          </View>
        </View>
        <View style={styles.bottomContainer}>
          <Text style={styles.text}>
          Bằng cách nhấp vào “Nạp tiền ngay”, bạn đồng ý với{' '}
            <Text style={styles.TermOfUse}>Điều khoản</Text> và {' '}
            <Text style={styles.TermOfUse}>Chính sách bảo mật</Text> của ShoeMate
          </Text>
          <CustomedButton
            title={'Nạp tiền ngay'}
            titleStyle={styles.textPress}
            onPress={() => console.log('To Up Now')}
            style={styles.press}
          />
        </View>
      </View>
    </View>
  );
};

export default DepositWalletScreen;
