import {Image, Text, TouchableOpacity, View, FlatList, RefreshControl} from 'react-native';
import React, {useEffect, useState, useCallback} from 'react';
import {spacing} from '../../constants';
import appst from '../../constants/AppStyle';
import HistoryItem from './HistoryItem';
import styles from './style';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import AxiosInstance from '../../helpers/AxiosInstance';

const HomeWallet = () => {
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [transactionType, setTransactionType] = useState('');
  const {t} = useTranslation();
  const navigation = useNavigation();

  const fetchData = useCallback(async () => {
    try {
      const responseBalance = await AxiosInstance().get('/wallet/balance');
      if (responseBalance.status) {
        setBalance(responseBalance.balance);
      }

      // Gửi tham số loại giao dịch vào API request
      const responseTransactions = await AxiosInstance().get('/wallet/transactions', {
        params: { type: transactionType },
      });

      if (responseTransactions.status) {
        setTransactions(responseTransactions.transactions);
      }
    } catch (error) {
      console.log(error);
    }
  }, [transactionType]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true); // Bắt đầu trạng thái làm mới
    await fetchData(); // Gọi lại API
    setRefreshing(false); // Kết thúc trạng thái làm mới
  }, [fetchData]);

  const formatVND = amount => {
    return amount.toLocaleString('vi-VN', {style: 'currency', currency: 'VND'}).replace('₫', '').trim();
  };

  const renderItem = ({item}) => <HistoryItem transaction={item} />;

  return (
    <View style={styles.container}>
      <View style={appst.rowCenter}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image style={appst.icon40} source={require('../../assets/icons/ic_back.png')} />
        </TouchableOpacity>
        <Text style={styles.title}>{t('wallets.title')}</Text>
        <View style={{width: 40}} />
      </View>
      <FlatList
        data={transactions}
        renderItem={renderItem}
        keyExtractor={item => item._id}
        nestedScrollEnabled
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListHeaderComponent={
          <>
            <View style={styles.viewBody}>
              <View style={appst.rowCenter}>
                <View>
                  <Text style={styles.balance}>{t('wallets.balance')}</Text>
                  <Text style={styles.price}>{formatVND(balance)} VNĐ</Text>
                </View>
                <View>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('DepositWalletScreen', {balance: balance})}>
                    <Text style={styles.buttonText}>{t('wallets.deposit')}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('TransferWalletScreen', {balance: balance})}>
                    <Text style={styles.buttonText}>{t('wallets.transfer')}</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <Text style={[styles.balance, {marginVertical: spacing.lg}]}>{t('wallets.history')}</Text>
            </View>
          </>
        }
      />
    </View>
  );
};
export default HomeWallet;
