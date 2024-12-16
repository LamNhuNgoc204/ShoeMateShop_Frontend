import React, {useEffect, useState} from 'react';
import {FlatList, Image, Text, View} from 'react-native';
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

  useEffect(() => {
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

    fetchData();
  }, []);

  console.log('user review', data);

  return (
    <View style={[appst.container, mrvit.container]}>
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
    </View>
  );
};

export default MyReviews;
