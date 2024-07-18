import React from 'react';
import { View, Text, Image } from 'react-native';
import { spacing } from '../../../constants';
import appst from '../../../constants/AppStyle';
import styles from './style';

const HistoryItem = ({ title, date, amount }) => {
  const isPositive = amount > 0;
  const formattedAmount = isPositive ? `+ ${amount}` : `- ${Math.abs(amount)}`;
  const showDollarSign = !title.toLowerCase().includes("point");

  return (
    <View style={{ marginBottom: spacing.sm }}>
      <View style={appst.rowCenter}>
        <View>
          <Text style={styles.titlehistory}>{title}</Text>
          <Text style={styles.datehistory}>{date}</Text>
        </View>
        <Text style={isPositive ? styles.priceplushistory : styles.priceminushistory}>
          {formattedAmount}{showDollarSign ? '$' : ''}
        </Text>
      </View>
      <Image
        style={{ width: '100%' }}
        source={require('../../../assets/icons/linesetting.png')}
      />
    </View>
  );
};

export default HistoryItem;
