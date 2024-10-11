import {View, Text, Image, TouchableOpacity, Button} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import homeStyle from './style';
import ToolBar from '../../components/ToolBar';
import PagerView from 'react-native-pager-view';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import ProductItem from '../../items/ProductItem';
import appst from '../../constants/AppStyle';
import {useTranslation} from 'react-i18next';
import {getToken} from '../../utils/functions/getToken';
import {useDispatch, useSelector} from 'react-redux';
import {fetchProductsThunk} from '../../redux/thunks/productThunks';

const banners = [
  require('../../assets/images/banner1.png'),
  require('../../assets/images/banner2.jpg'),
  require('../../assets/images/banner3.jpg'),
];

const categories = [
  {
    id: 1,
    name: 'voucher',
    image: require('../../assets/icons/voucher.png'),
  },
  {
    id: 1,
    name: 'voucher',
    image: require('../../assets/icons/voucher.png'),
  },
  {
    id: 1,
    name: 'voucher',
    image: require('../../assets/icons/voucher.png'),
  },
  {
    id: 1,
    name: 'voucher',
    image: require('../../assets/icons/voucher.png'),
  },
  {
    id: 1,
    name: 'voucher',
    image: require('../../assets/icons/voucher.png'),
  },
  {
    id: 1,
    name: 'voucher',
    image: require('../../assets/icons/voucher.png'),
  },
  {
    id: 1,
    name: 'voucher',
    image: require('../../assets/icons/voucher.png'),
  },
  {
    id: 1,
    name: 'voucher',
    image: require('../../assets/icons/voucher.png'),
  },
  {
    id: 1,
    name: 'voucher',
    image: require('../../assets/icons/voucher.png'),
  },
  {
    id: 1,
    name: 'voucher',
    image: require('../../assets/icons/voucher.png'),
  },
  {
    id: 1,
    name: 'voucher',
    image: require('../../assets/icons/voucher.png'),
  },
  {
    id: 1,
    name: 'voucher',
    image: require('../../assets/icons/voucher.png'),
  },
  {
    id: 1,
    name: 'voucher',
    image: require('../../assets/icons/voucher.png'),
  },
];

const Category = ({category, style}) => {
  return (
    <TouchableOpacity
      style={[homeStyle.categoryItem, homeStyle.marginBottom15, style]}>
      <View style={homeStyle.categoryIconWrapper}>
        <Image source={category.image} style={homeStyle.categoryImage} />
      </View>
      <Text style={homeStyle.categoryText}>{category.name}</Text>
    </TouchableOpacity>
  );
};

const HomeScreen = () => {
  const {t} = useTranslation();
  const pagerRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [listProduct, setListProduct] = useState([]);

  const useAppSelector = useSelector;
  const productState = useAppSelector(state => state.products);
  const useAppDispatch = () => useDispatch();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchProduct = async () => {
      await dispatch(fetchProductsThunk());
    };
    fetchProduct();
  }, []);

  useEffect(() => {
    setListProduct(productState.products);
  }, [productState]);

  // console.log('product data', productState, '-----', listProduct);

  const goToPage = page => {
    if (page < banners.length) {
      pagerRef.current.setPage(page);
      setCurrentPage(page);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentPage === banners.length - 1) {
        goToPage(0);
      } else {
        goToPage(currentPage + 1);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [currentPage, banners.length]);

  return (
    <View style={[homeStyle.container, appst.container]}>
      <Button title={'get token '} onPress={() => getToken()}></Button>
      <ToolBar iconRight={require('../../assets/icons/message.png')} />
      <ScrollView showsVerticalScrollIndicator={false} style={appst.container}>
        <View style={homeStyle.bannerContainer}>
          <PagerView
            onPageSelected={e => {
              goToPage(e.nativeEvent.position);
            }}
            initialPage={0}
            ref={pagerRef}>
            {banners.map((item, index) => (
              <View key={index}>
                <Image source={item} style={homeStyle.banner} />
              </View>
            ))}
          </PagerView>
          <FlatList
            data={banners}
            renderItem={({item, index}) => (
              <View
                style={[
                  homeStyle.indicatorDot,
                  index === currentPage && homeStyle.indicatorActiveDot,
                  index !== banners.length - 1 && homeStyle.marginRight12,
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
                      category={item}
                      style={[
                        index < categories.length - 2 &&
                          homeStyle.marginRight40,
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
                      category={item}
                      style={[
                        index < categories.length - 2 &&
                          homeStyle.marginRight40,
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
          renderItem={({item, index}) => (
            <ProductItem product={item} index={index} />
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
