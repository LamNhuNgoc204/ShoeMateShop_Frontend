import React, {useEffect, useRef, useState} from 'react';
import {View, Text, Image} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import PagerView from 'react-native-pager-view';

import homeStyle from './style';
import appst from '../../constants/AppStyle';
import ToolBar from '../../components/ToolBar';
import ProductItem from '../../items/ProductItem';
import {
  fetchProductsThunk,
  fetchWishlist,
} from '../../redux/thunks/productThunks';
import {getCategoryThunk} from '../../redux/thunks/categoryThunk';
import {BANNERS} from '../../api/mockData';
import {addProductInWishlist, removeFromWishlist} from '../../api/ProductApi';
import Category from '../../items/Category';
import {setWishlistLocal} from '../../redux/reducer/productReducer';
import HomeSkeleton from '../../placeholders/home';

const HomeScreen = ({navigation}) => {
  const {t} = useTranslation();
  const pagerRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [listProduct, setListProduct] = useState([]);
  const [categories, setCategories] = useState([]);
  const [wishList, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);

  const state = useSelector(state => state.products);
  const useAppDispatch = () => useDispatch();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await Promise.all([
        dispatch(fetchProductsThunk()),
        dispatch(getCategoryThunk()),
        dispatch(fetchWishlist()),
      ]);
      setLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    setWishlist(state.wishlist);
  }, [state.wishlist]);

  useEffect(() => {
    setListProduct(state.products);
    setCategories(state.categories);
  }, [state]);

  // console.log('product data', state, '-----', listProduct);
  // console.log('listProduct===========', listProduct);

  const goToPage = page => {
    if (page < BANNERS.length && pagerRef.current) {
      pagerRef.current.setPage(page);
      setCurrentPage(page);
    }
  };

  const onItemPress = category => {
    navigation.navigate('CategoryDetail', {
      categoryId: category._id,
      name: category.name,
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentPage === BANNERS.length - 1) {
        goToPage(0);
      } else {
        goToPage(currentPage + 1);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [currentPage, BANNERS.length]);

  const onEditPress = () => {
    navigation.navigate('SearchResult');
  };

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

  return (
    <View style={[homeStyle.container, appst.container]}>
      <ToolBar
        onEditPress={onEditPress}
        editable={false}
        iconRight={require('../../assets/icons/message.png')}
        onIconRightPress={() => {
          navigation.navigate('MessageScreen');
        }}
      />
      {loading ? (
        <HomeSkeleton />
      ) : (
        // <ActivityIndicator size="large" color="#0000ff" />
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={appst.container}>
          <View style={homeStyle.bannerContainer}>
            <PagerView
              onPageSelected={e => {
                goToPage(e.nativeEvent.position);
              }}
              initialPage={0}
              ref={pagerRef}>
              {BANNERS.map((item, index) => (
                <View key={index}>
                  <Image source={item} style={homeStyle.banner} />
                </View>
              ))}
            </PagerView>
            <FlatList
              data={BANNERS}
              renderItem={({item, index}) => (
                <View
                  style={[
                    homeStyle.indicatorDot,
                    index === currentPage && homeStyle.indicatorActiveDot,
                    index !== BANNERS.length - 1 && homeStyle.marginRight12,
                  ]}></View>
              )}
              keyExtractor={(item, index) => index.toString()}
              horizontal
              style={homeStyle.indicator}
            />
          </View>

          <ScrollView
            showsHorizontalScrollIndicator={false}
            style={homeStyle.scrollContainer}
            horizontal>
            <View>
              <FlatList
                scrollEnabled={false}
                style={homeStyle.marginTop15}
                data={categories}
                renderItem={({item, index}) => {
                  if (index % 2 === 0) {
                    return (
                      <Category
                        onItemPress={() => {
                          onItemPress(item);
                        }}
                        category={item}
                        style={[
                          index < categories.length - 2 &&
                            homeStyle.marginRight30,
                          homeStyle.marginBottom15,
                        ]}
                      />
                    );
                  }
                }}
                horizontal
                keyExtractor={(item, index) => index.toString()}
                showsHorizontalScrollIndicator={false}
              />

              <FlatList
                scrollEnabled={false}
                data={categories}
                renderItem={({item, index}) => {
                  if (index % 2 === 1) {
                    return (
                      <Category
                        onItemPress={() => {
                          onItemPress(item);
                        }}
                        category={item}
                        style={[
                          index < categories.length - 2 &&
                            homeStyle.marginRight30,
                        ]}
                      />
                    );
                  }
                }}
                horizontal
                keyExtractor={(item, index) => index.toString()}
                showsHorizontalScrollIndicator={false}
              />
            </View>
          </ScrollView>

          <Text style={homeStyle.pfyText}>{t('home.list_product')}</Text>

          <FlatList
            data={listProduct}
            renderItem={({item}) => (
              <ProductItem
                wishlist={wishList}
                handleHeartPress={handleHeartPress}
                product={item}
              />
            )}
            keyExtractor={(item, index) => index.toString()}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
          />
        </ScrollView>
      )}
    </View>
  );
};

export default HomeScreen;
