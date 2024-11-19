import {View, Text, FlatList} from 'react-native';
import React from 'react';
import homeStyle from '../HomeScreen/style';
import {useTranslation} from 'react-i18next';
import ProductItem from '../../items/ProductItem';
import {useDispatch} from 'react-redux';
import {addProductInWishlist, removeFromWishlist} from '../../api/ProductApi';
import {setWishlistLocal} from '../../redux/reducer/productReducer';
import appst from '../../constants/AppStyle';
import {odst} from '../Orders/style';

const ProductList = ({listProduct, wishList, isHome, onSetProduct}) => {
  const {t} = useTranslation();
  const dispatch = useDispatch();

  const modifiedListProduct =
    listProduct.length % 2 !== 0
      ? [...listProduct, {_id: 'empty'}]
      : listProduct;

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
    <View style={{width: '100%'}}>
      {isHome ? (
        <Text style={homeStyle.pfyText}>{t('home.list_product')}</Text>
      ) : (
        <View style={[appst.rowCenter, {marginBottom: 15}]}>
          <View style={odst.border} />
          <Text style={odst.text}>{t('products.similar_product')}</Text>
          <View style={odst.border} />
        </View>
      )}

      <FlatList
        data={modifiedListProduct}
        renderItem={({item}) => (
          <ProductItem
            wishlist={wishList}
            handleHeartPress={handleHeartPress}
            product={item}
            onSetProduct={onSetProduct}
          />
        )}
        keyExtractor={(item, index) => item._id || index.toString()}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
        columnWrapperStyle={{
          justifyContent: 'center',
        }}
        ItemSeparatorComponent={() => <View style={{width: 10}} />}
      />
    </View>
  );
};

export default ProductList;
