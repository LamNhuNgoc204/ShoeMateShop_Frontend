import {View, Text, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import ratingst from './style';
import RatingItem from '../../items/ReviewItem/ToRateItem';
import appst from '../../constants/AppStyle';
import {useTranslation} from 'react-i18next';
import {getUnreviewedProductsInOrder} from '../../api/ProductApi';

const ToRate = ({navigation}) => {
  const {t} = useTranslation();
  const [rating, setRating] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUnreviewedProductsInOrder();
        if (response) {
          setRating(response?.reverse());
          setLoading(true);
        }
      } catch (error) {
        console.log('Get un review: ', error);
        setLoading(true);
      }
    };
    fetchData();
  }, []);

  console.log('rating: ', rating);

  return (
    <View style={appst.container}>
      <View>
        <FlatList
          style={ratingst.flatRate}
          data={rating}
          renderItem={({item}) => <RatingItem item={item} />}
          keyExtractor={item => item._id.toString()}
          scrollEnabled={false}
        />
      </View>
      <Text style={ratingst.textRate}>{t('review.not_found')}</Text>
    </View>
  );
};

export default ToRate;
