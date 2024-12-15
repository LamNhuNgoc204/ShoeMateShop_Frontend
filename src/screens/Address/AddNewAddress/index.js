import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ToastAndroid,
  ScrollView,
} from 'react-native';
import PickerSelect from 'react-native-picker-select';
import CustomTextInput from '../../../components/Input';
import {CustomedButton} from '../../../components';
import appst from '../../../constants/AppStyle';
import {useTranslation} from 'react-i18next';
import styles from './style';
import {useNavigation} from '@react-navigation/native';
import AxiosInstance from '../../../helpers/AxiosInstance';
import {useDispatch} from 'react-redux';
import {setAddress} from '../../../redux/reducer/cartReducer';

const AddNewAddress = ({route}) => {
  const {screen} = route.params;
  const navigation = useNavigation();
  const {t} = useTranslation();
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedWard, setSelectedWard] = useState('');
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [addressDetail, setAddressDetail] = useState('');
  const dispatch = useDispatch();

  const [errors, setErrors] = useState({
    fullName: '',
    phoneNumber: '',
    addressDetail: '',
    province: '',
    district: '',
    ward: '',
  });

  useEffect(() => {
    fetch('https://esgoo.net/api-tinhthanh/1/0.htm')
      .then(response => response.json())
      .then(data => {
        if (data.error === 0) {
          setProvinces(data.data);
        }
      })
      .catch(error => console.error(error));
  }, []);

  useEffect(() => {
    if (selectedProvince) {
      fetch(`https://esgoo.net/api-tinhthanh/2/${selectedProvince}.htm`)
        .then(response => response.json())
        .then(data => {
          if (data.error === 0) {
            setDistricts(data.data);
            setWards([]);
          }
        })
        .catch(error => console.error(error));
    }
  }, [selectedProvince]);

  useEffect(() => {
    if (selectedDistrict) {
      fetch(`https://esgoo.net/api-tinhthanh/3/${selectedDistrict}.htm`)
        .then(response => response.json())
        .then(data => {
          if (data.error === 0) {
            setWards(data.data);
          }
        })
        .catch(error => console.error(error));
    }
  }, [selectedDistrict]);

  const validateField = (field, value) => {
    let error = '';

    switch (field) {
      case 'fullName':
        if (!value) {
          error = t('address.name_er');
        }
        break;
      case 'phoneNumber':
        if (!value) {
          error = t('address.phone_err');
        } else if (!/(84|0[3|5|7|8|9])+([0-9]{8})\b/g.test(value)) {
          error = t('address.phone_error');
        }
        break;
      case 'addressDetail':
        if (!value) {
          error = t('address.addres_error');
        }
        break;
      case 'province':
        if (!value) {
          error = t('address.province_error');
        }
        break;
      case 'district':
        if (!value) {
          error = t('address.district_error');
        }
        break;
      case 'ward':
        if (!value) {
          error = t('address.ward_err');
        }
        break;
      default:
        break;
    }

    setErrors(prev => ({...prev, [field]: error}));
  };

  const saveChanges = async () => {
    // Kiểm tra lỗi cho tất cả các trường
    validateField('fullName', fullName);
    validateField('phoneNumber', phoneNumber);
    validateField('addressDetail', addressDetail);
    validateField('province', selectedProvince);
    validateField('district', selectedDistrict);
    validateField('ward', selectedWard);

    // Kiểm tra nếu có lỗi thì dừng việc lưu
    const hasErrors = Object.values(errors).some(error => error !== '');
    if (hasErrors) {
      return;
    }

    const address = `${addressDetail},${findWardName(
      selectedWard,
    )},${findDistrictName(selectedDistrict)},${findProvinceName(
      selectedProvince,
    )}`;
    console.log('Address:', address);

    try {
      const body = {
        address: address,
        recieverPhoneNumber: phoneNumber,
        recieverName: fullName,
        isDefault: true,
      };
      // console.log('body', body);

      const response = await AxiosInstance().post(
        '/addresses/add-address',
        body,
      );
      console.log('response', response);

      if (response.status) {
        setFullName('');
        setPhoneNumber('');
        setAddressDetail('');
        setSelectedProvince('');
        setSelectedWard('');
        setSelectedDistrict('');
        setErrors(null);
        ToastAndroid.show(`${t('address.add_succ')}`, ToastAndroid.SHORT);

        if (screen === 'ChooseAddress') {
          navigation.navigate('ChooseAddress', {
            newAddressItem: response.data,
          });
        }

        if (screen === 'CheckOutScreen') {
          dispatch(setAddress(response.data));
          navigation.navigate('CheckOutScreen');
        }
      } else {
        console.log('loi server');
      }
    } catch (error) {
      console.log('error add address===', error);
    }
  };

  const findProvinceName = value => {
    const province = provinces.find(province => province.id === value);
    return province ? province.full_name : '';
  };

  const findDistrictName = value => {
    const district = districts.find(district => district.id === value);
    return district ? district.full_name : '';
  };

  const findWardName = value => {
    const ward = wards.find(ward => ward.id === value);
    return ward ? ward.full_name : '';
  };
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <View style={appst.rowCenter}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            style={appst.icon40}
            source={require('../../../assets/icons/ic_back.png')}
          />
        </TouchableOpacity>
        <Text style={styles.title}>{t('titles.address')}</Text>
        <View style={{width: 40}} />
      </View>
      <View style={styles.viewBody}>
        <CustomTextInput
          label={t('form_input.fullname')}
          placeholder={t('form_input.placeholder_fullname')}
          onChangeText={text => {
            setFullName(text);
            validateField('fullName', text);
          }}
        />
        {errors?.fullName ? (
          <Text style={styles.errorText}>{errors.fullName}</Text>
        ) : null}
        <CustomTextInput
          label={t('form_input.phone')}
          placeholder={t('form_input.placeholder_phone')}
          keyboardType="numeric"
          onChangeText={text => {
            setPhoneNumber(text);
            validateField('phoneNumber', text);
          }}
        />
        {errors?.phoneNumber ? (
          <Text style={styles.errorText}>{errors.phoneNumber}</Text>
        ) : null}

        <View style={styles.pickerContainer}>
          <Text style={styles.label}>{t('address.sub_province')}:</Text>
          <PickerSelect
            value={selectedProvince}
            onValueChange={value => {
              setSelectedProvince(value);
              validateField('province', value);
            }}
            items={provinces.map(province => ({
              label: province.full_name,
              value: province.id,
            }))}
            placeholder={{label: t('address.province'), value: ''}}
            style={styles.input}
          />
        </View>
        {errors?.province ? (
          <Text style={styles.errorText}>{errors.province}</Text>
        ) : null}

        <View style={styles.pickerContainer}>
          <Text style={styles.label}>{t('address.sub_district')}:</Text>
          <PickerSelect
            value={selectedDistrict}
            onValueChange={value => {
              setSelectedDistrict(value);
              validateField('district', value);
            }}
            items={districts.map(district => ({
              label: district.full_name,
              value: district.id,
            }))}
            placeholder={{label: t('address.district'), value: ''}}
            style={styles.input}
          />
        </View>
        {errors?.district ? (
          <Text style={styles.errorText}>{errors.district}</Text>
        ) : null}

        <View style={styles.pickerContainer}>
          <Text style={styles.label}>{t('address.sub_commune')}:</Text>
          <PickerSelect
            value={selectedWard}
            onValueChange={value => {
              setSelectedWard(value);
              validateField('ward', value);
            }}
            items={wards.map(ward => ({
              label: ward.full_name,
              value: ward.id,
            }))}
            placeholder={{label: t('address.commune'), value: ''}}
            style={styles.input}
          />
        </View>
        {errors?.ward ? (
          <Text style={styles.errorText}>{errors.ward}</Text>
        ) : null}

        <CustomTextInput
          label={t('address.detail')}
          placeholder="123, Nguyen Hue"
          onChangeText={text => {
            setAddressDetail(text);
            validateField('addressDetail', text);
          }}
        />
        {errors?.addressDetail ? (
          <Text style={styles.errorText}>{errors.addressDetail}</Text>
        ) : null}

        <CustomedButton
          title={t('buttons.btn_save_change')}
          titleStyle={styles.textPress}
          onPress={saveChanges}
          style={styles.press}
        />
      </View>
    </ScrollView>
  );
};

export default AddNewAddress;
