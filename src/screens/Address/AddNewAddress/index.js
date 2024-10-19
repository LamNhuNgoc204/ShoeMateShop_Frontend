import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import PickerSelect from 'react-native-picker-select';
import CustomTextInput from '../../../components/Input';
import {CustomedButton} from '../../../components';
import appst from '../../../constants/AppStyle';
import {useTranslation} from 'react-i18next';
import styles from './style';

const AddNewAddress = () => {
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
  const [address, setAddress] = useState('');

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

  const saveChanges = () => {
    const address = `${addressDetail},${findWardName(
      selectedWard,
    )},${findDistrictName(selectedDistrict)},${findProvinceName(
      selectedProvince,
    )}`;
    setAddress(address);
    console.log('Address:', address);
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
    <View style={styles.container}>
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
          onChangeText={text => setFullName(text)}
        />
        <CustomTextInput
          label={t('form_input.phone')}
          placeholder={t('form_input.placeholder_phone')}
          keyboardType="numeric"
          onChangeText={text => setPhoneNumber(text)}
        />

        <View style={styles.pickerContainer}>
          <Text style={styles.label}>Chọn Tỉnh:</Text>
          <PickerSelect
            value={selectedProvince}
            onValueChange={value => setSelectedProvince(value)}
            items={provinces.map(province => ({
              label: province.full_name,
              value: province.id,
            }))}
            placeholder={{label: 'Tỉnh Thành', value: ''}}
            style={styles.input}
          />
        </View>

        <View style={styles.pickerContainer}>
          <Text style={styles.label}>Chọn Huyện:</Text>
          <PickerSelect
            value={selectedDistrict}
            onValueChange={value => setSelectedDistrict(value)}
            items={districts.map(district => ({
              label: district.full_name,
              value: district.id,
            }))}
            placeholder={{label: 'Quận Huyện', value: ''}}
            style={styles.input}
          />
        </View>

        <View style={styles.pickerContainer}>
          <Text style={styles.label}>Chọn Phường:</Text>
          <PickerSelect
            value={selectedWard}
            onValueChange={value => setSelectedWard(value)}
            items={wards.map(ward => ({
              label: ward.full_name,
              value: ward.id,
            }))}
            placeholder={{label: 'Phường Xã', value: ''}}
            style={styles.input}
          />
        </View>

        <CustomTextInput
          label="Detail address"
          placeholder="123, Nguyen Hue"
          onChangeText={text => setAddressDetail(text)}
        />

        <CustomedButton
          title={t('buttons.btn_save_change')}
          titleStyle={styles.textPress}
          onPress={saveChanges}
          style={styles.press}
        />
      </View>
    </View>
  );
};

export default AddNewAddress;
