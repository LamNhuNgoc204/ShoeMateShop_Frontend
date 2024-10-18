import {View, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import appst from '../../constants/AppStyle';
import {fvst} from './style';
import Header from '../../components/Header';
import ProductItem from '../../items/ProductItem';
import {useTranslation} from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Text} from 'react-native-svg';
import {useDispatch, useSelector} from 'react-redux';
import {fetchWishlistThunk} from '../../redux/thunks/productThunks';

const FavoriteScreen = ({navigation}) => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const wishlist = useSelector(state => state.products.wishlist);

  const [token, setToken] = useState(null);

  useEffect(() => {
    const fetchToken = async () => {
      const storedToken = await AsyncStorage.getItem('token');
      setToken(storedToken);
    };

    fetchToken();
  }, []);
  console.log('Token:', token);

  useEffect(() => {
    dispatch(fetchWishlistThunk());
  }, []);

  console.log('wishList', wishlist);

  return (
    <View style={[appst.container, fvst.container]}>
      <Header
        iconLeft={require('../../assets/icons/back.png')}
        leftOnPress={() => navigation.goBack()}
        name={t('home.favorite')}
        iconRight={require('../../assets/icons/favorite.png')}
      />
      <View style={[appst.center]}>
        {wishlist.length !== 0 ? (
          <FlatList
            data={[1, 2, 3, 4, 5]}
            renderItem={({item, index}) => (
              <ProductItem product={item} index={index} />
            )}
            keyExtractor={item => item.id}
            numColumns={2}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <Text>
            Bạn chưa thêm sản phẩm nào vào danh sách yêu thích cả. Đến trang chủ
            ngay
          </Text>
        )}
      </View>
      {/* {token !== null ? (
        <View style={[appst.center]}>
          <FlatList
            data={[1, 2, 3, 4, 5]}
            renderItem={({item, index}) => (
              <ProductItem product={item} index={index} />
            )}
            keyExtractor={item => item.id}
            numColumns={2}
            showsVerticalScrollIndicator={false}
          />
        </View>
      ) : (
        <View
          style={{
            width: '100%',
            height: '100%',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{color: 'black'}}>
            Hãy đăng nhập để lưu trữ những sản phẩm yêu thích của bạn nhé
          </Text>
          <Text
            style={{color: 'black'}}
            onPress={() => navigation.replace('LoginScreen')}>
            Đến trang đăng nhập
          </Text>
        </View>
      )} */}
    </View>
  );
};

export default FavoriteScreen;
