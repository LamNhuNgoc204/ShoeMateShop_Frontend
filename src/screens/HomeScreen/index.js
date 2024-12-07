import React, {useCallback, useEffect, useRef, useState} from 'react';
import {View, Image} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import PagerView from 'react-native-pager-view';

import homeStyle from './style';
import appst from '../../constants/AppStyle';
import ToolBar from '../../components/ToolBar';
import {
  fetchProductsThunk,
  fetchWishlist,
} from '../../redux/thunks/productThunks';
import {getCategoryThunk} from '../../redux/thunks/categoryThunk';
import {BANNERS} from '../../api/mockData';
import Category from '../../items/Category';
import HomeSkeleton from '../../placeholders/home';
import {useFocusEffect} from '@react-navigation/native';
import Loading from '../../components/Loading';
import ProductList from '../Product/ProductList';
import {shuffleArray} from '../../utils/functions/formatData';
import {checkTokenValidity} from '../../utils/functions/checkToken';

const HomeScreen = ({navigation, route}) => {
  const {t} = useTranslation();
  const pagerRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [listProduct, setListProduct] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const state = useSelector(state => state.products);
  const dispatch = useDispatch();

  useFocusEffect(
    useCallback(() => {
      if (route?.params?.reload) {
        console.log('Reload dữ liệu trên HomeScreen');

        const fetchData = async () => {
          const isTokenValid = await checkTokenValidity();
          setLoading(true);

          // Danh sách các API cần gọi
          const thunks = [
            dispatch(fetchProductsThunk()),
            dispatch(getCategoryThunk()),
          ];

          // Thêm fetchWishlist nếu token hợp lệ
          if (isTokenValid) {
            thunks.push(dispatch(fetchWishlist()));
          }

          await Promise.all(thunks);
          setLoading(false);
        };

        fetchData();

        // Đặt lại params để không reload liên tục
        // route.params.reload = false;
        navigation.setParams({reload: false}); //Set params trực tiếp
      }
    }, [route?.params?.reload]),
  );

  const [isTokenValid, setIsTokenValid] = useState(false);

  useEffect(() => {
    const validateToken = async () => {
      const valid = await checkTokenValidity();
      setIsTokenValid(valid);
    };

    validateToken();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      // const isTokenValid = await checkTokenValidity();

      if (
        !state.products.length ||
        !state.categories.length ||
        (isTokenValid && !state.wishlist.length)
      ) {
        setLoading(true);
        const thunks = [
          dispatch(fetchProductsThunk()),
          dispatch(getCategoryThunk()),
        ];

        // Chỉ gọi wishlist nếu token hợp lệ
        if (isTokenValid && !state.wishlist.length) {
          thunks.push(dispatch(fetchWishlist()));
        }

        await Promise.all(thunks);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    setCategories(state.categories);
  }, [state]);

  useEffect(() => {
    if (
      Array.isArray(state?.products?.data) &&
      state?.products?.data.length > 0
    ) {
      setListProduct(shuffleArray(state?.products?.data));
    }
  }, [state?.products?.data]);

  // console.log('product data', state, '-----', listProduct);
  // console.log('state?.products?.data ===========', state?.products?.data);
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

  return (
    <View style={[homeStyle.container, appst.container]}>
      <ToolBar
        onEditPress={onEditPress}
        editable={false}
        iconRight={require('../../assets/icons/message.png')}
        onIconRightPress={() => {
          isTokenValid
            ? navigation.navigate('MessageScreen')
            : navigation.navigate('RequireLogin');
        }}
      />
      {route?.params?.reload ? (
        <Loading />
      ) : (
        <View style={{flex: 1}}>
          {loading ? (
            <HomeSkeleton />
          ) : (
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
                  keyExtractor={(item, index) => item._id || index.toString()}
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

              <ProductList listProduct={listProduct} isHome={true} />
            </ScrollView>
          )}
        </View>
      )}
    </View>
  );
};

export default HomeScreen;
