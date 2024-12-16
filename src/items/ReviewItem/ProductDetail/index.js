import {View, Text, Image, FlatList, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import pddtit from './style';
import appst from '../../../constants/AppStyle';
import {spacing} from '../../../constants';
import Video from 'react-native-video';
import {useTranslation} from 'react-i18next';
import {colors} from '../../../constants/colors';

const ItemReview = ({item}) => {
  // console.log('item', item);
  const user = item?.reviewer_id;
  const {t} = useTranslation();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isResponseVisible, setIsResponseVisible] = useState(false);

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  const toggleResponseVisibility = () => {
    setIsResponseVisible(!isResponseVisible);
  };

  return (
    <View style={pddtit.container}>
      <View style={appst.rowStart}>
        <Image
          style={pddtit.avatar}
          source={
            user?.avatar
              ? {uri: user?.avatar}
              : require('../../../assets/images/placeholder_image.jpg')
          }
        />
        <View>
          <Text style={pddtit.name}>{user?.name}</Text>
          <FlatList
            horizontal
            data={Array(item?.rating).fill(5)}
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
          <Text style={pddtit.size}>
            {t('products.size')}: {item?.size}
          </Text>
          {item?.comment && (
            <>
              <Text
                style={pddtit.descript}
                numberOfLines={isExpanded ? undefined : 4}>
                {item.comment}
              </Text>
              {item.comment.length > 100 && (
                <TouchableOpacity
                  style={appst.rowStart}
                  onPress={toggleReadMore}>
                  <Text style={pddtit.readMore}>
                    {isExpanded
                      ? t('products.read_less')
                      : t('buttons.read_more')}
                  </Text>
                  <Image
                    style={[appst.icon20, {marginTop: 10}]}
                    source={
                      isExpanded
                        ? require('../../../assets/icons/arrrow_up.png')
                        : require('../../../assets/icons/arrrow_down.png')
                    }
                  />
                </TouchableOpacity>
              )}
            </>
          )}

          <View style={[appst.rowStart, pddtit.body2]}>
            {item.video && (
              <Video
                source={{
                  uri: item.video,
                  // 'https://media.istockphoto.com/id/1020236082/vi/video/c%C3%B4-g%C3%A1i-ng%E1%BB%93i-trong-%C4%91%C6%B0%E1%BB%9Dng-m%C3%B2n-ch%E1%BB%9D-%C4%91%E1%BB%A3i-m%E1%BB%99t-ng%C6%B0%E1%BB%9Di-ph%E1%BB%A5-n%E1%BB%AF-v%C3%A0-c%C3%B4-b%E1%BA%AFt-%C4%91%E1%BA%A7u-%C4%91i-b%E1%BB%99.mp4?s=mp4-640x640-is&k=20&c=5i-gC0iJ-Z3Qa1QQ5U2AcOfwGdmDCeTZfBml_GDpVzI=',
                }}
                style={pddtit.image}
                controls={true}
                resizeMode="cover"
              />
            )}

            <FlatList
              style={pddtit.flat}
              data={item.images}
              horizontal
              scrollEnabled={false}
              renderItem={({item}) => (
                <Image style={pddtit.image} source={{uri: item}} />
              )}
            />
          </View>

          {item.response && item.response.content && (
            <>
              {!isResponseVisible && (
                <TouchableOpacity
                  style={appst.rowEnd}
                  onPress={toggleResponseVisibility}>
                  <Text style={pddtit.readMore}>{t('review.responder')}</Text>
                  <Image
                    style={[appst.icon20, {marginTop: 10}]}
                    source={require('../../../assets/icons/arrrow_down.png')}
                  />
                </TouchableOpacity>
              )}
              {isResponseVisible && (
                <View
                  style={{
                    marginTop: 10,
                  }}>
                  <View
                    style={{
                      backgroundColor: colors.background_secondary,
                      paddingHorizontal: 10,
                      paddingVertical: 5,
                      borderRadius: 8,
                    }}>
                    <View style={appst.rowStart}>
                      {/* <Image
                        style={appst.icon30}
                        source={require('../../../assets/icons/logo.png')}
                      /> */}
                      <Text
                        style={{fontSize: 16, marginLeft: 5, color: '#333'}}>
                        {t('review.responder')}
                      </Text>
                    </View>
                    <Text style={pddtit.responseText}>
                      {item.response.content}
                    </Text>
                  </View>

                  <TouchableOpacity
                    style={appst.rowEnd}
                    onPress={toggleResponseVisibility}>
                    <Text style={pddtit.readMore}>{t('review.hide_rv')}</Text>
                    <Image
                      style={[appst.icon20, {marginTop: 10}]}
                      source={require('../../../assets/icons/arrrow_up.png')}
                    />
                  </TouchableOpacity>
                </View>
              )}
            </>
          )}
        </View>
      </View>
    </View>
  );
};

export default ItemReview;
