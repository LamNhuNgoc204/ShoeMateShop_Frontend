import {View, Text, FlatList} from 'react-native';
import React from 'react';
import ratingst from './style';
import RatingItem from '../../items/ReviewItem/ToRateItem';
import appst from '../../constants/AppStyle';

const ToRate = () => {
  return (
    <View style={appst.container}>
      <View>
      <FlatList
        style={ratingst.flatRate}
        data={[1]}
        renderItem={({item}) => <RatingItem item={item} />}
        extraData={item => item.id}
        scrollEnabled={false}
      />
      </View>
      <Text style={ratingst.textRate}>No more ratings found.</Text>
    </View>
  );
};

export default ToRate;
