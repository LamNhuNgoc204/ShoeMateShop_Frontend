import { Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import searchResultStyle from './style';
import ToolBar from '../../components/ToolBar';
import { FlatList } from 'react-native-gesture-handler';
import ProductItem from '../../items/ProductItem';
import FilterPanel from '../../components/FilterPanel';
import AxiosInstance from '../../helpers/AxiosInstance';


const SearchResult = ({ navigation, route }) => {
  const [filterOpen, setFilterOpen] = useState(false);
  const [listSelectedBrand, setListSelectedBrand] = useState([]);
  const [listSelectedStar, setListSelectedStar] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [products, setProducts] = useState([]);
  const [preSearch, setPreSearch] = useState();
  const [brands, setBrands] = useState([]);
  const {key, searchs} = route.params;

  const onOpenFilter = () => {
    setFilterOpen(true);
  };

  const onCloseFilterPress = () => {
    setFilterOpen(false);
  };

  const onBrandPress = brandId => {
    let newList = [...listSelectedBrand];
    if (newList.includes(brandId)) {
      newList = newList.filter(e => brandId !== e);
    } else {
      newList.push(brandId);
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
    navigation.reset({
      index: 0,
      routes: [{ name: 'BottomNav' }],
    });
    
  }

  const onSubmit = async (keyText) => {
    try {
      if (keyText == "") {
        return;
      }
      const response = await AxiosInstance().get(`/products/search?query=${keyText}`);
      setProducts(response)
      setPreSearch(keyText)
      addSearch(keyText)
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    onSubmit(key);
  }, [key])

  const getAllBrand = async () => {
    try {
      const response = await AxiosInstance().get('/brands/get-all-brand');
      if (response.status) {
        setBrands(response.data);
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  const onFilterPress = async () => {
    try {
      if(minPrice > maxPrice) {
        return;
      }
      const filterData = {
        brands: listSelectedBrand,
        minPrice: parseFloat(minPrice),
        maxPrice: parseFloat(maxPrice)
      }

      const response = await AxiosInstance().post(`/filter/search?query=${preSearch}`, filterData);
      if (response.status) {
        setProducts(response.data);
      } else {
        console.log(error.message)
      }
      setFilterOpen(false);
    } catch (error) {
      console.log(error.message)

    }
  }


  const addSearch = async (search) => {
    try {
      const response = await AxiosInstance().put('/users/add-search', {
        search: search 
      })
      if(response.status) {
        console.log('add search success')
      } else {
        console.log('add search fail: ', response.message)
      }
    } catch (error) {
      console.log(error.message)
      
    }
  }

  useEffect(() => {
    getAllBrand();
  }, []);

  return (
    <View style={searchResultStyle.container}>
      <ToolBar
        onEditPress={()=> {
          navigation.navigate('SearchScreen');
        }}
        editable={false}
        onChangeText={(txt) => setkeyText(txt)}
        onIconLeftPress={onBack}
        onIconRightPress={onOpenFilter}
        iconLeft={require('../../assets/icons/back.png')}
        iconRight={require('../../assets/icons/ic_filter.png')}
      />
      <FlatList
        ListHeaderComponent={<Text style={{fontSize: 16, fontWeight: '600', color: 'black', margin: 20}} >{`Kết quả tìm kiếm cho "${preSearch}", ${products.length} kết quả`}</Text>}
        data={products}
        renderItem={({ item, index }) => (
          <ProductItem product={item} index={index} />
        )}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        style={searchResultStyle.flat}
      />
      <FilterPanel
        onConfirmPress={onFilterPress}
        listBrand={brands}
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
