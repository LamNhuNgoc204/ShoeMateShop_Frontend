import React from 'react';
import {FlatList, Image, Text, View} from 'react-native';
import appst from '../../constants/AppStyle';
import MyReviewItem from '../../items/ReviewItem/MyReviewsItem';
import mrvit from '../../items/ReviewItem/MyReviewsItem/style';
import ratingst from './style';

const MyReviews = () => {
  const data = [1, 2, 3, 4, 5, 6];

  return (
    <View style={[appst.container, mrvit.container]}>
      {data.length != 0 ? (
        <View>
          <View>
            <FlatList
              data={data}
              renderItem={({item}) => <MyReviewItem item={item} />}
              extraData={item => item.id}
            />
          </View>
        </View>
      ) : (
        <View style={mrvit.viewBuying}>
          <Image
            style={mrvit.buying}
            source={require('../../assets/images/buying_review.png')}
          />
          <Text style={ratingst.textRate}>No more ratings found.</Text>
        </View>
      )}
    </View>
  );
};

export default MyReviews;
