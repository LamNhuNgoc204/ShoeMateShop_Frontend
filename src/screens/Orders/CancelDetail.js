import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import appst from '../../constants/AppStyle';
import Header from '../../components/Header';
import {useTranslation} from 'react-i18next';
import {colors} from '../../constants/colors';
import CancelItem from '../../items/OrderItem/CancelItem';

const CancelDetail = ({navigation}) => {
  const {t} = useTranslation();

  return (
    <View style={st.container}>
      <Header
        backgroundColor={'white'}
        name={t('orders.cancel_detail')}
        iconLeft={require('../../assets/icons/back.png')}
        leftOnPress={() => navigation.goBack()}
      />
      <ScrollView style={{flex: 1, marginHorizontal: 5}}>
        <View style={st.view1}>
          <View>
            <Text style={st.txt1}>{t('orders.complete_cancel')}</Text>
            <Text>{t('orders.in')} 192823823</Text>
            <Text>{t('orders.Canceler')} ban</Text>
          </View>
          <Image
            source={require('../../assets/images/icon_cacelorder.png')}
            style={st.img}
          />
        </View>

        <View style={st.view3}>
          <Text style={{}}>Thông tin vận chuyển</Text>
        </View>

        <View style={st.view2}>
          <Text style={st.txt2}>{t('review.product')}</Text>
          <FlatList data={[1, 2]} renderItem={item => <CancelItem />} />
        </View>
      </ScrollView>
    </View>
  );
};

export default CancelDetail;

const st = StyleSheet.create({
  view3: {
    backgroundColor: 'white',
    borderRadius: 10,
    paddingVertical: 10,
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
    paddingVertical: 10,
    marginTop: 5,
    borderRadius: 10,
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
  },
});
