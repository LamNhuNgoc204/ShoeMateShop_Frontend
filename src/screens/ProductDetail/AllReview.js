import {View, FlatList} from 'react-native';
import React from 'react';
import Header from '../../components/Header';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import ItemReview from '../../items/ReviewItem/ProductDetail';
import {gotoCart} from '../../utils/functions/navigationHelper';

const AllReview = ({route}) => {
  const {lstReview} = route.params;
  const navigation = useNavigation();
  const {t} = useTranslation();

  // console.log('AllReview', lstReview);

  return (
    <View>
      <Header
        iconLeft={require('../../assets/icons/back.png')}
        leftOnPress={() => navigation.goBack()}
        name={t('review.all_review')}
        rightOnPress={() => gotoCart()}
        iconRight={require('../../assets/icons/mycart.png')}
        backgroundColor={'#fff'}
      />
      <FlatList
        data={lstReview}
        renderItem={({item}) => <ItemReview item={item} />}
        keyExtractor={item => item._id}
      />
    </View>
  );
};

export default AllReview;
