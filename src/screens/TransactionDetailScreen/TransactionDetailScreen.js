import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';

const TransactionDetailScreen = ({route}) => {
  const {transaction} = route.params;
  const navigation = useNavigation();
  const {t} = useTranslation();

  const formatVND = amount => {
    return Math.abs(amount)
      .toLocaleString('vi-VN', {style: 'currency', currency: 'VND'})
      .replace('₫', '')
      .trim();
  };

  const getStatusColor = () => {
    return transaction.type === 'transfer' ? '#1E88E5' : '#4CAF50';
  };

  const getTransactionTypeText = () => {
    if (transaction.type === 'deposit') return t('transactionDetail.deposit');
    if (transaction.type === 'payment') return t('transactionDetail.payment');
    return transaction.amount < 0
      ? t('transactionDetail.transfer')
      : t('transactionDetail.receive');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            style={styles.backIcon}
            source={require('../../assets/icons/ic_backwhite.png')}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t('transactionDetail.headerTitle')}</Text>
        <View style={{width: 30}} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.amountContainer}>
          <Text
            style={[
              styles.amountText,
              {color: transaction.amount < 0 ? '#F44336' : '#4CAF50'},
            ]}>
            {transaction.amount < 0 ? '-' : '+'}
            {formatVND(transaction.amount)} VNĐ
          </Text>
          <Text
            style={[
              styles.statusText,
              {
                color:
                  transaction.type === 'deposit'
                    ? '#1E88E5'
                    : transaction.type === 'payment'
                    ? '#1E88E5'
                    : getStatusColor(),
              },
            ]}>
            {transaction.type === 'deposit'
              ? t('transactionDetail.deposit').toUpperCase()
              : transaction.type === 'payment'
              ? t('transactionDetail.payment').toUpperCase()
              : getTransactionTypeText().toUpperCase()}
          </Text>
        </View>

        <View style={styles.detailsContainer}>
          <DetailItem label={t('transactionDetail.transactionType')} value={getTransactionTypeText()} />
          <DetailItem
            label={t('transactionDetail.transactionDate')}
            value={new Date(transaction.timestamp).toLocaleString('vi-VN')}
          />
          <DetailItem label={t('transactionDetail.transactionId')} value={transaction.transactionId} />
          <DetailItem
            label={
              transaction.type === 'deposit'
                ? t('transactionDetail.source')
                : transaction.type === 'payment'
                ? t('transactionDetail.note')
                : transaction.amount < 0
                ? t('transactionDetail.recipient')
                : t('transactionDetail.sender')
            }
            value={
              transaction.type === 'deposit'
                ? 'Nạp tiền từ Zalo Pay'
                : transaction.type === 'payment'
                ? transaction.recipientName || ''
                : transaction.amount < 0
                ? transaction.recipientEmail
                : transaction.senderName
            }
          />

          <DetailItem
            label={t('transactionDetail.note')}
            value={
              transaction.type === 'payment'
                ? transaction.paymentNote || t('transactionDetail.noMessage')
                : transaction.message || t('transactionDetail.noMessage')
            }
          />
        </View>
      </ScrollView>
    </View>
  );
};

const DetailItem = ({label, value}) => (
  <View style={styles.detailItem}>
    <Text style={styles.detailLabel}>{label}</Text>
    <Text style={styles.detailValue}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 15,
    paddingBottom: 15,
  },
  backIcon: {
    width: 24,
    height: 24,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'semibold',
    color: '#2B2B2B',
  },
  content: {
    flex: 1,
  },
  amountContainer: {
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#FFFFFF',
    marginBottom: 16,
  },
  amountText: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  statusText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
  },
  detailsContainer: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  detailLabel: {
    fontSize: 16,
    color: '#757575',
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#212121',
    maxWidth: '60%',
    textAlign: 'right',
  },
});

export default TransactionDetailScreen;
