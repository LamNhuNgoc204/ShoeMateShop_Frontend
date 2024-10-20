import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fvst } from './style';
import Header from '../../components/Header';
import appst from '../../constants/AppStyle';
import ProductItem from '../../items/ProductItem';
import { addProductInWishlist, removeFromWishlist } from '../../api/ProductApi';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromWishlistLocal, setWishlist } from '../../redux/reducer/productReducer';

const FavoriteScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const [token, setToken] = useState(null);
  const productsState = useSelector(state => state.products);
  const useAppDispatch = () => useDispatch();
  const dispatch = useAppDispatch();
  const [wishList, setWishList] = useState([]);

  // useEffect(() => {
  // const fetchToken = async () => {
  //   const storedToken = await AsyncStorage.getItem('token');
  //   setToken(storedToken);
  // };

  // fetchToken();
  // }, []);

  useEffect(() => {
    setWishList(productsState.wishlist)
  }, [productsState.wishlist])

  const handleHeartPress = async (product, favorite) => {
    try {
      var response;
      if(favorite) {
        response = await removeFromWishlist(product._id)
      } else {
        response = await addProductInWishlist(product._id)
      }

      if (response.status) {
        dispatch(setWishList(product))
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
      <View style={{ padding: 20 }}>
        {wishList.length !== 0 ? (
          <FlatList
            data={wishList}
            renderItem={({ item, index }) => (
              <ProductItem
                wishlist={wishList}
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
