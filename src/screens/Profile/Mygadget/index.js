import React from 'react';
import {Image, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import styles from './style';
import appst from '../../../constants/AppStyle';

const ChildItemGadget = ({onPress, iconSource, text}) => (
  <TouchableOpacity style={styles.childItem} onPress={onPress}>
    <Image style={appst.icon30} source={iconSource} />
    <Text style={styles.text2}>{text}</Text>
  </TouchableOpacity>
);

export default ChildItemGadget;
