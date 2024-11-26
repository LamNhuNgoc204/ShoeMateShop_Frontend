import {Button, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

const PaymentResult = () => {
  const navigation = useNavigation();
  return (
    <View>
      <Text>Chức mừng bạn đã thanh toánh tc</Text>
      <Button
        onPress={() => navigation.goBack()}
        title="Trở về trang chủ tui bị khùng"
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default PaymentResult;
