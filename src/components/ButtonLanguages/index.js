import React, {memo, useEffect, useState} from 'react';
import i18next from 'i18next';
import {View} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './style';
import {LANGUAGES} from '../../api/mockData';

const DropdownComponent = memo(() => {
  const [value, setValue] = useState('vi');
  const [isFocus, setIsFocus] = useState(false);

  useEffect(() => {
    const loadLanguage = async () => {
      const storedLanguage = await AsyncStorage.getItem('language');
      if (storedLanguage) {
        setValue(storedLanguage);
        i18next.changeLanguage(storedLanguage);
      }
    };
    loadLanguage();
  }, []);

  const handleChangeLanguage = async item => {
    setValue(item.value);
    await AsyncStorage.setItem('language', item.value);
    i18next.changeLanguage(item.value);
    setIsFocus(false);
  };

  return (
    <View style={styles.container}>
      <Dropdown
        style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        data={LANGUAGES}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? 'Select item' : '...'}
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={handleChangeLanguage}
      />
    </View>
  );
});

export default DropdownComponent;
