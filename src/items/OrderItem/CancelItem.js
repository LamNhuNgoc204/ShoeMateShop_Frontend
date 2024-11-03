import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import appst from '../../constants/AppStyle';
import {colors} from '../../constants/colors';
import {useTranslation} from 'react-i18next';

const CancelItem = ({item}) => {
  const {t} = useTranslation();
  const data = item.item && item.item.product;
  console.log('CancelItem ==> ', data);

  return (
    <View style={[appst.rowStart, st.container]}>
      <Image
        source={
          data.pd_image && data.pd_image[0]
            ? {uri: data.pd_image && data.pd_image[0]}
            : require('../../assets/images/placeholder_image.jpg')
        }
        style={st.img}
      />
      <View style={st.view1}>
        <Text numberOfLines={1} style={st.text}>
          {data.name}
        </Text>
        <Text style={st.text}>
          {t('products.price')}: {data.price}
        </Text>
        <Text style={st.text}>
          {t('products.size')}: {data.size_name}
        </Text>
        <Text style={st.text}>
          {t('products.quantity')}: {data.pd_quantity}
        </Text>
      </View>
    </View>
  );
};

export default CancelItem;

const st = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: colors.background_secondary,
    marginVertical: 5,
    borderRadius: 10,
  },
  img: {
    width: 70,
    height: 70,
  },
  view1: {
    marginLeft: 10,
  },
  text: {
    color: colors.color1A2530,
  },
});
