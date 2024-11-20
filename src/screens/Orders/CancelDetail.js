import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import appst from '../../constants/AppStyle';
import Header from '../../components/Header';
import {useTranslation} from 'react-i18next';
import {colors} from '../../constants/colors';
import CancelItem from '../../items/OrderItem/CancelItem';
import {oddt} from '../OrderDetail/style';
import {formatDate} from '../../utils/functions/formatData';
import odit from '../../items/OrderItem/style';
import {useSelector} from 'react-redux';
import {odst} from './style';
import ProductItem from '../../items/ProductItem';
import ProductList from '../Product/ProductList';

const CancelDetail = ({navigation, route}) => {
  const {t} = useTranslation();
  const {item} = route.params;
  const products = useSelector(state => state.products);

  //   console.log('cancel item', item);
  //   console.log(
  //     'item.orderDetails && item.orderDetails.product',
  //     item.orderDetails,
  //   );

  return (
    <View style={st.container}>
      <Header
        backgroundColor={'white'}
        name={t('orders.cancel_detail')}
        iconLeft={require('../../assets/icons/back.png')}
        leftOnPress={() => navigation.goBack()}
      />
      <ScrollView style={{flex: 1}}>
        <View style={st.view1}>
          <View>
            <Text style={st.txt1}>{t('orders.complete_cancel')}</Text>
            <Text>{t('orders.in')} 192823823</Text>
          </View>
          <Image
            source={require('../../assets/images/icon_cacelorder.png')}
            style={st.img}
          />
        </View>

        <View style={st.view3}>
          <Text style={st.text4}>{t('ship.infor')}</Text>
          <View style={oddt.row}>
            <Image
              source={require('../../assets/icons/location.png')}
              style={oddt.location}
            />
            <View>
              <Text style={oddt.text1}>{t('checkout.address')}:</Text>
              <Text>
                <Text style={oddt.text2}>
                  <Text style={oddt.text3}>
                    {item.receiver} | {item.receiverPhone}
                  </Text>{' '}
                  {'\n'}
                  {item.address}
                </Text>
              </Text>
            </View>
          </View>
        </View>

        <View style={st.view2}>
          <Text style={st.txt2}>{t('review.product')}</Text>
          <FlatList
            data={item.orderDetails}
            scrollEnabled={false}
            renderItem={pd => <CancelItem item={pd} />}
          />
        </View>

        <View style={st.view4}>
          <View style={st.viewSB}>
            <Text>{t('orders.code')}</Text>
            <Text>{item._id && item._id.toUpperCase()}</Text>
          </View>

          <View style={st.viewSB}>
            <Text>{t('orders.create_at')}</Text>
            <Text>
              {item.timestamps &&
                item.timestamps.placedAt &&
                formatDate(item.timestamps.placedAt)}
            </Text>
          </View>
          <View style={st.viewSB}>
            <Text>{t('orders.requested_by')}</Text>
            <Text>
              {item.timestamps &&
                item.timestamps.placedAt &&
                formatDate(item.timestamps.placedAt)}
            </Text>
          </View>
          <View style={st.viewSB}>
            <Text>{t('orders.creater_by')}</Text>
            <Text>
              {item.timestamps &&
                item.timestamps.placedAt &&
                formatDate(item.timestamps.placedAt)}
            </Text>
          </View>
          <View style={st.viewSB}>
            <Text>{t('orders.reason')}</Text>
            <Text>
              {item.timestamps &&
                item.timestamps.placedAt &&
                formatDate(item.timestamps.placedAt)}
            </Text>
          </View>
          <View style={st.viewSB}>
            <Text>{t('setting.payment')}</Text>
            <Text>
              {item.timestamps &&
                item.timestamps.placedAt &&
                formatDate(item.timestamps.placedAt)}
            </Text>
          </View>
        </View>

        <View style={st.view5}>
          <ProductList listProduct={products.products} />
        </View>
      </ScrollView>
      <TouchableOpacity
        style={[odit.press, {marginHorizontal: 10, paddingVertical: 5}]}>
        <Text style={odit.textTouch}>{t('buttons.btn_buy_again')}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CancelDetail;

const st = StyleSheet.create({
  text5: {fontSize: 16, marginHorizontal: 5, color: 'black'},
  view5: {
    marginTop: 10,
    borderRadius: 10,
    backgroundColor: 'white',
    paddingTop: 20,
  },
  viewSB: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  view4: {
    marginTop: 10,
    backgroundColor: 'white',
    marginHorizontal: 10,
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  text4: {
    marginBottom: 10,
    marginHorizontal: 20,
    fontSize: 16,
    textDecorationLine: 'underline',
    color: 'black',
  },
  view3: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginHorizontal: 10,
    paddingVertical: 10,
    marginTop: 10,
  },
  txt2: {
    fontSize: 16,
    color: 'black',
    textDecorationLine: 'underline',
  },
  container: {
    flex: 1,
    backgroundColor: colors.background_secondary,
  },
  view1: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginTop: 10,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  img: {
    width: 50,
    height: 50,
  },
  txt1: {
    color: colors.primary,
    fontSize: 18,
  },
  view2: {
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    marginHorizontal: 10,
  },
});
