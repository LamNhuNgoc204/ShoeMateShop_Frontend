import { View, Text, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import appst from '../../constants/AppStyle';
import searchStyle from './style';
import ToolBar from '../../components/ToolBar';
import SearchInput from '../../components/SearchInput';
import SearchItem from '../../items/SearchItem';
import { useTranslation } from 'react-i18next';
import AxiosInstance from '../../helpers/AxiosInstance';
import { useIsFocused } from '@react-navigation/native';
import { CustomedButton } from '../../components';

const SearchScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const [text, setText] = useState("");
  const [searchs, setSearchs] = useState([]);
  const isFocus = useIsFocused();

  // Fetch search data when screen is focused
  useEffect(() => {
    if (isFocus) {
      getSearchs();
    }
  }, [isFocus]);

  // Fetch search history
  const getSearchs = async () => {
    try {
      const response = await AxiosInstance().get('/users/get-searchs');
      if (response.status && Array.isArray(response.data)) {
        setSearchs(response.data.reverse());
      } else {
        console.error('Error fetching search data:', response.message || 'Invalid format');
      }
    } catch (e) {
      console.error('Error:', e.message);
    }
  };

  const removeSearch = async (search) => {
    try {
      const response = await AxiosInstance().put('/users/remove-search', {
        search: search
      });
      console.log(response)
      if(response.status) {
        getSearchs()
      }
    } catch (error) {
      console.error('Error:', error.message);
      
    }
  }


  

  // Handle search submission
  const onSubmit = () => {
    if (!text.trim()) return; // Ignore empty input
    navigation.replace('SearchResult', { key: text.trim(), searchs: searchs });
  };

  return (
    <View style={[appst.container, searchStyle.container]}>
      {/* Toolbar */}
      <ToolBar
        onIconLeftPress={() => navigation.goBack()}
        iconLeft={require('../../assets/icons/ic_back.png')}
        title={t('home.search')}
      />

      {/* Search Input */}
      <SearchInput 
        value={text}
        onChangeText={setText}
        handleSubmit={onSubmit}
        autoFocus={true} 
        style={[searchStyle.marginTop16]} />

      {/* Search Button */}
      <CustomedButton
        title={t('home.search')}
        style={{ marginTop: 10 }}
        disabled={!text.trim()} // Disable button if text is empty
        onPress={onSubmit}
      />

      {/* Search Title */}
      <Text style={[searchStyle.searchTitle, searchStyle.marginTop16]}>{t('home.search')}</Text>

      {/* Search List */}
      <FlatList
        data={searchs}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <SearchItem onItemPress={() => {
            navigation.navigate('SearchResult', {
              key: item,
              searchs: searchs
            });
          }} style={searchStyle.marginTop16} onRemove={()=>removeSearch(item)} content={item} />
        )}
        ListEmptyComponent={<Text>{t('Chưa có tìm kiếm nào')}</Text>} // Show when no data
      />
    </View>
  );
};

export default SearchScreen;
