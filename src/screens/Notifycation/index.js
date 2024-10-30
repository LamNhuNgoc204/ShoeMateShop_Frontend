import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Header from '../../components/Header';
import appst from '../../constants/AppStyle';

const Notifycation = () => {
  return (
    <View style={appst.container}>
      <Header name={'Thông báo'} />
    </View>
  );
};

export default Notifycation;

const styles = StyleSheet.create({});
