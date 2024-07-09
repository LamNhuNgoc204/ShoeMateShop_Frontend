import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import appst from '../../constants/AppStyle';
import rvst from './style';
import Header from '../../components/Header';
import StarRating from '../../items/StarRating';

const Review = ({navitaion}) => {
  const [rating, setRating] = useState(0);

  const handleStarPress = rating => {
    setRating(rating);
  };

  const [text, setText] = useState('');

  return (
    <View style={[appst.container, rvst.container]}>
      <Header
        name={'Review'}
        iconLeft={require('../../assets/icons/back.png')}
      />
      <View style={[rvst.itemPd]}>
        <Image
          style={rvst.imgPd}
          source={require('../../assets/images/banner3.jpg')}
        />
        <View>
          <View style={rvst.viewContent}>
            <Text style={rvst.name}>Nike Aiforce I</Text>
            <Text style={rvst.size}>Size: 32</Text>
          </View>
        </View>
      </View>

      <View style={[rvst.viewStar, appst.rowStart]}>
        <Text style={rvst.quality}>Product Quality:</Text>
        <StarRating
          maxStars={5}
          rating={rating}
          onStarPress={handleStarPress}
        />
      </View>

      <View style={[appst.rowCenter, rvst.viewAsset]}>
        <TouchableOpacity style={[rvst.viewBorder]}>
          <Image source={require('../../assets/icons/addphoto.png')} />
          <Text style={rvst.text}>Add photos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[rvst.viewBorder]}>
          <Image source={require('../../assets/icons/addvideo.png')} />
          <Text style={rvst.text}>Add video</Text>
        </TouchableOpacity>
      </View>

      <View>
        <FlatList
          style={rvst.flatImg}
          data={[1, 2, 3]}
          horizontal={true}
          renderItem={({item}) => (
            <View style={rvst.imgContainer}>
              <Image
                style={rvst.imgRate}
                source={require('../../assets/images/onboard3.png')}
              />
              <TouchableOpacity style={rvst.pressImg}>
                <Image
                  style={appst.icon10}
                  source={require('../../assets/icons/del_img.png')}
                />
              </TouchableOpacity>
            </View>
          )}
        />
      </View>

      <TextInput
        style={rvst.input}
        multiline={true}
        onChangeText={e => setText(e)}
        value={text}
        placeholder="Enter your review here..."
      />
    </View>
  );
};

export default Review;
