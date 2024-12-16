import {
  View,
  Text,
  FlatList,
  Image,
  ScrollView,
  RefreshControl,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import ratingst from './style';
import RatingItem from '../../items/ReviewItem/ToRateItem';
import appst from '../../constants/AppStyle';
import {useTranslation} from 'react-i18next';
import {getUnreviewedProductsInOrder} from '../../api/ProductApi';
import SkeletonToRating from '../../placeholders/reviews/SkeletonToRating';

const ToRate = () => {
  const {t} = useTranslation();
  const [loading, setLoading] = useState(false);
  const [filteredRating, setfilteredRating] = useState([]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await getUnreviewedProductsInOrder();
      if (response) {
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

  useEffect(() => {
    fetchData();
  }, []);

  // console.log('rating: ', rating);
  const [refreshing, setRefreshing] = useState(false);
  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  };

  return (
    <ScrollView
      style={appst.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }>
      {loading ? (
        <SkeletonToRating />
      ) : (
        <>
          {filteredRating.length !== 0 ? (
            <>
              <View>
                <FlatList
                  style={[ratingst.flatRate]}
                  data={filteredRating}
                  renderItem={({item}) => <RatingItem item={item} />}
                  keyExtractor={item => item._id.toString()}
                  scrollEnabled={false}
                />
              </View>
              <Text style={ratingst.textRate}>{t('review.not_found')}</Text>
            </>
          ) : (
            <View style={[appst.center, {paddingVertical: 50}]}>
              <Image
                source={require('../../assets/icons/blank_review.png')}
                style={{width: 60, height: 60}}
              />
              <Text
                style={{
                  fontSize: 16,
                  color: 'black',
                  marginTop: 10,
                  fontWeight: '500',
                }}>
                {t('review.blank_review')}
              </Text>
            </View>
          )}
        </>
      )}
    </ScrollView>
  );
};

export default ToRate;
