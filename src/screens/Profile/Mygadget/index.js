import {Image, StyleSheet, Text, View} from 'react-native';

import {TouchableOpacity} from 'react-native-gesture-handler';

import React from 'react'
import styles from './style';

const ChildItemGadget = ({onPress, iconSource, text}) => (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.childItem}>
        <Image style={styles.ic_childs_mygadget} source={iconSource} />
        <Text style={styles.text2}>{text}</Text>
      </View>
    </TouchableOpacity>
  );

export default ChildItemGadget

