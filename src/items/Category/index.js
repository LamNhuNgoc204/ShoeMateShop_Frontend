import {View, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import homeStyle from '../../screens/HomeScreen/style';

const Category = ({category, style, onItemPress}) => {
  return (
    <TouchableOpacity
      onPress={onItemPress}
      style={[homeStyle.categoryItem, homeStyle.marginBottom15, style]}>
      <View style={homeStyle.categoryIconWrapper}>
        <Image source={{uri: category.image}} style={homeStyle.categoryImage} />
      </View>
      <Text style={homeStyle.categoryText}>{category.name}</Text>
    </TouchableOpacity>
  );
};

export default Category;
