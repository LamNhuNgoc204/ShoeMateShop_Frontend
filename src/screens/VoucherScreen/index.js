import {View, Text, TouchableOpacity, Image, ToastAndroid} from 'react-native';
import React, {useEffect, useState} from 'react';
import appst from '../../constants/AppStyle';
import Header from '../../components/Header';
import style from './style';
import {FlatList, TextInput} from 'react-native-gesture-handler';
import VoucherBgSvg from './VoucherBg';
import styleItem from './styleItem';
import AxiosInstance from '../../helpers/AxiosInstance';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import Toast from 'react-native-toast-message';

const VoucherScreen = ({route}) => {
  const {t} = useTranslation();
  const totalOrderValue = route?.params?.totalOrderValue || 0;
  const navigation = useNavigation();
  const [vouchers, setVouchers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const handleApplyVoucher = async item => {
    if (totalOrderValue == 0) {
      navigation.navigate('CartScreen');
    } else {
      try {
        const response = await AxiosInstance().post('/vouchers/apply', {
          voucher_code: item.voucher_code,
          totalOrderValue: totalOrderValue,
        });
        console.log('response', response);
        if (response.code =="success" ) {
          Toast.show({
            type: 'success',
            text1: t('search.use_vc'),
            position: 'bottom',
          });
         
          navigation.navigate('CheckOutScreen', {responseVoucher: response});
        }else if(response.code == "minordervalue") {

          Toast.show({
            type: 'error',
            text1: t('search.voucher_condition_error'),
            position: 'bottom',
          });
        }
         else if(response.code == "usedBy") {
          ToastAndroid.show(`${t('search.used_vc')}`, ToastAndroid.SHORT);
        } else if(response.code == "quantity") {
          Toast.show({
            text1: `${t('search.voucher_out_of_stock')}`,
            type: 'error',
            position: 'bottom',
          });
        }else {
          Toast.show({
            text1: `${t('search.voucher_min_order')}`,
            type: 'error',
            position: 'bottom',
          });
        }
      } catch (error) {
        console.log(error);
        Toast.show({
          text1: `${t('search.voucher_error')}`,
          type: 'error',
          position: 'bottom',
        });
      }
    }
  };

  // Lấy danh sách voucher mặc định
  useEffect(() => {
    const getDefaultVouchers = async () => {
      setIsLoading(true);
      try {
        const response = await AxiosInstance().get('/vouchers/list');
        if (response.status) {
          setVouchers(response.data);
        } else {
          setVouchers([]);
          Toast.show({
            text1: `${t('search.get_vc_err')}`,
            type: 'error',
            position: 'bottom',
          });
        }
      } catch (error) {
        setVouchers([]);
        Toast.show({
          text1: `${t('search.get_vc_err')}`,
          type: 'error',
          position: 'bottom',
        });
      } finally {
        setIsLoading(false);
      }
    };
    getDefaultVouchers();
  }, []);

  // Tìm kiếm voucher theo từ khóa
  const searchVouchers = async () => {
    if (!searchQuery.trim()) {
      Toast.show({
        text1: `${t('search.key')}`,
        type: 'error',
        position: 'bottom',
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await AxiosInstance().get(
        `/vouchers/search?query=${searchQuery}`,
      );
      if (response.length > 0) {
        setVouchers(response);
      } else {
        setVouchers([]);
        Toast.show({
          text1: `${t('search.not_found')}`,
          type: 'error',
          position: 'bottom',
        });
      }
    } catch (error) {
      setVouchers([]);
      Toast.show({
        text1: `${t('search.get_vc_err')}`,
        type: 'error',
        position: 'bottom',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={[appst.container, style.container]}>
      <Header
        leftOnPress={() => navigation.goBack()}
        iconLeft={require('../../assets/icons/back.png')}
        iconRight={require('../../assets/icons/mycart.png')}
        name={'Vouchers'}
      />
      <SearchSection
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSearch={searchVouchers}
      />
      {isLoading ? (
        <Text style={style.loadingText}>{t('search.loading')}</Text>
      ) : vouchers.length > 0 ? (
        <FlatList
          data={vouchers}
          renderItem={({item}) => (
            <VoucherItem item={item} handleApplyVoucher={handleApplyVoucher} />
          )}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          style={style.flat}
          contentContainerStyle={style.flatContainer}
        />
      ) : (
        <Text style={style.noVoucherText}>{t('search.vcc')}</Text>
      )}
    </View>
  );
};

const VoucherItem = ({item, handleApplyVoucher}) => {
  const {t} = useTranslation();

  function formatDate(isoDate) {
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  return (
    <View style={[styleItem.container]}>
      <VoucherBgSvg style={styleItem.svgbg} />
      <View style={styleItem.headerContainer}>
        <Text style={styleItem.voucherTxt}>{t('voucher.vc')}</Text>
        <Text style={styleItem.validText}>{item.voucher_code}</Text>
      </View>
      <View style={styleItem.bottomView}>
        <View style={styleItem.flexRow}>
          <Image source={require('../../assets/icons/bag_icon.png')} />
          <Text style={styleItem.firstPurchase}>{item.voucher_name}</Text>
        </View>
        <View style={styleItem.headerContainer}>
          <Text style={styleItem.endow}>
            {t('voucher.end_date')} {formatDate(item.expiry_date)}
          </Text>
          <TouchableOpacity
            style={[styleItem.buttonClaimContainer]}
            onPress={() => handleApplyVoucher(item)}>
            <Text style={[styleItem.buttonClaimText]}>{t('voucher.use')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const SearchSection = ({searchQuery, setSearchQuery, onSearch}) => {
  return (
    <View style={style.searchSection}>
      <TextInput
        placeholder="Looking Voucher"
        value={searchQuery}
        onChangeText={text => setSearchQuery(text)}
        style={style.inputText}
      />
      <TouchableOpacity style={style.buttonSearch} onPress={onSearch}>
        <Text style={style.btnText}>Search</Text>
      </TouchableOpacity>
    </View>
  );
};

export default VoucherScreen;
