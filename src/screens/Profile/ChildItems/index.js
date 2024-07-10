import {Image, StyleSheet, Text, View} from 'react-native';

import {TouchableOpacity} from 'react-native-gesture-handler';

import React from 'react'
import styles from './style';

const ChildItem = ({onPress, iconSource, text}) => (
    <TouchableOpacity
    onPress={onPress}
    >
    <View style={styles.recentlyViewedContainer}>
      <View style={styles.recentlyViewed}>
        <Image
          style={styles.ic_recently}
          source={iconSource}
        />
        <Text style={styles.text3}>{text}</Text>
      </View>
      <Image
        style={styles.ic_rightblue}
        source={require('../../../assets/icons/ic_rightblue.png')}
      />
    </View>
  </TouchableOpacity>
  );

export default ChildItem

