import React, {useState} from 'react';
import {View, TouchableOpacity, Image} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {spacing} from '../../constants';

const StarRating = ({maxStars, rating, onStarPress}) => {
  const starIcons = [];
  const [selectedStars, setSelectedStars] = useState(rating);

  const handleStarPress = starPosition => {
    setSelectedStars(starPosition);
    onStarPress(starPosition);
  };

  for (let i = 1; i <= maxStars; i++) {
    starIcons.push(
      <TouchableOpacity
        key={i}
        onPress={() => handleStarPress(i)}
        style={{marginRight: spacing.sm}}>
        <Image
          style={{width: 20, height:20}}
          source={
            i <= selectedStars
              ? require('../../assets/icons/stars.png')
              : require('../../assets/icons/star_gr.png')
          }
        />
      </TouchableOpacity>,
    );
  }

  return <View style={{flexDirection: 'row'}}>{starIcons}</View>;
};

export default StarRating;
