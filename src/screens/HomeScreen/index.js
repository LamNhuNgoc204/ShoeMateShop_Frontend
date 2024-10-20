import React, {useEffect, useRef, useState} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import {FlatList, ScrollView} from 'react-native-gesture-handler';

import homeStyle from './style';
import ToolBar from '../../components/ToolBar';
import PagerView from 'react-native-pager-view';
import ProductItem from '../../items/ProductItem';
import appst from '../../constants/AppStyle';
import {fetchProductsThunk} from '../../redux/thunks/productThunks';
import {getCategoryThunk} from '../../redux/thunks/categoryThunk';
import {BANNERS} from '../../api/mockData';
import {addProductInWishlist} from '../../api/ProductApi';
import Category from '../../items/Category';

const HomeScreen = ({navigation}) => {
  const {t} = useTranslation();
  const pagerRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [listProduct, setListProduct] = useState([]);
  const [categories, setCategories] = useState([]);

  const useAppSelector = useSelector;
  const state = useAppSelector(state => state.products);
  const useAppDispatch = () => useDispatch();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchProduct = async () => {
      await dispatch(fetchProductsThunk());
    };
    dispatch(getCategoryThunk());
    fetchProduct();
  }, []);

  useEffect(() => {
    setListProduct(state.products);
    setCategories(state.categories);
  }, [state]);

  // console.log('product data', state, '-----', listProduct);
  // console.log('listProduct===========', listProduct);

  const goToPage = page => {
    if (page < BANNERS.length) {
      pagerRef.current.setPage(page);
      setCurrentPage(page);
    }
  };

  const onItemPress = category => {
    navigation.navigate('CategoryDetail', {
      categoryId: category._id,
      name:  category.name
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

  const handleHeartPress = async (productId, isFavorite) => {
    try {
      const response = await addProductInWishlist(productId);
      // console.log('response', response);

      if (response.status) {
        setListProduct(prevList =>
          prevList.map(product =>
            product._id === productId
              ? {...product, isFavorite: !isFavorite}
              : product,
          ),
        );
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
      <ScrollView showsVerticalScrollIndicator={false} style={appst.container}>
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
            <ProductItem handleHeartPress={handleHeartPress} product={item} />
          )}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
          // ItemSeparatorComponent={() => <View style={homeStyle.separator}/>}
        />
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
