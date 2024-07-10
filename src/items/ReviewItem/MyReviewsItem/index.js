import {
  View,
  Text,
  Image,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import mrvit from './style';
import appst from '../../../constants/AppStyle';

const MyReviewItem = () => {
  const ArrayRating = length => {
    let arr = [];
    for (let i = 0; i < length; i++) {
      arr.push(i);
    }
    return arr;
  };

  const images = [
    {
      uri: 'https://i.pinimg.com/236x/73/45/82/734582c9077c5dd4b4181e6911e980c3.jpg',
      type: 'video',
      duration: '0:14',
    },
    {
      uri: 'https://i.pinimg.com/236x/73/45/82/734582c9077c5dd4b4181e6911e980c3.jpg',
    },
    {
      uri: 'https://i.pinimg.com/236x/73/45/82/734582c9077c5dd4b4181e6911e980c3.jpg',
    },
    {
      uri: 'https://i.pinimg.com/236x/73/45/82/734582c9077c5dd4b4181e6911e980c3.jpg',
    },
  ];

  return (
    <View style={[mrvit.itemContainer]}>
      <Image
        style={mrvit.avatar}
        source={require('../../../assets/images/onboard2.png')}
      />
      <View style={mrvit.body}>
        <View style={mrvit.viewInf}>
          <Text style={mrvit.name}>User 1</Text>
          <View style={mrvit.viewRate}>
            {ArrayRating(4).map(index => (
              <Image
                key={index}
                style={mrvit.icon}
                source={require('../../../assets/icons/stars.png')}
              />
            ))}
          </View>
        </View>

        <Text style={mrvit.time}>12/03/2024 12:40</Text>
        <Text style={mrvit.time}>Size: 32</Text>
        <Text style={mrvit.content}>
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout. The point of
          using Lorem Ipsum is that it has a more-or-less normal distribution
          of......
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={mrvit.imgContainer}>
          {images.map((item, index) => (
            <View key={index} style={mrvit.imageContainer}>
              <Image source={{uri: item.uri}} style={mrvit.imageRv} />
              {item.type === 'video' && (
                <View style={mrvit.videoOverlay}>
                  <Text style={mrvit.videoDuration}>{item.duration}</Text>
                </View>
              )}
            </View>
          ))}
        </ScrollView>

        <View style={mrvit.viewRp}>
          <Text style={mrvit.response}>Seller Response:</Text>
          <Text style={mrvit.rpContent}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </Text>
        </View>

        <TouchableOpacity style={[appst.rowStart, mrvit.item]}>
          <Image
            style={mrvit.imageRv}
            source={require('../../../assets/images/onboard3.png')}
          />
          <Text style={mrvit.pdName}>
            Neque porro quisquam est qui dolorem ipsum quia dolor sit amet
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MyReviewItem;
