import {View, FlatList} from 'react-native';
import React from 'react';
import appst from '../../constants/AppStyle';
import {fvst} from './style';
import Header from '../../components/Header';
import ProductItem from '../../items/ProductItem';

const FavoriteScreen = ({navigation}) => {
  return (
    <View style={[appst.container, fvst.container]}>
      <Header
        iconLeft={require('../../assets/icons/back.png')}
        leftOnPress={() => navigation.goBack()}
        name={'Favorite'}
        iconRight={require('../../assets/icons/favorite.png')}
      />
      <View style={[appst.center]}>
        <FlatList
          data={[1, 2, 3, 4, 5]}
          renderItem={({item, index}) => (
            <ProductItem product={item} index={index} />
          )}
          keyExtractor={item => item.id}
          numColumns={2}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

export default FavoriteScreen;
