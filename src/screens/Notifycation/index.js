import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Header from '../../components/Header';
import appst from '../../constants/AppStyle';
import {useTranslation} from 'react-i18next';
import NotiMainSkeleton from '../../placeholders/noti';
import st from './style';

const Notifycation = () => {
  const {t} = useTranslation();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);

  return (
    <View style={appst.container}>
      <Header name={t('notifications.title')} />
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
    </View>
  );
};

export default Notifycation;

const styles = StyleSheet.create({});
