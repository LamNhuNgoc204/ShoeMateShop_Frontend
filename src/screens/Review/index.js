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
import {useTranslation} from 'react-i18next';

const Review = ({navigation, route}) => {
  const {t} = useTranslation();
  const {product} = route?.params;
  const [rating, setRating] = useState(0);
  const [text, setText] = useState('');

  const handleStarPress = rating => {
    setRating(rating);
  };

  console.log('product', product);

  return (
    <View style={[appst.container, rvst.container]}>
      <Header
        name={t('review.review')}
        iconLeft={require('../../assets/icons/back.png')}
        leftOnPress={() => navigation.goBack()}
        iconRight={require('../../assets/icons/check.png')}
        rightOnPress={() => {}}
      />

      <View style={[rvst.itemPd]}>
        <Image
          style={rvst.imgPd}
          source={
            product.pd_image && product.pd_image[0]
              ? {uri: product.pd_image[0]}
              : require('../../assets/images/placeholder_image.jpg')
          }
        />
        <View style={{marginLeft: 5}}>
          <View style={rvst.viewContent}>
            <Text numberOfLines={1} style={rvst.name}>
              {product.name}
            </Text>
            <Text style={rvst.size}>
              {t('products.size')}: {product.size_name}
            </Text>
          </View>
        </View>
      </View>

      <View style={[rvst.viewStar]}>
        <Text style={rvst.quality}>{t('review.sub_title')}:</Text>
        <StarRating
          maxStars={5}
          rating={rating}
          onStarPress={handleStarPress}
        />
      </View>

      <View style={[appst.rowCenter, rvst.viewAsset]}>
        <TouchableOpacity style={[rvst.viewBorder]}>
          <Image source={require('../../assets/icons/addphoto.png')} />
          <Text style={rvst.text}>{t('review.photo')}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[rvst.viewBorder]}>
          <Image source={require('../../assets/icons/addvideo.png')} />
          <Text style={rvst.text}>{t('review.video')}</Text>
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

      <View style={rvst.view1}>
        <TextInput
          style={rvst.input}
          multiline={true}
          onChangeText={e => setText(e)}
          value={text}
          placeholder={t('review.placeholder')}
        />
      </View>
    </View>
  );
};

export default Review;
