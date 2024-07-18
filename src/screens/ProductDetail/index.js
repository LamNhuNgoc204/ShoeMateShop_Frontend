import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React from 'react';
import appst from '../../constants/AppStyle';
import pddt from './style';
import Header from '../../components/Header';
import {colors} from '../../constants/colors';
import ItemReview from '../../items/ReviewItem/ProductDetail';
import {spacing} from '../../constants';
import ProductItem from '../../items/ProductItem';

const ProductDetail = ({navigation}) => {
  const products = new Array(10).fill(1);

  return (
    <View style={[appst.container, pddt.container]}>
      <Header
        iconLeft={require('../../assets/icons/back.png')}
        leftOnPress={() => navigation.goBack()}
        name={'Shoes'}
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
              <Text style={pddt.name}>Nike Air Jordan</Text>
              <Text style={pddt.price}>$918.000</Text>
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
              The Max Air 270 unit delivers unrivaled, all-day comfort. The
              sleek, running-inspired design roots you to everything
              Nike........
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
              data={products}
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

      <View style={[pddt.footer, appst.rowCenter]}>
        <View style={[appst.rowCenter, pddt.footer1]}>
          <TouchableOpacity>
            <Image
              source={require('../../assets/icons/chatwithshop.png')}
              style={pddt.chat}
            />
          </TouchableOpacity>
          <TouchableOpacity style={[pddt.pressAddtocart, appst.center]}>
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
