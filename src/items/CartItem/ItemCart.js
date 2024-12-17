import {View, Text, TouchableOpacity, Image, ToastAndroid} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {itCart} from './style';
import appst from '../../constants/AppStyle';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import SweetAlert from 'react-native-sweet-alert';
import {deleteOneItemCard, updateCartItem} from '../../api/CartApi';
import {useNavigation} from '@react-navigation/native';
import {formatPrice} from '../../utils/functions/formatData';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import Toast from 'react-native-toast-message';


const ItemCart = ({
  item,
  cards,
  setCards,
  setTotalPrice,
  currentlyOpenSwipeable,
  setCurrentlyOpenSwipeable,
  checkedProducts,
  setCheckedProducts,
  isChecked,
  onCheckedChange,
}) => {
  const [productQuantity, setProductQuantity] = useState(item.quantity);
  const navigation = useNavigation();
  const {t, i18n} = useTranslation();
  const lag = i18n.language;
  const lstProducts = useSelector(state => state?.products?.products?.data);

  const handlePress = () => {
    onCheckedChange(item, !isChecked);
  };

  useEffect(() => {
    if (isChecked) {
      setCheckedProducts(prev => {
        if (!prev.some(cart => cart._id === item._id)) {
          return [...prev, item];
        }
        return prev;
      });
    } else {
      setCheckedProducts(prev => prev.filter(cart => cart._id !== item._id));
    }
  }, [isChecked]);

  const calculateTotalPrice = products => {
    const total = products.reduce((sum, product) => {
      return sum + product.product_id.price * product.quantity;
    }, 0);
    setTotalPrice(total);
  };

  useEffect(() => {
    calculateTotalPrice(checkedProducts);
  }, [checkedProducts]);

  const tangSL = async () => {
    //lstProducts
    setProductQuantity(prev => {
      const newQuantity = prev + 1;
      const productInList = lstProducts.find(
        pd => pd._id === item.product_id._id,
      );

      if (productInList) {
        // Lấy số lượng có sẵn của sản phẩm
        const size = productInList.size.find(
          s => s?.sizeId?._id.toString() === item.size_id._id,
        );
        const availableQuantity = size?.quantity || 0;

        if (newQuantity > availableQuantity) {
          Toast(`${t('toast.max_pd')}`, ToastAndroid.SHORT);
          return prev; // trả về sl hiện tại và không cho tăng tiếp
        }
      }

      // Cập nhật tổng giá khi quantity thay đổi
      const updatedCards = checkedProducts.map(cart =>
        cart._id === item._id ? {...cart, quantity: newQuantity} : cart,
      );
      setCheckedProducts(updatedCards);
      return newQuantity;
    });
  };

  const giamSL = async () => {
    if (productQuantity > 1) {
      setProductQuantity(prev => {
        const newQuantity = prev - 1;
        // Cập nhật danh sách sản phẩm đã chọn
        const updatedCards = checkedProducts.map(cart =>
          cart._id === item._id ? {...cart, quantity: newQuantity} : cart,
        );
        setCheckedProducts(updatedCards);
        return newQuantity;
      });
    } else {
      SweetAlert.showAlertWithOptions(
        {
          title: t('toast.remove_item_cart'),
          subTitle: t('toast.title_item_cart'),
          confirmButtonTitle: 'OK',
          confirmButtonColor: '#000',
          style: 'error',
          cancellable: true,
        },
        () => {
          setProductQuantity(0);
          setCheckedProducts(
            checkedProducts.filter(cart => cart._id !== item._id),
          );
          setCards(cards.filter(cart => cart._id !== item._id));
        },
      );
    }
  };

  useEffect(() => {
    const updateQuantity = async () => {
      try {
        const productData = {
          product_id: item.product_id._id,
          size_id: item.size_id._id,
          quantity: productQuantity,
        };
        const response = await updateCartItem(productData);
        if (response.status) {
          console.log('Cập nhật so luong cart thành công');
        } else {
          console.log('Cập nhật so luong cart thất bại');
        }
      } catch (error) {
        SweetAlert.showAlertWithOptions({
          title: 'Oops...',
          subTitle: t('toast.subTitle_cart'),
          confirmButtonTitle: 'OK',
          confirmButtonColor: '#000',
          style: 'error',
          cancellable: true,
        });
      }
    };

    updateQuantity();
    return () => {};
  }, [productQuantity]);

  const imageAssets =
    item.product_id.assets &&
    item.product_id.assets.filter(asset => {
      return asset.match(/\.(jpeg|jpg|png|gif)$/);
    });

  const imageUrl =
    imageAssets && imageAssets.length > 0 ? imageAssets[0] : null;

  const swipeableRef = useRef(null);

  const deleteItemFromCard = async () => {
    SweetAlert.showAlertWithOptions(
      {
        title: t('toast.remove_item_cart'),
        subTitle: t('toast.title_item_cart'),
        confirmButtonTitle: 'OK',
        confirmButtonColor: '#000',
        style: 'error',
        cancellable: true,
      },
      async () => {
        try {
          const body = {
            product_id: item.product_id._id,
            size_id: item.size_id._id,
          };
          // console.log('body delete cart: ', body);

          const response = await deleteOneItemCard(body);

          if (response.status) {
            setCards(prevCards =>
              prevCards.filter(cart => cart._id !== item._id),
            );
            setCheckedProducts(prevChecked =>
              prevChecked.filter(cart => cart._id !== item._id),
            );
            Toast.show({text1: `${t('toast.del_cart')}`, type: 'success'});
            if (swipeableRef.current) {
              swipeableRef.current.close();
            }
          } else {
            Toast.show({text1: `${t('toast.del_err')}`, type: 'error'});
          }
        } catch (error) {
          console.log('error delete item card->', error);
        }
      },
    );
  };

  const rightSwipeable = () => {
    return (
      <View style={itCart.deleteContainer}>
        <TouchableOpacity onPress={deleteItemFromCard}>
          <Image
            style={appst.icon24}
            source={require('../../assets/icons/cart_del.png')}
          />
        </TouchableOpacity>
      </View>
    );
  };

  // console.log('item', item);
  const [isOutOfStock, setIsOutOfStock] = useState(false);
  useEffect(() => {
    const productInList = lstProducts.find(
      pd => pd._id === item.product_id._id,
    );
    if (productInList) {
      const size = productInList.size.find(
        s => s?.sizeId?._id.toString() === item.size_id._id,
      );
      const availableQuantity = size?.quantity || 0;
      if (availableQuantity <= 0) {
        setIsOutOfStock(true);
      }
    }
  }, [lstProducts, item.product_id._id, item.size_id._id]);

  return (
    <Swipeable
      ref={swipeableRef}
      renderRightActions={rightSwipeable}
      onSwipeableOpen={() => {
        console.log('Swipeable opened');
        if (
          currentlyOpenSwipeable &&
          currentlyOpenSwipeable !== swipeableRef.current
        ) {
          currentlyOpenSwipeable.close();
        }
        setCurrentlyOpenSwipeable(swipeableRef.current);
      }}
      onSwipeableClose={() => {
        console.log('Swipeable closed');
        if (currentlyOpenSwipeable === swipeableRef.current) {
          setCurrentlyOpenSwipeable(null);
        }
      }}>
      <TouchableOpacity
        disabled={isOutOfStock}
        onPress={() =>
          navigation.navigate('ProductDetail', {index: item?.product_id?._id})
        }
        style={itCart.container}>
        <View
          style={[
            itCart.viewContainer,
            appst.rowStart,
            isOutOfStock && {opacity: 0.8, backgroundColor: '#dfdfdf'},
          ]}>
          <TouchableOpacity
            style={isOutOfStock && {opacity: 0.8, backgroundColor: '#dfdfdf'}}
            disabled={isOutOfStock}
            onPress={e => {
              e.stopPropagation();
              handlePress();
            }}>
            <Image
              style={appst.icon24}
              source={
                !isChecked
                  ? require('../../assets/icons/icon_check.png')
                  : require('../../assets/icons/ppd_card_check.png')
              }
            />
          </TouchableOpacity>
          <Image
            style={itCart.image}
            source={{
              uri: imageUrl
                ? imageUrl
                : 'https://i.pinimg.com/236x/6a/f1/ec/6af1ec6645410a41d5339508a83b86f9.jpg',
            }}
          />
          {isOutOfStock ? (
            <View style={[appst.columnSb, itCart.viewQuatity]}>
              <Text numberOfLines={1} style={itCart.name}>
                {item && item.product_id.name}
              </Text>
              <Text style={itCart.price}>
                {lag === 'en' && '$'}
                {item?.product_id?.price &&
                  formatPrice(item?.product_id?.price, lag)}
                {lag === 'vi' && ' VNĐ '}
              </Text>
              <Text style={itCart.price}>{t('products.out_of_product')}</Text>
            </View>
          ) : (
            <View style={[appst.columnSb, itCart.viewQuatity]}>
              <Text numberOfLines={1} style={itCart.name}>
                {item && item.product_id.name}
              </Text>
              <Text style={itCart.price}>
                {lag === 'en' && '$'}
                {item?.product_id?.price &&
                  formatPrice(item?.product_id?.price, lag)}
                {lag === 'vi' && ' VNĐ '}
              </Text>
              <Text style={itCart.price}>
                {t('products.size')}: {item.size_id.name}
              </Text>
              <View
                style={[
                  appst.rowCenter,
                  itCart.view,
                  {pointerEvents: 'box-none'},
                ]}>
                <TouchableOpacity
                  style={{padding: 6}}
                  onPress={e => {
                    e.stopPropagation();
                    tangSL();
                  }}>
                  <Image source={require('../../assets/icons/increase.png')} />
                </TouchableOpacity>
                <Text style={itCart.quatity}>{productQuantity}</Text>
                <TouchableOpacity
                  style={{padding: 6}}
                  onPress={e => {
                    e.stopPropagation();
                    giamSL();
                  }}>
                  <Image source={require('../../assets/icons/decrease.png')} />
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </TouchableOpacity>
    </Swipeable>
  );
};

export default ItemCart;
