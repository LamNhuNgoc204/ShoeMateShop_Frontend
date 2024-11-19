import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ScrollView,
} from 'react-native';
import Video from 'react-native-video';
import Header from '../../components/Header';
import {useTranslation} from 'react-i18next';

const reviews = [
  {
    id: '1',
    user: 'S*****6',
    rating: 5,
    description: 'Đúng với mô tả: đúng',
    color: 'trắng',
    content: 'Vòng tay nam nữ đá chuông treo dài cổ điển. Vòng ok rcm',
    media: [
      {type: 'image', uri: 'https://via.placeholder.com/150'},
      {type: 'video', uri: 'https://www.w3schools.com/html/mov_bbb.mp4'}, // Thay bằng link video thật
    ],
    date: '27-05-2024 19:11',
  },
  {
    id: '2',
    user: 'S*****6',
    rating: 5,
    description: 'Đúng với mô tả: đúng',
    color: 'trắng',
    content: 'Vòng tay rất đẹp và hợp thời trang.',
    media: [
      {type: 'image', uri: 'https://via.placeholder.com/150'},
      {type: 'image', uri: 'https://via.placeholder.com/150'},
    ],
    date: '27-05-2024 19:11',
  },
];

const ProductReviews = ({navigation}) => {
  const {t} = useTranslation();
  
  const renderStars = rating => {
    return Array(rating)
      .fill()
      .map((_, index) => (
        <Text key={index} style={styles.star}>
          ★
        </Text>
      ));
  };

  const renderMedia = media => {
    return media.map((item, index) => {
      if (item.type === 'image') {
        return (
          <Image key={index} source={{uri: item.uri}} style={styles.image} />
        );
      } else if (item.type === 'video') {
        return (
          <Video
            key={index}
            source={{uri: item.uri}}
            style={styles.video}
            controls={true}
            resizeMode="contain"
          />
        );
      }
    });
  };

  const renderReviewItem = ({item}) => (
    <View style={styles.reviewContainer}>
      <Text style={styles.userName}>{item.user}</Text>
      <View style={styles.ratingContainer}>{renderStars(item.rating)}</View>
      <Text style={styles.description}>{item.description}</Text>
      <Text style={styles.color}>Màu sắc: {item.color}</Text>
      <Text style={styles.content}>{item.content}</Text>
      <ScrollView horizontal>{renderMedia(item.media)}</ScrollView>
      <Text style={styles.date}>{item.date}</Text>
    </View>
  );

  return (
    <View>
      <Header
        backgroundColor={'white'}
        name={t('review.review_order')}
        iconLeft={require('../../assets/icons/back.png')}
        leftOnPress={() => navigation.goBack()}
      />
      <FlatList
        data={reviews}
        renderItem={renderReviewItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    padding: 16,
  },
  reviewContainer: {
    marginBottom: 20,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 8,
    elevation: 3,
  },
  userName: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  star: {
    color: '#FFD700',
    fontSize: 16,
  },
  description: {
    fontSize: 14,
    marginBottom: 4,
    color: '#333',
  },
  color: {
    fontSize: 14,
    marginBottom: 4,
    color: '#555',
  },
  content: {
    fontSize: 14,
    marginBottom: 12,
    color: '#000',
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 8,
    borderRadius: 8,
  },
  video: {
    width: 150,
    height: 100,
    marginRight: 8,
    borderRadius: 8,
  },
  date: {
    fontSize: 12,
    color: '#999',
    marginTop: 8,
  },
});

export default ProductReviews;
