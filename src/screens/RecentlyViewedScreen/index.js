import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import appst from '../../constants/AppStyle';
import {spacing} from '../../constants';
import {colors} from '../../constants/colors';
import {fonts} from '../../constants/fonts';
import {useNavigation} from '@react-navigation/native';
import ProductItem from '../../items/ProductItem';
import {useTranslation} from 'react-i18next';
import {getRecentViews} from '../../api/ProductApi';
import st from './style';
import RecentlySkeleton from '../../placeholders/product/recently';

const RecentlyViewedScreen = () => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(false);
      const response = await getRecentViews();
      if (response) {
        setProducts(response.data);
        setLoading(true);
      }
    };
    setLoading(true);
    fetchData();
  }, []);

  // console.log('product', products);

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
      <View style={{flex: 1, marginTop: 10}}>
        {loading ? (
          products.length > 0 ? (
            <FlatList
              data={products}
              renderItem={({item, index}) => (
                <ProductItem product={item.productId} index={index} />
              )}
              keyExtractor={(item, index) => index.toString()}
              numColumns={2}
              showsVerticalScrollIndicator={false}
              scrollEnabled={false}
            />
          ) : (
            <View style={[appst.container, appst.center]}>
              <Image
                style={st.img}
                source={require('../../assets/images/no_recent.png')}
              />
              <Text style={st.text}>Khong co san pham da xem gan day</Text>
            </View>
          )
        ) : (
          <RecentlySkeleton />
        )}
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
