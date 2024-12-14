import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Text,
  Modal,
  Image,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import Header from '../../components/Header';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import ItemReview from '../../items/ReviewItem/ProductDetail';
import {gotoCart} from '../../utils/functions/navigationHelper';
import appst from '../../constants/AppStyle';
import {fonts} from '../../constants/fonts';

const AllReview = ({route}) => {
  const {lstReview} = route.params;
  const navigation = useNavigation();
  const {t} = useTranslation();

  // console.log('AllReview', lstReview);

  const [filteredReviews, setFilteredReviews] = useState(lstReview);
  const [selectedRating, setSelectedRating] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [filterType, setFilterType] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalSize, setModalSize] = useState(false);
  const sizeArray =
    lstReview[0]?.product_id?.size?.map(item => item.sizeId?.name) || [];

  const filterByRating = rating => {
    let result = lstReview.filter(review => review.rating === rating);
    if (filterType === 'image')
      result = result.filter(
        review => review.images && review.images.length > 0,
      );
    if (filterType === 'video')
      result = result.filter(
        review => review.videos && review.videos.length > 0,
      );
    setFilteredReviews(result);
    setSelectedRating(rating);
    setModalVisible(false);
  };

  const filterBySize = size => {
    const result = lstReview.filter(review => review.size === parseInt(size));
    setFilteredReviews(result);
    setSelectedSize(size);
    setModalSize(false);
  };

  const filterByType = type => {
    let result = lstReview;
    if (selectedRating) {
      result = result.filter(review => review.rating === selectedRating);
    }

    if (type === 'image' || type === 'video') {
      result = result.filter(review => {
        const hasImage = review.images && review.images.length > 0;
        const hasVideo = review.videos && review.videos.length > 0;

        return (
          (hasImage && type === 'image') ||
          (hasVideo && type === 'video') ||
          (hasImage && hasVideo)
        );
      });
    }

    setFilteredReviews(result);
    setFilterType(type);
  };

  const resetFilter = () => {
    setFilteredReviews(lstReview);
    setSelectedRating(null);
    setSelectedSize(null);
    setFilterType(null);
  };

  // console.log('product_id.size=====>', lstReview[0]?.product_id?.size);
  // console.log('sizeArray=====>', sizeArray);

  return (
    <View>
      <Header
        iconLeft={require('../../assets/icons/back.png')}
        leftOnPress={() => navigation.goBack()}
        name={t('review.all_review')}
        rightOnPress={() => gotoCart(navigation)}
        iconRight={require('../../assets/icons/mycart.png')}
        backgroundColor={'#fff'}
      />

      {/* Bộ lọc */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={[styles.filterContainer, {flexWrap: 'wrap'}]}>
        <TouchableOpacity style={styles.resetButton} onPress={resetFilter}>
          <Text style={styles.resetText}>{t('review.all')}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.ratingButton]}
          onPress={() => setModalVisible(true)}>
          <Text style={[styles.ratingText, styles.primaryText]}>
            {selectedRating ? `${selectedRating}` : t('review.select_stars')} ⭐
            <Image
              style={appst.icon24}
              source={require('../../assets/icons/arrrow_down.png')}
            />
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.typeButton,
            (filterType === 'image' || filterType === 'video') &&
              styles.selectedTypeButton,
          ]}
          onPress={() =>
            filterByType(filterType === 'image' ? 'video' : 'image')
          }>
          <Text
            style={[
              styles.typeText,
              (filterType === 'image' || filterType === 'video') &&
                styles.selectedTypeText,
            ]}>
            {t('review.with_image_video')}{' '}
            <Image
              style={appst.icon24}
              source={require('../../assets/icons/arrrow_down.png')}
            />
          </Text>
        </TouchableOpacity>

        {sizeArray?.length > 1 && (
          <TouchableOpacity
            style={[styles.ratingButton]}
            onPress={() => setModalSize(true)}>
            <Text style={[styles.ratingText, styles.primaryText]}>
              {selectedSize
                ? `${t('products.size')}: ${selectedSize}`
                : t('review.type')}
              <Image
                style={appst.icon24}
                source={require('../../assets/icons/arrrow_down.png')}
              />
            </Text>
          </TouchableOpacity>
        )}
      </ScrollView>

      {/* Modal dropdown cho số sao */}
      <Modal
        transparent={true}
        animationType="fade"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            {[1, 2, 3, 4, 5].map(rating => (
              <TouchableOpacity
                key={rating}
                style={styles.modalOption}
                onPress={() => filterByRating(rating)}>
                <Text style={styles.modalOptionText}>
                  {rating}{' '}
                  {Array(rating)
                    .fill('⭐')
                    .map((star, index) => (
                      <Text key={index}>{star}</Text>
                    ))}
                </Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setModalVisible(false)}>
              <Text style={styles.modalCloseText}>{t('buttons.close')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        transparent={true}
        animationType="fade"
        visible={modalSize}
        onRequestClose={() => setModalSize(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.txt3}>{t('review.filter_by_size')}</Text>
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'flex-start',
                marginHorizontal: 10,
                marginTop: 10,
              }}>
              {sizeArray.map(size => (
                <TouchableOpacity
                  key={size}
                  style={{
                    paddingVertical: 10,
                    paddingHorizontal: 15,
                    backgroundColor: '#E6F0FA',
                    margin: 8,
                    borderRadius: 10,
                    borderWidth: 0.5,
                    borderColor: '#0159A6',
                  }}
                  onPress={() => filterBySize(size)}>
                  <Text style={styles.modalOptionText}>{size}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setModalSize(false)}>
              <Text style={styles.modalCloseText}>{t('buttons.close')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Danh sách đánh giá */}
      {filteredReviews.length !== 0 ? (
        <>
          <FlatList
            data={filteredReviews}
            renderItem={({item}) => <ItemReview item={item} />}
            keyExtractor={item => item._id}
          />
          <Text style={styles.text1}>
            <Image
              style={appst.icon24}
              source={require('../../assets/icons/not_found.png')}
            />{' '}
            {t('review.not_found')}
          </Text>
        </>
      ) : (
        <View style={styles.view1}>
          <Image
            style={{width: 80, height: 80}}
            source={require('../../assets/icons/icons8-review-100.png')}
          />
          <Text style={styles.txt2}>{t('review.no_reviews')}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  txt3: {
    fontSize: 20,
    color: '#1677FF',
    paddingTop: 5,
    paddingBottom: 15,
    textAlign: 'center',
    fontWeight: '600',
    borderBottomWidth: 1,
    borderBottomColor: '#1677FF',
  },
  txt2: {
    fontSize: 20,
    color: '#1677FF',
    fontFamily: fonts.pp_regular,
    marginTop: 2,
  },
  view1: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 30,
  },
  text1: {
    paddingTop: 5,
    textAlign: 'center',
    color: 'blue',
    fontFamily: fonts.pp_medium,
    textDecorationLine: 'underline',
  },
  filterContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
    backgroundColor: '#D0E7F8',
    marginVertical: 5,
  },
  ratingButton: {
    paddingHorizontal: 15,
    backgroundColor: '#E6F0FA',
    borderRadius: 8,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: '#0159A6',
  },
  selectedRatingButton: {
    backgroundColor: '#0159A6',
  },
  ratingText: {
    fontSize: 14,
    color: '#0159A6',
  },
  primaryText: {
    color: '#0159A6',
  },
  resetButton: {
    paddingHorizontal: 15,
    backgroundColor: '#E6F0FA',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#0159A6',
    marginLeft: 10,
  },
  resetText: {
    color: '#0159A6',
    fontSize: 14,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderRadius: 10,
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
  modalOption: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#E6F0FA',
    marginBottom: 8,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: '#0159A6',
    marginHorizontal: 15,
  },
  modalOptionText: {
    fontSize: 14,
    color: '#0159A6',
  },
  modalCloseButton: {
    paddingVertical: 10,
    marginHorizontal: 15,
    backgroundColor: '#0159A6',
    borderRadius: 8,
    marginTop: 10,
  },
  modalCloseText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
  },
  typeButton: {
    paddingHorizontal: 10,
    backgroundColor: '#E6F0FA',
    borderRadius: 8,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: '#0159A6',
  },
  selectedTypeButton: {
    backgroundColor: '#0159A6',
  },
  typeText: {
    fontSize: 14,
    color: '#0159A6',
  },
  selectedTypeText: {
    color: 'white',
  },
  resetButton: {
    paddingVertical: 10,
    paddingHorizontal: 8,
    backgroundColor: '#E6F0FA',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#0159A6',
    marginLeft: 10,
  },
});

export default AllReview;
