import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import appst from '../../constants/AppStyle';
import {colors} from '../../constants/colors';
import {fonts} from '../../constants/fonts';
import {useNavigation} from '@react-navigation/native';
import ProductItem from '../../items/ProductItem';
import {useTranslation} from 'react-i18next';
import st from './style';
import RecentlySkeleton from '../../placeholders/product/recently';
import Header from '../../components/Header';
import ProductList from '../Product/ProductList';
import {useSelector} from 'react-redux';
import {getRecentViews} from '../../api/ProductApi';

const BuyAgain = () => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const listProduct = useSelector(state => state.products.products);

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

  console.log('product', products);

  return (
    <View style={styles.container}>
      <Header
        name={'Mua lại'}
        iconLeft={require('../../assets/icons/back.png')}
        leftOnPress={() => navigation.goBack()}
      />
      <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
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
              <View
                style={[appst.container, appst.center, {paddingVertical: 100}]}>
                <Image
                  style={st.img}
                  source={require('../../assets/images/no_recent.png')}
                />
                <Text style={st.text}>Chưa có sản phẩm</Text>
              </View>
            )
          ) : (
            <RecentlySkeleton />
          )}
        </View>

        <ProductList listProduct={listProduct} />
      </ScrollView>
    </View>
  );
};

export default BuyAgain;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'semibold',
    color: colors.text_black2B,
    fontFamily: fonts.rlw_medium,
  },
});
