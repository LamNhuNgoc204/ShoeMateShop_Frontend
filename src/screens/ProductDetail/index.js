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
import AxiosInstance from '../../helpers/AxiosInstance';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import BottomSheetContent from '../../items/Sizebottom';
import ProductSkeleton from '../../placeholders/product/detail';
import {addRecentView} from '../../api/ProductApi';
import {useTranslation} from 'react-i18next';
import ProductList from '../Product/ProductList';
import Share from 'react-native-share';
import {formatPrice} from '../../utils/functions/formatData';

const ProductDetail = props => {
  const {t, i18n} = useTranslation();
  const lag = i18n.language;

  const navigation = useNavigation();
  const {index} = props.route.params;
  const useAppSelector = useSelector;
  const bottomSheetRef = useRef(null);
  const productState = useAppSelector(state => state.products);
  const [selectedImage, setSelectedImage] = useState(
    product && product.assets[0],
  );

  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState(null);
  const [sizeModalVisible, setSizeModalVisible] = useState(false);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [proId, setProId] = useState(index);



  const [listReview, setListReview] = useState([]);
  const isTokenValid = useSelector(state => state?.user?.isValidToken);

  const fetchListReview = async () => {
    try {
      const response = await AxiosInstance().get(
        `/reviews/get-list-product-reviews/${index}`,
      );
      // console.log('response =>', response);

      if (response.status) {
        setListReview(response.data);
      }
    } catch (error) {
      console.log('fetch reviews error: ', error);
    }
  };

  const dispatch = useDispatch();

  const fetchProduct = async () => {
    try {
      if (isTokenValid) {
        await addRecentView(index);
      } else {
        console.log(
          'Token hết hạn, bỏ qua thêm sản phẩm vào danh sách gần đây',
        );
      }

      const [response] = await Promise.all([
        // addRecentView(index),
        AxiosInstance().get(`/products/detail/${index}`),
        fetchListReview(),
      ]);

      // console.log('Thêm sản phẩm vào danh sách xem gần đây:', addpdView);
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
  }, [proId]);

  // console.log(product);
  // console.log('listReview', listReview);

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

  //Lay anh trong asset
  const imageAssets =
    product?.assets?.filter(asset => {
      const fileExtension = asset.split('.').pop().toLowerCase();
      return ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'].includes(
        fileExtension,
      );
    }) || [];

  const onSetProduct = product => {
    setProId(product._id);
  };


    const createDeepLink = () => {
      return `https://open-deeplink-production.up.railway.app/product/${product._id}`;
    };
  
    const shareProduct = async () => {
      const deepLink = createDeepLink();
  
      const shareOptions = {
        url: deepLink,
      };
  
      try {
        const result = await Share.open(shareOptions);
        console.log('Chia sẻ thành công', result);
      } catch (error) {
        console.log('Lỗi chia sẻ:', error);
      }
    };
  // console.log('product.reviewsOfProduct====>', product.reviewsOfProduct);

  return (
    <View style={[appst.container, pddt.container]}>
      <Header
        iconLeft={require('../../assets/icons/back.png')}
        leftOnPress={() => {
          try {
            navigation.goBack()
          } catch (error) {
            navigation.navigate('BottomNav')
          }
        }}
        name={product.name}
        rightOnPress={() => {
          navigation.reset({
            index: 0,
            routes: [{name: 'BottomNav', params: {screen: 'CartScreen'}}],
          });
        }}
        iconRight={require('../../assets/icons/mycart.png')}
        backgroundColor={colors.background_secondary}
      />
      {!loading ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{flex: 1, marginBottom: spacing.md, marginTop: 5}}>
          <View>
            {imageAssets.length > 0 ? (
              <FlatList
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                data={product.assets}
                extraData={selectedImage}
                renderItem={({item}) => (
                  <Image style={pddt.pdImg} source={{uri: item}} />
                )}
                keyExtractor={(item, index) => item._id || index.toString()}
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
            <Text style={pddt.bestSl}>{t('products.best_seller')}</Text>
            <View style={[appst.rowCenter, pddt.body1]}>
              <View style={{flex: 1}}>
                <Text
                  // numberOfLines={1}
                  maxFontSizeMultiplier={5}
                  style={pddt.name}>
                  {product.name}
                </Text>
                <Text style={pddt.price}>
                  {lag === 'en' && '$'}
                  {product.price && formatPrice(product.price, lag)}
                  {lag === 'vi' && ' VNĐ '}
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

              <View style={{width: 5}}/>
              <TouchableOpacity onPress={shareProduct} style={[pddt.iconfav, appst.center]}>
              <Image
                    style={{width: 20, height: 20}}
                    resizeMode='contain'
                    source={require('../../assets/icons/share.png')}
                  />
              </TouchableOpacity>
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
                {t('products.sold')} (
                {product && product.sold < 100 ? product.sold : '100+'})
              </Text>
            </View>

            <View style={pddt.viewDes}>
              <Text
                numberOfLines={isDescriptionExpanded ? undefined : 3}
                style={pddt.des}>
                {product.description}
              </Text>
              {product.description.length > 100 && (
                <TouchableOpacity
                  onPress={() =>
                    setIsDescriptionExpanded(!isDescriptionExpanded)
                  }>
                  <Text style={pddt.readmore}>
                    {isDescriptionExpanded
                      ? t('products.read_less')
                      : t('buttons.read_more')}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>

          <View style={pddt.body2}>
            <Text style={[pddt.reviewTitle, pddt.pdHorizon]}>
              {t('products.reviews')}
            </Text>
            {listReview.length !== 0 ? (
              <View>
                <FlatList
                  data={listReview?.slice(0, 3)}
                  renderItem={({item}) => <ItemReview item={item} />}
                  extraData={item => item._id}
                  scrollEnabled={false}
                />
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('AllProductReview', {
                      lstReview: listReview,
                    })
                  }>
                  <Text style={pddt.text1}>
                    {t('products.see_all')} ({product.reviewsOfProduct.length})
                  </Text>
                </TouchableOpacity>
              </View>
            ) : (
              <Text style={{padding: 10, textAlign: 'center'}}>
                {t('review.no_review')}
              </Text>
            )}
          </View>

          <View style={{marginTop: 15}}>
            <ProductList onSetProduct={onSetProduct} listProduct={productState?.products?.data} />
          </View>
        </ScrollView>
      ) : (
        <ProductSkeleton />
      )}

      <View style={[pddt.footer, appst.rowCenter]}>
        <View style={[appst.rowCenter]}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('MessageScreen', {
                product: product,
              });
            }}>
            <Image
              source={require('../../assets/icons/chatwithshop.png')}
              style={pddt.chat}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onOpenSheet()}
            style={[pddt.pressAddtocart, appst.center]}>
            <Text style={pddt.txtPress}>{t('buttons.btn_addtocart')}</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => onOpenSheet()}
          style={[pddt.pressBuynow, appst.center]}>
          <Text style={pddt.txtPress}>{t('buttons.btn_buynow')}</Text>
        </TouchableOpacity>
      </View>

      {/* Modal for selecting size */}
      <BottomSheet
        ref={bottomSheetRef}
        closeOnTouchOutside={true}
        onChange={handleSheetChanges}
        onClose={closeBottomSheet}
        snapPoints={[380]}
        index={sizeModalVisible ? 0 : -1}
        enablePanDownToClose={true}>
        <BottomSheetView style={{flex: 1}}>
          <BottomSheetContent
            dispatch={dispatch}
            img={imageAssets}
            product={product}
            sizes={product.size}
            selectedSize={selectedSize}
            setSelectedSize={setSelectedSize}
            quantity={quantity}
            setQuantity={setQuantity}
            setSizeModalVisible={setSizeModalVisible}
            closeBottomSheet={closeBottomSheet}
          />
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
};

export default ProductDetail;
