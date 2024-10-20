import {View, ActivityIndicator} from 'react-native';
import React from 'react';
import { colors } from '../../constants/colors';

const Loading = () => (
  <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <ActivityIndicator size="large" color={colors.primary} />
  </View>
);

export default Loading;
