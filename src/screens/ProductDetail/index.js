import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
  Pressable,
  ToastAndroid,
} from 'react-native';
import React, {useEffect, useState} from 'react';
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

const ProductDetail = props => {
  const navigation = useNavigation();
  const {index} = props.route.params;

  const useAppSelector = useSelector;
  const productState = useAppSelector(state => state.products);

  const [product, setProduct] = useState([]);
  const [sizeModalVisible, setSizeModalVisible] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);

  const handleAddToCart = () => {
    // Show the modal when "Add to Cart" is pressed
    setSizeModalVisible(true);
  };

  const handleSizeSelect = size => {
    setSelectedSize(size);
    console.log(`Size selected: ${size}`);
  };

  const fetchProduct = async () => {
    try {
      const response = await AxiosInstance().get(`/products//detail/${index}`);
      if (response) {
        setProduct(response);
        // console.log("pd day ne", product);
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

  const addToCart = async () => {
    try {
      const itemCart = {
        product_id: product._id,
        size_id: selectedSize,
        quantity: 1,
      };

      const response = await AxiosInstance().post(
        `/cart/add-product-to-cart`,
        itemCart,
      );
      if (response.status) {
        setSizeModalVisible(false);
        ToastAndroid.show(
          'Chúc mừng bạn đã thêm vào giỏ hàng thành công',
          ToastAndroid.SHORT,
        );
      } else {
        setSizeModalVisible(false);
        ToastAndroid.show(
          'Oops. Xảy ra lỗi rồi. Thử lại nhé :3',
          ToastAndroid.SHORT,
        );
      }
    } catch (error) {
      console.log('error add to cart, ', error);
    }
  };

  return (
    <View style={[appst.container, pddt.container]}>
      <Header
        iconLeft={require('../../assets/icons/back.png')}
        leftOnPress={() => navigation.goBack()}
        name={product.name}
        rightOnPress={() => navigation.navigate()}
        iconRight={require('../../assets/icons/mycart.png')}
        backgroundColor={colors.background_secondary}
      />
      <ScrollView style={{flex: 1, marginBottom: spacing.md}}>
        <View>
          <FlatList
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            data={[1, 2, 3]}
            extraData={item => item.id}
            renderItem={({item}) => (
              <Image
                style={pddt.pdImg}
                source={require('../../assets/images/banner1.png')}
              />
            )}
          />
          <FlatList
            style={pddt.flatItem}
            horizontal
            showsHorizontalScrollIndicator={false}
            data={[1, 2, 3]}
            extraData={item => item.id}
            ItemSeparatorComponent={<View style={{marginHorizontal: 5}} />}
            renderItem={({item}) => {
              return (
                <Image
                  style={pddt.controlItem}
                  source={require('../../assets/images/banner2.jpg')}
                />
              );
            }}
            contentContainerStyle={<View style={{marginHorizontal: 5}} />}
          />
        </View>

        <View style={pddt.body}>
          <Text style={pddt.bestSl}>BEST SELLER</Text>
          <View style={[appst.rowCenter, pddt.body1]}>
            <View>
              <Text style={pddt.name}>{product.name}</Text>
              <Text style={pddt.price}>${product.price}</Text>
            </View>
            <View style={[pddt.iconfav, appst.center]}>
              <Image source={require('../../assets/icons/favorite.png')} />
            </View>
          </View>
          <View style={[appst.rowStart]}>
            <Image
              source={require('../../assets/icons/star.png')}
              style={appst.icon20}
            />
            <Text style={pddt.textStar}>4.5/5</Text>
            <Text style={pddt.bought}>Đã bán (30+)</Text>
          </View>
          <View style={pddt.viewDes}>
            <Text numberOfLines={3} style={pddt.des}>
              {product.description}
            </Text>
            <Text style={pddt.readmore}>Read More</Text>
          </View>
        </View>

        <View style={pddt.body2}>
          <Text style={[pddt.reviewTitle, pddt.pdHorizon]}>
            Product Reviews
          </Text>
          <FlatList
            data={[1, 2]}
            renderItem={({item}) => <ItemReview item={item} />}
            extraData={item => item.id}
            scrollEnabled={false}
          />
          <Text style={pddt.text1}>See All (32)</Text>
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
              // ItemSeparatorComponent={() => <View style={homeStyle.separator}/>}
            />
          </View>
        </View>
      </ScrollView>

      {/* Modal for selecting size */}
      <Modal
        visible={sizeModalVisible}
        animationType="slide"
        transparent={true} // Set to true for transparent background
        onRequestClose={() => setSizeModalVisible(false)}>
        {/* Background overlay */}
        <View style={pddt.modalOverlay}>
          {/* Modal content with dynamic width */}
          <View style={pddt.modalContent}>
            <Text style={pddt.modalTitle}>Select Size</Text>

            <View style={{flexDirection: 'row'}}>
              {product.size && product.size.length > 0 ? (
                product.size.map((size, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[pddt.sizeOption, {marginRight: 10}]}
                    onPress={() => handleSizeSelect(size._id)}>
                    <Text style={pddt.sizeText}>{size.sizeId.name}</Text>
                  </TouchableOpacity>
                ))
              ) : (
                <Text>No sizes available</Text>
              )}
            </View>

            <TouchableOpacity
              onPress={() => addToCart()}
              style={[pddt.pressAddtocart, appst.center]}>
              <Text style={pddt.txtPress}>Add to cart</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View style={[pddt.footer, appst.rowCenter]}>
        <View style={[appst.rowCenter, pddt.footer1]}>
          <TouchableOpacity>
            <Image
              source={require('../../assets/icons/chatwithshop.png')}
              style={pddt.chat}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleAddToCart()}
            style={[pddt.pressAddtocart, appst.center]}>
            <Text style={pddt.txtPress}>Add to cart</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={[pddt.pressBuynow, appst.center]}>
          <Text style={pddt.txtPress}>Buy now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProductDetail;
