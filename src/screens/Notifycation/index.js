import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import appst from '../../constants/AppStyle';
import { useTranslation } from 'react-i18next';
import NotiMainSkeleton from '../../placeholders/noti';
import st from './style';
import NotificationItem from '../../components/NotificationItem';
import OrderNotification from '../../components/NotificationItem';
import AxiosInstance from '../../helpers/AxiosInstance';

const Notifycation = () => {
  const { t } = useTranslation();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const getNotifications =async () =>{
    try {
      setLoading(true);
      const response = await AxiosInstance().get('/notifications/notifications-user')
      console.log('noti response: ', response.data)
      if(response.status) {
        setNotifications(response.data)
      }else {
        console.log('errr: ', response.message)
      }
      setLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    getNotifications();
  }, []);

  return (
    <View style={appst.container}>
      <Header name={t('notifications.title')} />
      <View style={{ flex: 1 }}>
        {!loading ? (
          <View style={{ flex: 1 }}>
            {notifications.length > 0 ? (
              <FlatList data={notifications} />
            ) : (
              <View style={[{ flex: 1 }, appst.center]}>
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
        <FlatList
        data={notifications}
        renderItem={({item}) => <NotificationItem noti={item}/>}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, id) => id.toString()}
        style={{flex: 1}}/>

      </View>
    </View>
  );
};

export default Notifycation;

const styles = StyleSheet.create({});
