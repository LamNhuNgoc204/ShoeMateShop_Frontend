import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {View, Text, FlatList, Image, TouchableOpacity} from 'react-native';
import {fvst} from './style';
import Header from '../../components/Header';
import appst from '../../constants/AppStyle';
import ProductItem from '../../items/ProductItem';
import {addProductInWishlist, removeFromWishlist} from '../../api/ProductApi';
import {useDispatch, useSelector} from 'react-redux';
import {setWishlistLocal} from '../../redux/reducer/productReducer';
import {checkTokenValidity} from '../../utils/functions/checkToken';

const FavoriteScreen = ({navigation}) => {
  const {t} = useTranslation();
  const productsState = useSelector(state => state.products);
  const useAppDispatch = () => useDispatch();
  const dispatch = useAppDispatch();
  const [wishList, setWishList] = useState([]);
  const isTokenValid = useSelector(state => state?.user?.isValidToken);

  useEffect(() => {
    setWishList(productsState.wishlist);
  }, [productsState.wishlist]);

  const handleHeartPress = async (product, favorite) => {
    try {
      var response;
      if (favorite) {
        response = await removeFromWishlist(product._id);
      } else {
        response = await addProductInWishlist(product._id);
      }

      if (response.status) {
        dispatch(setWishlistLocal(product));
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
      {isTokenValid ? (
        <View style={{padding: 20}}>
          {wishList.length !== 0 ? (
            <FlatList
              data={wishList}
              renderItem={({item, index}) => (
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
            <Text>{t('favorite.sub_title')}</Text>
          )}
        </View>
      ) : (
        <View style={fvst.container2}>
          <Image
            style={fvst.icon}
            source={require('../../assets/icons/blank_fv.png')}
          />
          <Text style={fvst.text1}>{t('favorite.sub_title1')}</Text>
          <TouchableOpacity
            style={fvst.button}
            onPress={() => {
              navigation.replace('LoginScreen');
            }}>
            <Text style={fvst.buttonText}>{t('buttons.btn_signin')}</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default FavoriteScreen;
