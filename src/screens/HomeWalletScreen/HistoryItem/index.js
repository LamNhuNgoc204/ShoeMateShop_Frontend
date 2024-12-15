import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { spacing } from '../../../constants';
import appst from '../../../constants/AppStyle';
import styles from './style';
import {useNavigation} from '@react-navigation/native';
// Hàm format tiền (VNĐ)
const formatVND = (amount) => {
  if (typeof amount !== 'number') {
    throw new Error('Input must be a number');
  }
  return amount
    .toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
    .replace('₫', '')
    .trim();
};

// Hàm format ngày tháng
const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

// Hàm xác định loại giao dịch
const getTransactionType = (type, amount) => {
  
  switch (type) {
    case 'deposit':
      return 'Nạp tiền';
    case 'payment':
      return 'Thanh toán';
    case 'transfer':
      return amount > 0 ? 'Nhận tiền' : 'Chuyển tiền';
    default:
      return 'Không xác định';
  }
};

const HistoryItem = ({ transaction }) => {
  const navigation = useNavigation();
  const isPositive = transaction.amount > 0;
  const formattedAmount = isPositive
    ? `+ ${formatVND(transaction.amount)}`
    : `- ${formatVND(Math.abs(transaction.amount))}`;
  const transactionType = getTransactionType(transaction.type, transaction.amount);

  return (
    <TouchableOpacity style={{ marginBottom: spacing.sm }}
    onPress={() => navigation.navigate('TransactionDetailScreen', { transaction })}
    >
      <View style={appst.rowCenter}>
        <View>
          <Text style={styles.titlehistory}>{transactionType}</Text>
          <Text style={styles.datehistory}>{formatDate(transaction.timestamp)}</Text>
        </View>
        <Text
          style={
            isPositive
              ? styles.priceplushistory
              : styles.priceminushistory
          }
        >
          {formattedAmount} VNĐ
        </Text>
      </View>
      <Image
        style={{ width: '100%' }}
        source={require('../../../assets/icons/linesetting.png')}
      />
    </TouchableOpacity>
  );
};

export default HistoryItem;
