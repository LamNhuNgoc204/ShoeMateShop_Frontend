import React from 'react';
import {Image, Text, View, TouchableOpacity} from 'react-native';
import styles from './style';
import appst from '../../../constants/AppStyle';

const ChildItem = ({onPress, iconSource, text}) => (
  <TouchableOpacity style={styles.recentlyViewedContainer} onPress={onPress}>
    <View style={styles.recentlyViewed}>
      <Image style={appst.icon24} source={iconSource} />
      <Text style={styles.text3}>{text}</Text>
    </View>
    <Image
      style={styles.ic_rightblue}
      source={require('../../../assets/icons/ic_rightblue.png')}
    />
  </TouchableOpacity>
);

export default ChildItem;
