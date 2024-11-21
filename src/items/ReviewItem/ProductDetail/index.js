import {View, Text, Image, FlatList} from 'react-native';
import React from 'react';
import pddtit from './style';
import appst from '../../../constants/AppStyle';
import {spacing} from '../../../constants';
import Video from 'react-native-video';

const ItemReview = () => {
  return (
    <View style={pddtit.container}>
      <View style={appst.rowStart}>
        <Image
          style={pddtit.avatar}
          source={require('../../../assets/images/placeholder_image.jpg')}
        />
        <View>
          <Text style={pddtit.name}>User 1</Text>
          <FlatList
            horizontal
            data={[1, 2, 3, 4, 5]}
            renderItem={({item}) => {
              return (
                <View style={{marginRight: spacing.xm}}>
                  <Image
                    style={appst.icon10}
                    source={require('../../../assets/icons/star.png')}
                  />
                </View>
              );
            }}
          />
        </View>
      </View>
      <View style={[appst.rowStart, pddtit.body1]}>
        <View style={pddtit.avatar} />
        <View style={pddtit.flex}>
          <Text style={pddtit.size}>Size: 38</Text>
          <Text style={pddtit.descript} numberOfLines={4}>
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout. The point
            of using Lorem Ipsum is that it has a more-or-less normal
            distribution of......
          </Text>
          <View style={[appst.rowStart, pddtit.body2]}>
            <Video
              source={{
                uri: 'https://media.istockphoto.com/id/1020236082/vi/video/c%C3%B4-g%C3%A1i-ng%E1%BB%93i-trong-%C4%91%C6%B0%E1%BB%9Dng-m%C3%B2n-ch%E1%BB%9D-%C4%91%E1%BB%A3i-m%E1%BB%99t-ng%C6%B0%E1%BB%9Di-ph%E1%BB%A5-n%E1%BB%AF-v%C3%A0-c%C3%B4-b%E1%BA%AFt-%C4%91%E1%BA%A7u-%C4%91i-b%E1%BB%99.mp4?s=mp4-640x640-is&k=20&c=5i-gC0iJ-Z3Qa1QQ5U2AcOfwGdmDCeTZfBml_GDpVzI=',
              }}
              style={pddtit.image}
              controls={true}
              resizeMode="cover"
            />
            <FlatList
              style={pddtit.flat}
              data={[1, 2, 3, 4]}
              horizontal
              scrollEnabled={false}
              renderItem={({item}) => (
                <Image
                  style={pddtit.image}
                  source={require('../../../assets/images/banner2.jpg')}
                />
              )}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default ItemReview;
