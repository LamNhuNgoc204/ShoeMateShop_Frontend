import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import categoryDetailStyle from './style'
import ToolBar from '../../components/ToolBar'
import appst from '../../constants/AppStyle'
import { FlatList } from 'react-native-gesture-handler'
import ProductItem from '../../items/ProductItem'
import FilterPanel from '../../components/FilterPanel'
import { getProductOfCategoryAction } from '../../redux/actions/categoriesAction'
import AxiosInstance from '../../helpers/AxiosInstance'



const CategoryDetail = ({ route, navigation }) => {
  const [filterOpen, setFilterOpen] = useState(false)
  const [listSelectedBrand, setListSelectedBrand] = useState([])
  const [listSelectedStar, setListSelectedStar] = useState([])
  const [minPrice, setMinPrice] = useState(0)
  const [maxPrice, setMaxPrice] = useState(0)
  const { categoryId, name } = route.params;
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [cateName, setCateName] = useState('');

  const getProductOfCategory = async () => {
    try {
      const response = await getProductOfCategoryAction(categoryId);
      setProducts(response)
    } catch (error) {
      console.log(error.message)

    }
  }

  useEffect(() => {
    if (categoryId) {
      getProductOfCategory()
      setCateName(name)
    }
  }, [categoryId, name])


  const onOpenFilter = () => {
    setFilterOpen(true)
  }

  const onCloseFilterPress = () => {
    setFilterOpen(false)
  }

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

  const onStarPress = (index) => {
    const newList = [...listSelectedStar]
    if (newList.includes(index)) {
      newList.splice(newList.indexOf(index), 1)
    } else {
      newList.push(index)
    }
    console.log('newList: ', newList)
    setListSelectedStar(newList)
  }

  const onMinChange = (price) => {
    try {
      if (parseFloat(price) > 0) {
        setMinPrice(parseFloat(price))
      }
    } catch (error) {
      setMinPrice(minPrice)
    }
  }

  const onMaxPriceChange = (price) => {
    try {
      if (parseFloat(price)) {
        setMaxPrice(parseFloat(price))
      }``
    } catch (error) {
      setMaxPrice(maxPrice)
    }
  }

  const onBack = () => {
    navigation.goBack();
  }

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

      const response = await AxiosInstance().post(`/filter/get-products-of-catetory/${categoryId}`, filterData);
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

  useEffect(() => {
    getAllBrand();
  }, []);


  return (
    <View style={[categoryDetailStyle.container, appst.container]}>
      <ToolBar iconLeft={require('../../assets/icons/ic_back.png')} onIconLeftPress={onBack} />
      <View style={[categoryDetailStyle.marginTop16, categoryDetailStyle.headerView]}>
        <Text style={categoryDetailStyle.textContainer}>
          {cateName} {`\n`}
          <Text style={categoryDetailStyle.subContent}>{products.length} products found</Text>
        </Text>

        <TouchableOpacity onPress={onOpenFilter}>
          <Image style={categoryDetailStyle.icon52} source={require('../../assets/icons/ic_filter.png')} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={products}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => <ProductItem product={item} index={index} />}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        style={categoryDetailStyle.marginTop16}
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
  )
}

export default CategoryDetail