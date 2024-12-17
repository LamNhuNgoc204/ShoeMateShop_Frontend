import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ToastAndroid,
  ScrollView,
} from 'react-native';
import {cartst} from './style';
import {spacing} from '../../constants';
import Header from '../../components/Header';
import appst from '../../constants/AppStyle';
import {CustomedButton} from '../../components';
import ItemCart from '../../items/CartItem/ItemCart';
import {clearCart, getUserCard} from '../../api/CartApi';
import {useDispatch, useSelector} from 'react-redux';
import {setOrderData, setToltalPrice} from '../../redux/reducer/cartReducer';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import CartPlaceholder from '../../placeholders/product/cart';
import ProductList from '../Product/ProductList';
import {formatPrice} from '../../utils/functions/formatData';
import SweetAlert from 'react-native-sweet-alert';
import Toast from 'react-native-toast-message';

const CartScreen = () => {
  const navigation = useNavigation();
  const {t, i18n} = useTranslation();
  const lag = i18n.language;
  const [cards, setCards] = useState([]);
  const [currentlyOpenSwipeable, setCurrentlyOpenSwipeable] = useState(null);
  const dispatch = useDispatch();
  const productState = useSelector(state => state.products);
  const [totalPrice, setTotalPrice] = useState(0);
  const [checkedProducts, setCheckedProducts] = useState([]);
  const [isAllChecked, setIsAllChecked] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const isTokenValid = useSelector(state => state?.user?.isValidToken);

  const fetchCard = async () => {
    try {
      setLoading(false);
      setRefreshing(true);
      const response = await getUserCard();
      if (response.status) {
        setCards(response.data);
        setCheckedProducts([]);
        setIsAllChecked(false);
        setLoading(true);
      }
    } catch (error) {
      console.log('error', error);
      setLoading(true);
    } finally {
      setRefreshing(false);
      setLoading(true);
    }
  };

  // Sử dụng useFocusEffect để gọi lại API mỗi khi màn hình được mount
  useFocusEffect(
    React.useCallback(() => {
      if (isTokenValid) {
        fetchCard();
      }
    }, []),
  );

  // console.log('cards', cards);

  // Xử lý chọn hoặc bỏ chọn tất cả
  const handleSelectAll = () => {
    if (isAllChecked) {
      setCheckedProducts([]);
      setTotalPrice(0);
    } else {
      setCheckedProducts(cards);
      const total = cards.reduce(
        (sum, item) => sum + item.product_id.price * item.quantity,
        0,
      );
      setTotalPrice(total);
    }
    setIsAllChecked(!isAllChecked);
  };

  const handleCheckedChange = (item, isChecked) => {
    setCheckedProducts(prev => {
      if (isChecked) {
        return [...prev, item];
      }
      return prev.filter(cart => cart._id !== item._id);
    });
  };

  // Cập nhật isAllChecked khi checkedProducts thay đổi
  useEffect(() => {
    const allChecked =
      checkedProducts.length === cards.length && cards.length > 0;
    setIsAllChecked(allChecked);
  }, [checkedProducts, cards]);

  // Tính tổng sản phẩm được chọn
  useEffect(() => {
    const total = checkedProducts.reduce(
      (sum, item) => sum + item.product_id.price * item.quantity,
      0,
    );
    setTotalPrice(total);
  }, [checkedProducts]);

  const handleOrder = () => {
    if (checkedProducts.length == 0) {
      Toast.show({
        text1: `${t('toast.choose_pd')}`,
        type: 'success',
        position: 'bottom',
      });
    } else {
      dispatch(setOrderData(checkedProducts));
      dispatch(setToltalPrice(totalPrice));
      navigation.navigate('CheckOutScreen');
    }
  };

  const handleDeleteAllCart = async () => {
    SweetAlert.showAlertWithOptions(
      {
        title: t('toast.del_carts'),
        subTitle: t('toast.del_cart_title'),
        confirmButtonTitle: 'OK',
        confirmButtonColor: '#000',
        style: 'error',
        cancellable: true,
      },
      async () => {
        try {
          const res = await clearCart();
          if (res) {
            setCards([]);
            Toast.show({
              text1: `${t('toast.del_all_cart')}`,
              type: 'success',
              position: 'bottom',
            });
          } else {
            Toast.show({
              text1: `${t('toast.del_err')}`,
              type: 'error',
              position: 'bottom',
            });
          }
        } catch (error) {
          console.log('Lỗi xóa giỏ hàng: ', error);
        }
      },
    );
  };

  return (
    <View style={[appst.container, cartst.container]}>
      <View style={cartst.header}>
        <Header
          leftOnPress={() => navigation.goBack()}
          background={'#fff'}
          iconLeft={require('../../assets/icons/back.png')}
          iconRight={require('../../assets/icons/del_card.png')}
          rightOnPress={handleDeleteAllCart}
          name={t('home.cart')}
        />
      </View>
      {isTokenValid ? (
        <>
          {loading ? (
            <View style={[cartst.viewBody, {flex: 1}]}>
              <Text style={cartst.text1}>
                {cards && cards.length} {t('home.item')}
              </Text>
              {cards.length === 0 ? (
                <ScrollView>
                  <Image
                    style={cartst.placeholder}
                    source={require('../../assets/images/shopping.jpg')}
                  />
                  <TouchableOpacity
                    style={{marginBottom: 20}}
                    onPress={() =>
                      navigation.reset({
                        index: 0,
                        routes: [{name: 'BottomNav'}],
                      })
                    }>
                    <Text style={cartst.text}>{t('cart.sub_title')}</Text>
                  </TouchableOpacity>

                  <ProductList listProduct={productState?.products?.data} />
                </ScrollView>
              ) : (
                <FlatList
                  style={cartst.flat}
                  data={cards}
                  renderItem={({item}) => (
                    <ItemCart
                      item={item}
                      setCards={setCards}
                      cards={cards}
                      setTotalPrice={setTotalPrice}
                      checkedProducts={checkedProducts}
                      setCheckedProducts={setCheckedProducts}
                      currentlyOpenSwipeable={currentlyOpenSwipeable}
                      setCurrentlyOpenSwipeable={setCurrentlyOpenSwipeable}
                      isChecked={checkedProducts.some(
                        cart => cart._id === item._id,
                      )}
                      onCheckedChange={handleCheckedChange}
                    />
                  )}
                  extraData={item => item.id}
                  ItemSeparatorComponent={
                    <View style={{marginBottom: spacing.sm}} />
                  }
                  showsVerticalScrollIndicator={false}
                  onRefresh={fetchCard}
                  refreshing={refreshing}
                />
              )}
            </View>
          ) : (
            <CartPlaceholder />
          )}
          <View style={cartst.viewFooter}>
            <View style={[appst.rowCenter]}>
              <View style={appst.rowCenter}>
                <TouchableOpacity onPress={handleSelectAll}>
                  <Image
                    style={appst.icon24}
                    source={
                      isAllChecked
                        ? require('../../assets/icons/ppd_card_check.png')
                        : require('../../assets/icons/icon_check.png')
                    }
                  />
                </TouchableOpacity>
                <Text style={cartst.text6}>{t('home.all_product')}</Text>
              </View>
              <View style={[appst.rowCenter]}>
                <Text style={cartst.text2}>{t('home.total')}: </Text>
                <Text style={cartst.text3}>
                  {lag === 'en' && '$'}
                  {totalPrice ? formatPrice(totalPrice, lag) : 0}
                  {lag === 'vi' && ' VNĐ '}
                </Text>
                <View>
                  <CustomedButton
                    title={t('buttons.btn_checkout')}
                    style={cartst.btCheckout}
                    titleStyle={cartst.textTouch}
                    onPress={() => handleOrder()}
                  />
                </View>
              </View>
            </View>
          </View>
        </>
      ) : (
        <View style={cartst.container2}>
          <Image
            style={cartst.icon}
            source={require('../../assets/icons/start_shopping.png')}
          />
          <Text style={cartst.text4}>
            {t('cart.sub_title1')}.{' '}
            <Text
              onPress={() => navigation.replace('LoginScreen')}
              style={cartst.text5}>
              {t('buttons.btn_signin')}
            </Text>
          </Text>
        </View>
      )}
    </View>
  );
};

export default CartScreen;
