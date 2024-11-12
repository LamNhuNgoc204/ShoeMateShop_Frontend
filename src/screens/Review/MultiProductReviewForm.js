import React, {useState} from 'react';
import {View, FlatList} from 'react-native';
import axios from 'axios';
import Header from '../../components/Header';
import {useTranslation} from 'react-i18next';
import appst from '../../constants/AppStyle';
import ReviewItem from '../../items/ReviewItem/MultiProductReviewItem';

const MultiProductReviewForm = ({route, navigation}) => {
  const {products} = route.params;
  console.log('products ====================>>>>>', products);
  const {t} = useTranslation();
  const [reviews, setReviews] = useState(
    products &&
      products.map(product => ({
        orderDetail_id: product._id,
        product_id: product.product.id,
        rating: '',
        comment: '',
      })),
  );
  const handleInputChange = (index, field, value) => {
    const updatedReviews = [...reviews];
    updatedReviews[index][field] = value;
    setReviews(updatedReviews);
  };
  const submitAllReviews = async () => {
    try {
      await axios.post('/reviews', {reviews});
      navigation.goBack();
    } catch (error) {
      console.log('Error submitting reviews:', error);
    }
  };
  // console.log(
  //   'products[index] && products[index].product',
  //   products[0] && products[0].product,
  // );
  return (
    <View style={appst.container}>
      <Header
        backgroundColor={'white'}
        name={t('review.review')}
        iconLeft={require('../../assets/icons/back.png')}
        leftOnPress={() => navigation.goBack()}
        iconRight={require('../../assets/icons/check.png')}
        rightOnPress={() => {}}
      />
      <FlatList
        data={reviews}
        keyExtractor={item => item.orderDetail_id}
        renderItem={({item, index}) => (
          <ReviewItem product={products && products[index].product} />
        )}
      />
    </View>
  );
};
export default MultiProductReviewForm;