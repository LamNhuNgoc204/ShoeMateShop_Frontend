import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {View, Text, FlatList, TouchableOpacity, Image} from 'react-native';
import {cartst} from './style';
import {spacing} from '../../constants';
import Header from '../../components/Header';
import appst from '../../constants/AppStyle';
import {CustomedButton} from '../../components';
import ItemCart from '../../items/CartItem/ItemCart';
import {getUserCard} from '../../api/CartApi';

const CartScreen = ({navigation}) => {
  const {t} = useTranslation();
  const [currentlyOpenSwipeable, setCurrentlyOpenSwipeable] = useState(null);
  const [cards, setCards] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [checkedProducts, setCheckedProducts] = useState([]);
  const [isAllChecked, setIsAllChecked] = useState(false);

  useEffect(() => {
    const fetchCard = async () => {
      try {
        const response = await getUserCard();
        if (response.status) {
          setCards(response.data);
          setCheckedProducts([]);
          setIsAllChecked(false);
        }
      } catch (error) {
        console.log('error', error);
      }
    };

    fetchCard();
  }, []);
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

  console.log('checkedProducts', checkedProducts);

  return (
    <View style={[appst.container, cartst.container]}>
      <View style={cartst.header}>
        <Header
          leftOnPress={() => navigation.goBack()}
          background={'#fff'}
          iconLeft={require('../../assets/icons/back.png')}
          iconRight={require('../../assets/icons/del_card.png')}
          name={t('home.cart')}
        />
      </View>
      <View style={cartst.viewBody}>
        <Text style={cartst.text1}>
          {cards && cards.length} {t('home.item')}
        </Text>
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
              isChecked={checkedProducts.some(cart => cart._id === item._id)}
              onCheckedChange={handleCheckedChange}
            />
          )}
          extraData={item => item.id}
          ItemSeparatorComponent={<View style={{marginBottom: spacing.sm}} />}
          showsVerticalScrollIndicator={false}
        />
      </View>
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
              ${totalPrice.toLocaleString('vi-VN')}
            </Text>
            <View>
              <CustomedButton
                title={t('buttons.btn_checkout')}
                style={cartst.btCheckout}
                titleStyle={cartst.textTouch}
                onPress={() =>
                  navigation.navigate('CheckOutScreen', {
                    checkedProducts,
                    totalPrice,
                  })
                }
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default CartScreen;
