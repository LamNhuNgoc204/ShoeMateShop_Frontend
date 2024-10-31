import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { sizes } from '../../../constants';
import appst from '../../../constants/AppStyle';
import { useNavigation } from '@react-navigation/native';
import styles from './style';
const RenderSettingItem = ({ item }) => {
  const navigation = useNavigation();

  return (
    <View>
      <TouchableOpacity 
        style={[appst.rowCenter, { marginTop: sizes.size24 }]}
        onPress={() => navigation.navigate(item.navigateTo)}>
        <Text style={styles.text}>{item.text}</Text>
        <View style={appst.rowCenter}>
          {item.additionalInfo && <Text style={styles.text1}>{item.additionalInfo}</Text>}
          <Image
            style={styles.rightArrow}
            source={require('../../../assets/icons/right-arrow.png')}
          />
        </View>
      </TouchableOpacity>
      <Image
        style={styles.line}
        source={require('../../../assets/icons/linesetting.png')}
      />
    </View>
  );
};


export default RenderSettingItem;
