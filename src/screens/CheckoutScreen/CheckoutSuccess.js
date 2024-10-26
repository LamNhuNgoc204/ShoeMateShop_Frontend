import {View, Text} from 'react-native';
import React from 'react';
import Header from '../../components/Header';

const CheckoutSuccess = ({navigation}) => {
  return (
    <View>
      <View style={{backgroundColor: 'blue'}}>
        <Header
          iconLeft={require('../../assets/icons/back.png')}
          leftOnPress={() => {}}
          iconRight={require('../../assets/icons/bag_icon.png')}
          rightOnPress={() => {}}
        />
      </View>
    </View>
  );
};

export default CheckoutSuccess;
