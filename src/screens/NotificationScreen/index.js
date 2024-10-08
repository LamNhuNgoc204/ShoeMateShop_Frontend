import {
    View,
    Text,
    FlatList,
    Image,
    TouchableOpacity,
    ScrollView,
  } from 'react-native';
  import React from 'react';
  import appst from '../../constants/AppStyle';
  import styles from './style';
  import Header from '../../components/Header';
  import {colors} from '../../constants/colors';
  
  const NotificationScreen = () => {

    const notifications = [
        {
          status: 'Your order has been confirmed and is on its way to you',
          date: '12/04/2024',
          time: '22:12',
          products: [
            {
              name: 'Nike Air Force I',
              image: 'https://assets.adidas.com/images/w_600,f_auto,q_auto/a3b3c26ba11f450a9f91ae9b00f43cb9_9366/Giay_Galaxy_6_DJen_GW3847_01_standard.jpg', // Thay bằng link hình ảnh thực tế
              sizes: '32 (x1), 33 (x2)',
              price: '$364.95',
              quantity: 3,
            },
            {
              name: 'We Have New Products With Offers',
              image: 'https://assets.adidas.com/images/w_600,f_auto,q_auto/a3b3c26ba11f450a9f91ae9b00f43cb9_9366/Giay_Galaxy_6_DJen_GW3847_01_standard.jpg',
              sizes: '32 (x1)',
              price: '$364.95',
              quantity: 1,
            },
          ],
          icon: 'https://assets.adidas.com/images/w_600,f_auto,q_auto/a3b3c26ba11f450a9f91ae9b00f43cb9_9366/Giay_Galaxy_6_DJen_GW3847_01_standard.jpg', // Thay bằng link hình ảnh icon
        },
        {
          status: 'Order successful, please wait for seller confirmation',
          date: '12/04/2024',
          time: '22:12',
          products: [
            {
              name: 'Nike Air Force I',
              image: 'https://assets.adidas.com/images/w_600,f_auto,q_auto/a3b3c26ba11f450a9f91ae9b00f43cb9_9366/Giay_Galaxy_6_DJen_GW3847_01_standard.jpg',
              sizes: '32 (x1), 33 (x2)',
              price: '$364.95',
              quantity: 3,
            },
            {
              name: 'We Have New Products With Offers',
              image: 'https://assets.adidas.com/images/w_600,f_auto,q_auto/a3b3c26ba11f450a9f91ae9b00f43cb9_9366/Giay_Galaxy_6_DJen_GW3847_01_standard.jpg',
              sizes: '32 (x1)',
              price: '$364.95',
              quantity: 1,
            },
          ],
          icon: 'https://assets.adidas.com/images/w_600,f_auto,q_auto/a3b3c26ba11f450a9f91ae9b00f43cb9_9366/Giay_Galaxy_6_DJen_GW3847_01_standard.jpg',
        },
      ];


    return (
      <View style={[appst.container, styles.container]}>
        <Header
          iconLeft={require('../../assets/icons/back.png')}
          leftOnPress={() => navigation.goBack()}
          name={'Notification'}
          rightOnPress={() => navigation.navigate()}
          iconRight={require('../../assets/icons/mycart.png')}
          backgroundColor={colors.background_secondary}
        />
       
       <ScrollView style={styles.container}>
      <Text style={styles.sectionTitle}>Today</Text>
      {notifications.map((notification, index) => (
        <View key={index} style={styles.notificationCard}>
          <View style={styles.header}>
            <Image source={require('../../assets/icons/ic_shipping.png')} />
            <Text style={styles.statusText}>{notification.status}</Text>
            <View style={styles.dateTimeContainer}>
              <Text style={styles.dateText}>{notification.date}</Text>
              <Text style={styles.timeText}>{notification.time}</Text>
            </View>
          </View>
          {notification.products.map((product, idx) => (
            <View key={idx} style={styles.product}>
              <Image source={{ uri: product.image }} style={styles.productImage} />
              <View style={styles.productDetails}>
                <Text style={styles.productName}>{product.name}</Text>
                <Text style={styles.productSizes}>Size: {product.sizes}</Text>
                <Text style={styles.productPrice}>{product.price}</Text>
                <Text style={styles.productQuantity}>x{product.quantity}</Text>
              </View>
            </View>
          ))}
        </View>
      ))}
      <Text style={styles.sectionTitle}>Other</Text>
    \
    </ScrollView>




      </View>
    );
  };
  
  export default NotificationScreen;
  