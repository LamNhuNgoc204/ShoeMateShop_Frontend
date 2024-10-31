import {View, Text, FlatList, TouchableOpacity, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../components/Header';
import {LANGUAGES} from '../../api/mockData';
import {useTranslation} from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Restart from 'react-native-restart';

const ChooseLanguage = ({navigation}) => {
  const {i18n} = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);

  useEffect(() => {
    const loadLanguage = async () => {
      const savedLanguage = await AsyncStorage.getItem('language');
      if (savedLanguage) {
        setSelectedLanguage(savedLanguage);
      }
    };
    loadLanguage();
  }, []);

  const handleLanguageSelect = language => {
    setSelectedLanguage(language);
    i18n.changeLanguage(selectedLanguage);
  };

  const handleConfirmLanguageChange = async () => {
    await AsyncStorage.setItem('language', selectedLanguage);
    Restart.restart();
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <Header
        name={'Chọn ngôn ngữ'}
        iconLeft={require('../../assets/icons/back.png')}
        leftOnPress={() => navigation.goBack()}
        iconRight={require('../../assets/icons/check.png')}
        rightOnPress={handleConfirmLanguageChange}
      />
      <FlatList
        data={LANGUAGES}
        keyExtractor={item => item.value}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => handleLanguageSelect(item.value)}>
            <View
              style={{
                padding: 16,
                borderBottomWidth: 1,
                borderColor: '#ddd',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text style={{fontSize: 16}}>{item.label}</Text>
              {selectedLanguage === item.value && (
                <Image
                  source={require('../../assets/icons/check.png')}
                  style={{width: 20, height: 20, tintColor: 'green'}}
                />
              )}
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default ChooseLanguage;
