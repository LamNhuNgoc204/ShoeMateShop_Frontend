import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import appst from '../../../constants/AppStyle';
import {useNavigation} from '@react-navigation/native';
import styles from './style';
import {useTranslation} from 'react-i18next';
const RenderSettingItem = ({item}) => {
  const navigation = useNavigation();
  const {t} = useTranslation();

  return (
    <View>
      <TouchableOpacity
        style={[appst.rowCenter, styles.container]}
        onPress={() => navigation.navigate(item.navigateTo)}>
        <Text style={styles.text}>{t(item.text)}</Text>
        <View style={appst.rowCenter}>
          {/* {item.additionalInfo && (
            <Text style={styles.text1}>{t(item.additionalInfo)}</Text>
          )} */}
          <Image
            style={styles.rightArrow}
            source={require('../../../assets/icons/right-arrow.png')}
          />
        </View>
      </TouchableOpacity>
      <View style={styles.line} />
    </View>
  );
};

export default RenderSettingItem;
