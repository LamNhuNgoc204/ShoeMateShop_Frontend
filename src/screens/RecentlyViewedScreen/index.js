import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import appst from '../../constants/AppStyle';
import {spacing} from '../../constants';
import {colors} from '../../constants/colors';
import {fonts} from '../../constants/fonts';
import {useNavigation} from '@react-navigation/native';
import ProductItem from '../../items/ProductItem';
import {useTranslation} from 'react-i18next';

const RecentlyViewedScreen = () => {
  const {t} = useTranslation();
  const products = new Array(10).fill(1);
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={appst.rowCenter}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            style={appst.icon40}
            source={require('../../assets/icons/ic_back.png')}
          />
        </TouchableOpacity>
        <Text style={styles.title}>{t('profiles.viewed')}</Text>
        <View style={{width: 40}} />
      </View>
      <View>
        <FlatList
          data={products}
          renderItem={({item, index}) => (
            <ProductItem product={item} index={index} />
          )}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
        />
      </View>
    </View>
  );
};

export default RecentlyViewedScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: spacing.lg,
  },
  title: {
    fontSize: 20,
    fontWeight: 'semibold',
    color: colors.text_black2B,
    fontFamily: fonts.rlw_medium,
  },
});
