import {useTranslation} from 'react-i18next';
import React, {useEffect, useState} from 'react';
import {View, Text, FlatList} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {fvst} from './style';
import Header from '../../components/Header';
import appst from '../../constants/AppStyle';
import ProductItem from '../../items/ProductItem';
import {fetchWishlist, removeFromWishlist} from '../../api/ProductApi';

const FavoriteScreen = ({navigation}) => {
  const {t} = useTranslation();
  const [wishList, setWishList] = useState([]);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const fetchToken = async () => {
      const storedToken = await AsyncStorage.getItem('token');
      setToken(storedToken);
    };

    fetchToken();
  }, []);
  // console.log('Token:', token);

  useEffect(() => {
    const fetchWishlistData = async () => {
      try {
        const response = await fetchWishlist();
        console.log('response wishlist: ', response);

        if (response.status) {
          setWishList(response.data);
        }
      } catch (error) {
        console.log('fetchWishlistData error: ', error);
      }
    };
    fetchWishlistData();
  }, []);
  // console.log('wishList', wishList);
  console.log('wishList', wishList[0]);

  const handleHeartPress = async (productId, _) => {
    console.log('productId', productId);

    try {
      const response = await removeFromWishlist(productId);

      if (response.status) {
        setWishList(prevList =>
          prevList.filter(item => item._id !== productId),
        );
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
      <View style={[appst.center]}>
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
