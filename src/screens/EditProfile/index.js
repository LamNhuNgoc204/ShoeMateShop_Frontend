import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {
  Alert,
  Image,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import styles from './style';
import appst from '../../constants/AppStyle';
import {CustomedButton} from '../../components';
import {updateInformation} from '../../api/UserApi';
import CustomTextInput from '../../components/Input';
import {chooseAvatar} from '../../utils/functions/uploadImage';
import {isValidPhoneNumber} from '../../utils/validate/ValidNumber';
import {setAvatarUser} from '../../redux/reducer/userReducer';

const EditProfile = () => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {user} = useSelector(state => state.user);
  const [avatar, setAvatar] = useState(user && user.avatar);
  const [name, setName] = useState(user && user.name);
  const [phoneNumber, setPhoneNumber] = useState(user && user.phoneNumber);
  const [errorName, setErrorName] = useState('');
  const [errorPhone, setErrorPhone] = useState('');

  const updateInfor = async () => {
    setErrorName('');
    setErrorPhone('');

    if (!name) {
      setErrorName(`${t('validate.require')}`);
      return;
    }

    if (phoneNumber && !isValidPhoneNumber(phoneNumber)) {
      setErrorPhone(`${t('validate.phone_err')}`);
      return;
    }

    try {
      const body = {
        name,
        avatar,
        phoneNumber,
      };

      const response = await updateInformation(body);
      if (response) {
        dispatch(setAvatarUser(avatar));
        ToastAndroid.show(`${t('toast.update_succ')}`, ToastAndroid.SHORT);
        navigation.goBack();
      } else {
        ToastAndroid.show(`${t('toast.del_err')}`, ToastAndroid.SHORT);
      }
    } catch (error) {
      console.log('Update error: ', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={appst.rowCenter}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            style={appst.icon40}
            source={require('../../assets/icons/ic_back.png')}
          />
        </TouchableOpacity>
        <Text style={styles.title}>{t('home.profile')}</Text>
        <View style={{width: 40}} />
      </View>
      <View>
        <View style={appst.center}>
          <Image
            style={styles.avatar}
            source={{
              uri: avatar
                ? avatar
                : 'https://i.pinimg.com/enabled_hi/564x/d4/35/42/d435423c9386e708c678b7663656b9c0.jpg',
            }}
          />
          <TouchableOpacity onPress={() => chooseAvatar(setAvatar)}>
            <Text style={styles.text}>
              {t('buttons.btn_change_img_profile')}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.ViewInput}>
          <CustomTextInput
            label={t('form_input.name')}
            placeholder={t('form_input.placeholder_name')}
            value={name}
            onChangeText={setName}
          />
          {errorName ? <Text style={styles.errorText}>{errorName}</Text> : null}
          <CustomTextInput
            label={t('form_input.phone')}
            placeholder={t('form_input.placeholder_phone')}
            value={phoneNumber}
            keyboardtype="numeric"
            onChangeText={setPhoneNumber}
          />
          {errorPhone ? (
            <Text style={styles.errorText}>{errorPhone}</Text>
          ) : null}
        </View>
      </View>
      <View>
        <CustomedButton
          title={t('buttons.btn_save_now')}
          titleStyle={styles.textPress}
          onPress={() => updateInfor()}
          style={styles.press}
        />
      </View>
    </View>
  );
};

export default EditProfile;
