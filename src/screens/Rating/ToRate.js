import {View, Text, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import ratingst from './style';
import RatingItem from '../../items/ReviewItem/ToRateItem';
import appst from '../../constants/AppStyle';
import {useTranslation} from 'react-i18next';
import {getUnreviewedProductsInOrder} from '../../api/ProductApi';
import SkeletonToRating from '../../placeholders/reviews/SkeletonToRating';

const ToRate = ({navigation}) => {
  const {t} = useTranslation();
  const [rating, setRating] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filteredRating, setfilteredRating] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getUnreviewedProductsInOrder();
        if (response) {
          setRating(response?.reverse());
          const filteredRatings = response.filter(
            order => order.product?.length > 0,
          );
          setfilteredRating(filteredRatings.reverse());
        }
      } catch (error) {
        console.log('Get un review: ', error);
        setLoading(true);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  console.log('rating: ', rating);

  return (
    <View style={appst.container}>
      {loading ? (
        <SkeletonToRating />
      ) : (
        <>
          {filteredRating.length !== 0 ? (
            <>
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
            </>
          ) : (
            <>
              <Text>Khong cos sp</Text>
            </>
          )}
        </>
      )}
    </View>
  );
};

export default ToRate;
