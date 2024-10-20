import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {View, Text, FlatList} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {fvst} from './style';
import Header from '../../components/Header';
import appst from '../../constants/AppStyle';
import ProductItem from '../../items/ProductItem';
import {removeFromWishlist} from '../../api/ProductApi';
import {useDispatch, useSelector} from 'react-redux';
import {setWishlist} from '../../redux/reducer/productReducer';

const FavoriteScreen = ({navigation}) => {
  const {t} = useTranslation();
  const [token, setToken] = useState(null);
  const useAppSelector = useSelector;
  const wishlistRedux = useAppSelector(state => state.products.wishlist);
  const useAppDispatch = () => useDispatch();
  const dispatch = useAppDispatch();
  const [wishList, setWishList] = useState(wishlistRedux);

  // console.log('wishList default', wishList);

  useEffect(() => {
    const fetchToken = async () => {
      const storedToken = await AsyncStorage.getItem('token');
      setToken(storedToken);
    };

    fetchToken();
  }, []);
  // console.log('Token:', token);

  const handleHeartPress = async (productId, favorite) => {
    console.log('productId', productId);
    try {
      const response = await removeFromWishlist(productId);

      if (response) {
        dispatch(removeFromWishlist(productId));
        setWishList(prevList => {
          const updatedList = prevList.filter(item => item._id !== productId);
          return updatedList;
        });
      }
    } catch (error) {
      console.log('Error removing item from wishlist:', error);
    }
  };

  return (
    <View style={[appst.container, fvst.container]}>
      <Header
        iconLeft={require('../../assets/icons/back.png')}
        leftOnPress={() => navigation.goBack()}
        name={t('home.favorite')}
        iconRight={require('../../assets/icons/favorite.png')}
      />
      <View style={{padding: 20}}>
        {wishList.length !== 0 ? (
          <FlatList
            data={wishList}
            renderItem={({item, index}) => (
              <ProductItem
                product={item}
                index={index}
                handleHeartPress={handleHeartPress}
              />
            )}
            keyExtractor={(item, index) =>
              item._id ? item._id : index.toString()
            }
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
