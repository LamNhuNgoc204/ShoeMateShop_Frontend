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
  const [checkedProducts, setCheckedProducts] = useState([]);

  useEffect(() => {
    const fetchCard = async () => {
      try {
        const response = await getUserCard();
        if (response.status) {
          setCards(response.data);
        }
      } catch (error) {
        console.log('error', error);
      }
    };

    fetchCard();
  }, []);
  console.log('cards', cards);

  return (
    <View style={[appst.container, cartst.container]}>
      <View style={cartst.header}>
        <Header
          leftOnPress={() => navigation.goBack()}
          background={'#fff'}
          iconLeft={require('../../assets/icons/back.png')}
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
              checkedProducts={checkedProducts}
              setCheckedProducts={setCheckedProducts}
              currentlyOpenSwipeable={currentlyOpenSwipeable}
              setCurrentlyOpenSwipeable={setCurrentlyOpenSwipeable}
            />
          )}
          extraData={item => item.id}
          ItemSeparatorComponent={<View style={{marginBottom: spacing.sm}} />}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <View style={cartst.viewFooter}>
        <View style={appst.rowCenter}>
          <Text style={cartst.text2}>{t('home.subtotal')}</Text>
          <Text style={cartst.text3}>$753.95</Text>
        </View>
        <View style={[appst.rowCenter, cartst.borderBottom]}>
          <Text style={cartst.text2}>{t('home.delivery')}</Text>
          <Text style={cartst.text3}>$60.2</Text>
        </View>
        <View style={[appst.rowCenter, cartst.view1]}>
          <Text style={cartst.text4}>{t('home.total')}</Text>
          <Text style={cartst.text5}>$814.15</Text>
        </View>
        <View style={[appst.rowCenter]}>
          <View style={appst.rowCenter}>
            <TouchableOpacity>
              <Image
                style={appst.icon24}
                source={require('../../assets/icons/icon_check.png')}
              />
            </TouchableOpacity>
            <Text style={cartst.text6}>{t('home.all_product')}</Text>
          </View>
          <CustomedButton
            title={t('buttons.btn_checkout')}
            style={cartst.btCheckout}
            titleStyle={cartst.textTouch}
            onPress={() => navigation.navigate('CheckOutScreen')}
          />
        </View>
      </View>
    </View>
  );
};

export default CartScreen;
