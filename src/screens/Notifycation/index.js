import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../components/Header';
import appst from '../../constants/AppStyle';
import {useTranslation} from 'react-i18next';
import NotiMainSkeleton from '../../placeholders/noti';
import st from './style';
import {checkTokenValidity} from '../../utils/functions/checkToken';
import {useNavigation} from '@react-navigation/native';

const Notifycation = () => {
  const {t} = useTranslation();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isTokenValid, setIsTokenValid] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const validateToken = async () => {
      const valid = await checkTokenValidity();
      setIsTokenValid(valid);
    };

    validateToken();
  }, []);

  return (
    <View style={appst.container}>
      <Header name={t('notifications.title')} />
      {isTokenValid ? (
        <View style={{flex: 1}}>
          {!loading ? (
            <View style={{flex: 1}}>
              {notifications.length > 0 ? (
                <FlatList data={notifications} />
              ) : (
                <View style={[{flex: 1}, appst.center]}>
                  <Image
                    style={st.img}
                    source={require('../../assets/images/no_notification.jpg')}
                  />
                  <Text style={st.text}>{t('notifications.sub_title')}!</Text>
                </View>
              )}
            </View>
          ) : (
            <NotiMainSkeleton />
          )}
        </View>
      ) : (
        <View style={st.container2}>
          <Image
            style={st.icon}
            source={require('../../assets/icons/blank_noti.png')}
          />
          <Text style={st.text1}>
            {t('notifications.sub_noti')}{' '}
            <Text
              style={st.text2}
              onPress={() => navigation.replace('LoginScreen')}>
              {t('buttons.btn_signin')}
            </Text>
          </Text>
        </View>
      )}
    </View>
  );
};

export default Notifycation;

const styles = StyleSheet.create({});
