import {Image, Text, TouchableOpacity, View, FlatList} from 'react-native';
import React from 'react';
import {spacing} from '../../constants';
import appst from '../../constants/AppStyle';
import HistoryItem from './HistoryItem';
import styles from './style';
import {useTranslation} from 'react-i18next';

const HomeWallet = ({navigation}) => {
  const {t} = useTranslation();

  const historyData = [
    {id: '1', title: 'Payment', date: '17/07/2024', amount: -5100},
    {id: '2', title: 'Deposit', date: '17/07/2024', amount: 5000},
    {id: '3', title: 'Use point', date: '17/07/2024', amount: -500},
    {id: '4', title: 'Received', date: '17/07/2024', amount: 5000},
    {id: '5', title: 'Payment', date: '17/07/2024', amount: -5100},
    {id: '6', title: 'Deposit', date: '17/07/2024', amount: 5000},
    {id: '7', title: 'Use point', date: '17/07/2024', amount: -500},
  ];

  const renderItem = ({item}) => (
    <HistoryItem title={item.title} date={item.date} amount={item.amount} />
  );

  return (
    <View style={styles.container}>
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

      <View style={styles.viewBody}>
        <View style={appst.rowCenter}>
          <View>
            <Text style={styles.balance}>{t('wallets.balance')}</Text>
            <Text style={styles.price}>6000$</Text>
            <Text style={styles.point}>300 {t('wallets.point')}</Text>
          </View>
          <View>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>{t('wallets.deposit')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>{t('wallets.transfer')}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text style={[styles.balance, {marginVertical: spacing.lg}]}>
          {t('wallets.history')}
        </Text>
        <FlatList
          data={historyData}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </View>
    </View>
  );
};

export default HomeWallet;
