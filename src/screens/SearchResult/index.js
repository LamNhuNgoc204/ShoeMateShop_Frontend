import {View} from 'react-native';
import React, {useState} from 'react';
import searchResultStyle from './style';
import ToolBar from '../../components/ToolBar';
import {FlatList} from 'react-native-gesture-handler';
import ProductItem from '../../items/ProductItem';
import FilterPanel from '../../components/FilterPanel';


const SearchResult = ({navigation}) => {
  const [filterOpen, setFilterOpen] = useState(false);
  const [listSelectedBrand, setListSelectedBrand] = useState([]);
  const [listSelectedStar, setListSelectedStar] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [products, setProducts] = useState([]);

  const onOpenFilter = () => {
    setFilterOpen(true);
  };

  const onCloseFilterPress = () => {
    setFilterOpen(false);
  };

  const onBrandPress = index => {
    const newList = [...listSelectedBrand];
    if (newList.includes(index)) {
      newList.splice(newList.indexOf(index), 1);
    } else {
      newList.push(index);
    }
    console.log('newList: ', newList);
    setListSelectedBrand(newList);
  };

  const onStarPress = index => {
    const newList = [...listSelectedStar];
    if (newList.includes(index)) {
      newList.splice(newList.indexOf(index), 1);
    } else {
      newList.push(index);
    }
    console.log('newList: ', newList);
    setListSelectedStar(newList);
  };

  const onMinChange = price => {
    try {
      if (parseFloat(price) > 0) {
        setMinPrice(parseFloat(price));
      }
    } catch (error) {
      setMinPrice(minPrice);
    }
  };

  const onMaxPriceChange = price => {
    try {
      if (parseFloat(price)) {
        setMaxPrice(parseFloat(price));
      }
    } catch (error) {
      setMaxPrice(maxPrice);
    }
  };
  
  const onBack = () => {
    navigation.goBack();
  }

  return (
    <View style={searchResultStyle.container}>
      <ToolBar
        onIconLeftPress={onBack}
        onIconRightPress={onOpenFilter}
        iconLeft={require('../../assets/icons/ic_back.png')}
        iconRight={require('../../assets/icons/ic_filter.png')}
      />
      <FlatList
        data={products}
        renderItem={({item, index}) => (
          <ProductItem product={item} index={index} />
        )}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        style={searchResultStyle.flat}
      />
      <FilterPanel
        minPrice={minPrice}
        maxPrice={maxPrice}
        onMaxPriceChange={onMaxPriceChange}
        onMinPriceChange={onMinChange}
        onStarPress={onStarPress}
        listSelectedStar={listSelectedStar}
        listSelectedBrand={listSelectedBrand}
        onBrandPress={onBrandPress}
        isOpen={filterOpen}
        onClosePress={onCloseFilterPress}
      />
    </View>
  );
};

export default SearchResult;
