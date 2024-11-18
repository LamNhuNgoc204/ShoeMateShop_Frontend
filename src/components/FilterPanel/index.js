import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Modal,
} from 'react-native';
import React from 'react';
import filterPanelStyle from './style';
import appst from '../../constants/AppStyle';
import CustomedButton from '../Button';
import {useTranslation} from 'react-i18next';

const star = new Array(5).fill(1);

const FilterPanel = ({
  isOpen,
  listSelectedBrand,
  listBrand,
  listSelectedStar,
  minPrice,
  maxPrice,
  onMinPriceChange,
  onMaxPriceChange,
  onClosePress,
  onConfirmPress,
  onBrandPress,
  onStarPress,
}) => {
  // console.log('listSelectedBrand', listSelectedBrand);
  // console.log('listSelectedStar', listSelectedStar);
  const {t} = useTranslation();

  return (
    <View
      style={[
        filterPanelStyle.container,
        appst.container,
        !isOpen && filterPanelStyle.hide,
      ]}>
      <View style={[filterPanelStyle.overlay]} />
      <Modal style={appst.container} transparent visible={isOpen}>
        <View style={filterPanelStyle.panel}>
          <Text style={filterPanelStyle.title}>{t('search.filter')}</Text>
          <Text style={filterPanelStyle.subTitle}>{t('search.brand')}</Text>
          <View style={filterPanelStyle.wrapContainer}>
            {listBrand.map((item, index) => {
              return (
                <TouchableOpacity
                  onPress={() => onBrandPress(item._id)}
                  key={index}
                  style={[
                    filterPanelStyle.view44,
                    listSelectedBrand?.includes(item._id) &&
                      filterPanelStyle.selected,
                  ]}>
                  <Image
                    style={filterPanelStyle.icon34}
                    source={{uri: item.image}}
                  />
                </TouchableOpacity>
              );
            })}
          </View>

          <Text style={filterPanelStyle.subTitle}>{t('search.price')}</Text>
          <View style={filterPanelStyle.priceFilterConTainer}>
            <TextInput
              onChangeText={onMinPriceChange}
              value={minPrice}
              keyboardType="decimal-pad"
              placeholder={t('search.min_price')}
              style={filterPanelStyle.priceInput}
            />
            <Text style={filterPanelStyle.minus}> - </Text>
            <TextInput
              onChangeText={onMaxPriceChange}
              value={maxPrice}
              keyboardType="decimal-pad"
              placeholder={t('search.max_price')}
              style={filterPanelStyle.priceInput}
            />
          </View>

          <Text style={filterPanelStyle.subTitle}>{t('search.rate')}</Text>

          <View style={filterPanelStyle.wrapContainer}>
            {star.map((item, index) => {
              return (
                <TouchableOpacity
                  onPress={() => onStarPress(index)}
                  key={index}
                  style={[
                    filterPanelStyle.viewStar,
                    listSelectedStar?.includes(index) &&
                      filterPanelStyle.selected,
                  ]}>
                  <Text style={filterPanelStyle.startText}>
                    {index + ' - ' + (index + 1)}
                  </Text>
                  <Image
                    source={require('../../assets/icons/star.png')}
                    style={filterPanelStyle.star}
                  />
                </TouchableOpacity>
              );
            })}
          </View>

          <View style={filterPanelStyle.spacer} />
          <CustomedButton
            onPress={onConfirmPress}
            titleStyle={filterPanelStyle.textButton}
            style={filterPanelStyle.button}
            title={t('buttons.btn_confirm')}
          />
          <CustomedButton
            onPress={onClosePress}
            titleStyle={filterPanelStyle.textButtonClose}
            style={filterPanelStyle.buttonClose}
            title={t('buttons.close')}
          />
        </View>
      </Modal>
    </View>
  );
};

export default FilterPanel;
