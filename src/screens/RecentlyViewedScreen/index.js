import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import appst from '../../constants/AppStyle';
import {colors} from '../../constants/colors';
import {fonts} from '../../constants/fonts';
import {useNavigation} from '@react-navigation/native';
import ProductItem from '../../items/ProductItem';
import {useTranslation} from 'react-i18next';
import {
  addProductInWishlist,
  getRecentViews,
  removeFromWishlist,
} from '../../api/ProductApi';
import st from './style';
import RecentlySkeleton from '../../placeholders/product/recently';
import Header from '../../components/Header';
import {setWishlistLocal} from '../../redux/reducer/productReducer';
import {useDispatch, useSelector} from 'react-redux';

const RecentlyViewedScreen = () => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const state = useSelector(state => state.products);
  const dispatch = useDispatch();

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

  // console.log('product rêcntly ', products[0]);

  const modifiedListProduct =
    products.length % 2 !== 0 ? [...products, {_id: 'empty'}] : products;

  const handleHeartPress = async (product, isFavorite) => {
    try {
      var response;
      if (isFavorite) {
        response = await removeFromWishlist(product._id);
      } else {
        response = await addProductInWishlist(product._id);
      }

      if (response.status) {
        dispatch(setWishlistLocal(product));
        console.log(isFavorite ? 'Removed from wishlist' : 'Added to wishlist');
      }
    } catch (error) {
      console.error('Error updating wishlist:', error);
    }
  };

  const renderItem = React.useCallback(
    ({item, index}) => {
      return (
        <ProductItem
          product={item.productId}
          index={index}
          wishlist={state.wishlist}
          handleHeartPress={handleHeartPress}
        />
      );
    },
    [state.wishlist, handleHeartPress],
  );

  return (
    <View style={styles.container}>
      <Header
        name={t('profiles.viewed')}
        iconLeft={require('../../assets/icons/back.png')}
        leftOnPress={() => navigation.goBack()}
      />

      <View style={{flex: 1, marginTop: 10, paddingHorizontal: 20}}>
        {loading ? (
          products.length > 0 ? (
            <FlatList
              data={modifiedListProduct}
              renderItem={
                renderItem
                //   ({item, index}) => (
                //   <ProductItem
                //     product={item.productId}
                //     index={index}
                //     wishlist={state.wishlist}
                //     handleHeartPress={handleHeartPress}
                //   />
                // )
              }
              keyExtractor={(item, index) => item._id || index.toString()}
              numColumns={2}
              showsVerticalScrollIndicator={false}
              initialNumToRender={10} // Render trước 10 item
              maxToRenderPerBatch={5} // Render thêm 5 item mỗi lần
              windowSize={5} // Giữ 5 màn hình item trong bộ nhớ
            />
          ) : (
            <View style={[appst.container, appst.center]}>
              <Image
                style={st.img}
                source={require('../../assets/images/no_recent.png')}
              />
              <Text style={st.text}>{t('products.no_recently')}</Text>
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
    paddingTop: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'semibold',
    color: colors.text_black2B,
    fontFamily: fonts.rlw_medium,
  },
});
