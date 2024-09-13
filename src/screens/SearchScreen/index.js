import {View, Text} from 'react-native';
import React from 'react';
import appst from '../../constants/AppStyle';
import searchStyle from './style';
import ToolBar from '../../components/ToolBar';
import SearchInput from '../../components/SearchInput';
import SearchItem from '../../items/SearchItem';
import {FlatList} from 'react-native-gesture-handler';
import {useTranslation} from 'react-i18next';

const searchList = new Array(5).fill(1);

const SearchScreen = () => {
  const {t} = useTranslation();

  return (
    <View style={[appst.container, searchStyle.container]}>
      <ToolBar
        iconLeft={require('../../assets/icons/ic_back.png')}
        title={t('home.search')}
      />
      <SearchInput style={[searchStyle.marginTop16]} />
      <Text style={[searchStyle.searchTitle, searchStyle.marginTop16]}>
        {t('home.search')}
      </Text>
      <FlatList
        data={searchList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <SearchItem
            style={searchStyle.marginTop16}
            content={t('form_input.search_product')}
          />
        )}
      />
    </View>
  );
};

export default SearchScreen;
