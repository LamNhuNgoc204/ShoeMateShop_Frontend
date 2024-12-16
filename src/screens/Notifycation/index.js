import React, {useEffect, useState} from 'react';
import {FlatList, Image, Text, View} from 'react-native';
import Header from '../../components/Header';
import appst from '../../constants/AppStyle';
import {useTranslation} from 'react-i18next';
import NotiMainSkeleton from '../../placeholders/noti';
import st from './style';
import NotificationItem from '../../components/NotificationItem';
import AxiosInstance from '../../helpers/AxiosInstance';
import {formatDate} from '../MessageScreen';

const Notifycation = ({navigation}) => {
  const {t} = useTranslation();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const getNotifications = async () => {
    try {
      setLoading(true);
      const response = await AxiosInstance().get(
        '/notifications/notifications-user',
      );
      console.log('noti response: ', response.data);
      if (response.status) {
        const newNotis = groupDate(response.data.reverse());
        setNotifications(newNotis);
        setRefreshing(false);
      } else {
        console.log('errr: ', response.message);
      }
      setLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  const onNotiPress = async item => {
    try {
      const response = await AxiosInstance().put(
        '/notifications/read-notification/' + item._id,
      );
      if (response.status) {
        const index = notifications.findIndex(noti => noti._id === item._id);
        let newNotification = [...notifications];
        newNotification[index].isRead = true;
        setNotifications(newNotification);
      } else {
        console.log('errr: ', response.message);
      }
      navigation.navigate('OrderDetail', {
        item: {
          _id: item.order_id,
        },
      });
    } catch (error) {
      console.log('errr: ', error);
    }
  };

  const groupDate = notis => {
    const formatDate = isoString => {
      const date = new Date(isoString);
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    };
    var date;
    const newNotis = notis.map(noti => {
      if (!date || date != formatDate(noti.createdAt)) {
        date = formatDate(noti.createdAt);
        return {
          ...noti,
          isShowDate: true,
        };
      } else {
        return {
          ...noti,
          isShowDate: false,
        };
      }
    });

    return newNotis;
  };

  useEffect(() => {
    getNotifications();
  }, []);

  return (
    <View style={appst.container}>
      <Header name={t('notifications.title')} />
      <View style={{flex: 1}}>
        {!loading ? (
          notifications.length == 0 ? (
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
            <FlatList
              refreshing={refreshing}
              onRefresh={() => {
                setRefreshing(false);
                getNotifications();
              }}
              data={notifications}
              renderItem={({item}) => (
                <>
                  {item.isShowDate ? (
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: '600',
                        color: 'black',
                        marginVertical: 20,
                        marginLeft: 20,
                      }}>
                      {formatDate(item.createdAt)}
                    </Text>
                  ) : (
                    <View></View>
                  )}
                  <NotificationItem
                    onPress={() => {
                      onNotiPress(item);
                    }}
                    noti={item}
                  />
                </>
              )}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, id) => id.toString()}
              style={{flex: 1}}
            />
          )
        ) : (
          <NotiMainSkeleton />
        )}
      </View>
    </View>
  );
};

export default Notifycation;
