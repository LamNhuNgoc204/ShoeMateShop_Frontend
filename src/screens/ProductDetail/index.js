import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import appst from '../../constants/AppStyle';
import pddt from './style';
import Header from '../../components/Header';
import {colors} from '../../constants/colors';
import ItemReview from '../../items/ReviewItem/ProductDetail';
import {spacing} from '../../constants';
import ProductItem from '../../items/ProductItem';
import AxiosInstance from '../../helpers/AxiosInstance';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import BottomSheetContent from '../../items/Sizebottom';
import ProductSkeleton from '../../placeholders/product/detail';
import {addRecentView} from '../../api/ProductApi';

const ProductDetail = props => {
  const navigation = useNavigation();
  const {index} = props.route.params;
  const useAppSelector = useSelector;
  const bottomSheetRef = useRef(null);
  const productState = useAppSelector(state => state.products);
  const [selectedImage, setSelectedImage] = useState(
    product && product.assets[0],
  );
  const hasReviews =
    product &&
    Array.isArray(product.reviewsOfProduct) &&
    product.reviewsOfProduct.length > 0;

  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState(null);
  const [sizeModalVisible, setSizeModalVisible] = useState(false);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  const fetchProduct = async () => {
    try {
      const [addpdView, response] = await Promise.all([
        addRecentView(index),
        AxiosInstance().get(`/products/detail/${index}`),
      ]);

      console.log('Thêm sản phẩm vào danh sách xem gần đây:', addpdView);
      if (response) {
        setProduct(response);
        setLoading(false);
      }
      // console.log('data product detail', response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProduct();
    return () => {};
  }, []);

  // console.log(product);

  const handleSheetChanges = useCallback(index => {
    console.log('handleSheetChanges', index);
  }, []);

  const closeBottomSheet = () => {
    if (bottomSheetRef.current) {
      bottomSheetRef.current.close();
    }
  };

  const onOpenSheet = () => {
    console.log('on open');
    if (bottomSheetRef.current) {
      bottomSheetRef.current.snapToIndex(0);
    }
  };

  useEffect(() => {
    if (bottomSheetRef.current) {
      bottomSheetRef.current.close();
    }
  }, []);

  return (
    <View style={[appst.container, pddt.container]}>
      <Header
        iconLeft={require('../../assets/icons/back.png')}
        leftOnPress={() => navigation.goBack()}
        name={product.name}
        rightOnPress={() => navigation.navigate('CartScreen')}
        iconRight={require('../../assets/icons/mycart.png')}
        backgroundColor={colors.background_secondary}
      />
      {!loading ? (
        <ScrollView style={{flex: 1, marginBottom: spacing.md}}>
          <View>
            {product && product.assets && product.assets.length > 0 ? (
              <FlatList
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                data={product.assets}
                extraData={selectedImage}
                renderItem={({item}) => (
                  <Image style={pddt.pdImg} source={{uri: item}} />
                )}
                keyExtractor={(item, index) => index.toString()}
              />
            ) : (
              <Image
                style={pddt.pdImg}
                source={require('../../assets/images/placeholder_image.jpg')}
              />
            )}
            {product && product.assets && product.assets.length > 0 && (
              <FlatList
                style={pddt.flatItem}
                horizontal
                showsHorizontalScrollIndicator={false}
                data={product.assets}
                extraData={selectedImage}
                keyExtractor={(item, index) => index.toString()}
                ItemSeparatorComponent={<View style={{marginHorizontal: 5}} />}
                renderItem={({item, index}) => {
                  return (
                    <TouchableOpacity onPress={() => setSelectedImage(item)}>
                      <Image style={pddt.controlItem} source={{uri: item}} />
                    </TouchableOpacity>
                  );
                }}
                contentContainerStyle={<View style={{marginHorizontal: 5}} />}
              />
            )}
          </View>

          <View style={pddt.body}>
            <Text style={pddt.bestSl}>BEST SELLER</Text>
            <View style={[appst.rowCenter, pddt.body1]}>
              <View>
                <Text style={pddt.name}>{product.name}</Text>
                <Text style={pddt.price}>
                  ${product.price && product.price.toLocaleString('vi-VN')}
                </Text>
              </View>
              <View style={[pddt.iconfav, appst.center]}>
                {product.isFavorite ? (
                  <Image
                    source={require('../../assets/icons/heart_select.png')}
                  />
                ) : (
                  <Image source={require('../../assets/icons/favorite.png')} />
                )}
              </View>
            </View>
            <View style={[appst.rowStart]}>
              <Image
                source={require('../../assets/icons/star.png')}
                style={appst.icon20}
              />
              <Text style={pddt.textStar}>
                {product && product.avgRating}/5
              </Text>
              <Text style={pddt.bought}>
                Đã bán ({product && product.sold < 100 ? product.sold : '100+'})
              </Text>
            </View>
            <View style={pddt.viewDes}>
              <Text
                numberOfLines={isDescriptionExpanded ? undefined : 3}
                style={pddt.des}>
                {product.description}
              </Text>
              <TouchableOpacity
                onPress={() =>
                  setIsDescriptionExpanded(!isDescriptionExpanded)
                }>
                <Text style={pddt.readmore}>
                  {isDescriptionExpanded ? 'Read Less' : 'Read More'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={pddt.body2}>
            <Text style={[pddt.reviewTitle, pddt.pdHorizon]}>
              Product Reviews
            </Text>
            {hasReviews ? (
              <View>
                <FlatList
                  data={product.reviewsOfProduct}
                  renderItem={({item}) => <ItemReview item={item} />}
                  extraData={item => item.id}
                  scrollEnabled={false}
                />
                <Text style={pddt.text1}>
                  See All ({product.reviewsOfProduct.length})
                </Text>
              </View>
            ) : (
              <Text style={{padding: 10, textAlign: 'center'}}>
                Chua co danh gia
              </Text>
            )}
          </View>

          <View>
            <View style={[appst.center, {flexDirection: 'row'}]}>
              <View style={pddt.border} />
              <Text style={pddt.text2}>Similar Product</Text>
              <View style={pddt.border} />
            </View>
            <View style={appst.center}>
              <FlatList
                data={productState.products}
                renderItem={({item, index}) => (
                  <ProductItem product={item} index={index} />
                )}
                keyExtractor={(item, index) => index.toString()}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                scrollEnabled={false}
                style={{marginLeft: 20}}
              />
            </View>
          </View>
        </ScrollView>
      ) : (
        <ProductSkeleton />
      )}

      <View style={[pddt.footer, appst.rowCenter]}>
        <View style={[appst.rowCenter, pddt.footer1]}>
          <TouchableOpacity>
            <Image
              source={require('../../assets/icons/chatwithshop.png')}
              style={pddt.chat}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onOpenSheet()}
            style={[pddt.pressAddtocart, appst.center]}>
            <Text style={pddt.txtPress}>Add to cart</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={[pddt.pressBuynow, appst.center]}>
          <Text style={pddt.txtPress}>Buy now</Text>
        </TouchableOpacity>
      </View>

      {/* Modal for selecting size */}
      <BottomSheet
        ref={bottomSheetRef}
        onChange={handleSheetChanges}
        onClose={closeBottomSheet}
        snapPoints={[380]}
        index={sizeModalVisible ? 0 : -1}
        enablePanDownToClose={true}>
        <BottomSheetView style={{flex: 1}}>
          <BottomSheetContent
            product={product}
            sizes={product.size}
            selectedSize={selectedSize}
            setSelectedSize={setSelectedSize}
            quantity={quantity}
            setQuantity={setQuantity}
            setSizeModalVisible={setSizeModalVisible}
          />
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
};

export default ProductDetail;
