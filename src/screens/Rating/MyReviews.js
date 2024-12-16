import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from 'react-native';
import appst from '../../constants/AppStyle';
import MyReviewItem from '../../items/ReviewItem/MyReviewsItem';
import mrvit from '../../items/ReviewItem/MyReviewsItem/style';
import ratingst from './style';
import {getAllUserReview} from '../../api/reviewAPI';
import SkeletonToRating from '../../placeholders/reviews/SkeletonToRating';
import {useTranslation} from 'react-i18next';

const MyReviews = () => {
  const {t} = useTranslation();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await getAllUserReview();
      if (response) {
        setData(response);
        setLoading(false);
      }
    } catch (error) {
      console.log('Không lấy được dữ liệu: ', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // console.log('user review', data);
  const [refreshing, setRefreshing] = useState(false);
  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  };

  return (
    <ScrollView
      style={[appst.container, mrvit.container]}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }>
      {loading ? (
        <SkeletonToRating />
      ) : (
        <>
          {data.length !== 0 ? (
            <View>
              <FlatList
                data={data}
                renderItem={({item}) => <MyReviewItem item={item} />}
                keyExtractor={item => item._id.toString()}
              />
            </View>
          ) : (
            <View style={mrvit.viewBuying}>
              <Image
                style={mrvit.buying}
                source={require('../../assets/images/buying_review.png')}
              />
              <Text style={ratingst.textRate}>{t('review.not_found')}</Text>
            </View>
          )}
        </>
      )}
    </ScrollView>
  );
};

export default MyReviews;
