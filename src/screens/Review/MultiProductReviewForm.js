import React, {useEffect, useState} from 'react';
import {
  View,
  FlatList,
  Alert,
  Modal,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import Header from '../../components/Header';
import {useTranslation} from 'react-i18next';
import appst from '../../constants/AppStyle';
import ReviewItem from '../../items/ReviewItem/MultiProductReviewItem';
import {createMultipleReviews} from '../../api/reviewAPI';

const MultiProductReviewForm = ({route, navigation}) => {
  const {products, orderId} = route.params;
  // console.log('products ====================>>>>>', products);
  const {t} = useTranslation();
  const [isVisible, setIsVisible] = useState(false);

  const [reviews] = useState(
    products &&
      products.map(product => ({
        orderDetail_id: product._id,
        product_id: product.product.id,
      })),
  );

  // console.log('reviews-------------->', reviews);

  const [data, setData] = useState(
    products.map(product => ({
      orderDetail_id: product._id,
      product_id: product.product.id,
      rating: 0,
      comment: '',
      images: [],
      video: null,
      size: product.product.size_name,
    })),
  );

  useEffect(() => {
    console.log('Updated data:', data);
  }, [data]);

  const submitAllReviews = async () => {
    console.log('Submit review');
    try {
      const response = await createMultipleReviews({
        reviews: data,
        orderId: orderId,
      });
      if (response) {
        ToastAndroid.show(`${t('review.review_succ')}`, ToastAndroid.SHORT);
        navigation.navigate('MyRating', {initialRoute: t('review.to_review')});
      } else {
        ToastAndroid.show(`${t('toast.del_err')}`, ToastAndroid.SHORT);
      }
    } catch (error) {
      console.log('Error to review: ', error);
    }
  };

  const handleReviewChange = (productId, reviewData) => {
    setData(prevData =>
      prevData.map(item =>
        item.product_id === productId ? {...item, ...reviewData} : item,
      ),
    );
  };

  return (
    <View style={appst.container}>
      <Header
        backgroundColor={'white'}
        name={t('review.review')}
        iconLeft={require('../../assets/icons/back.png')}
        leftOnPress={() => navigation.goBack()}
        iconRight={require('../../assets/icons/check.png')}
        rightOnPress={() => submitAllReviews()}
      />
      <FlatList
        data={reviews}
        keyExtractor={item => item.orderDetail_id}
        renderItem={({item, index}) => (
          <ReviewItem
            setIsVisible={setIsVisible}
            onReviewChange={handleReviewChange}
            product={products && products[index].product}
          />
        )}
      />

      <Modal transparent={true} visible={isVisible}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      </Modal>
    </View>
  );
};
export default MultiProductReviewForm;
