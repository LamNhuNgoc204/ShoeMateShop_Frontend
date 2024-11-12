import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const OrderNotification = ({ noti }) => {
    function formatISOString(isoString) {
        const date = new Date(isoString);
        
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
        const year = date.getFullYear();
        
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        
        return `${day}/${month}/${year}, ${hours}:${minutes}`;
      }

  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Image
            source={require('../../assets/icons/delivery-icon.png')}
            style={styles.deliveryIcon}
          />
          <Text style={styles.headerText} numberOfLines={2} ellipsizeMode='tail'>
            {noti.content}
          </Text>
        </View>
        <View style={styles.headerRight}>
          <Text style={styles.dateText}>{formatISOString(noti.createdAt)}</Text>
          <Image
            source={require('../../assets/icons/back_arr.png')}
            style={styles.chevronIcon}
          />
        </View>
      </View>

      {noti.order.orderDetails.map((item, index) => (
        <View key={index} style={styles.itemContainer}>
          <Image source={{ uri: item.product.pd_image[0] || "https://static.vecteezy.com/system/resources/previews/004/141/669/non_2x/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg" }} style={styles.productImage} />
          <View style={styles.itemDetails}>
            <View style={styles.itemHeader}>
              <Text style={styles.productName}>{item.product.name}</Text>
              <Text style={styles.quantity}>x{item.product.pd_quantity}</Text>
            </View>
            <Text style={styles.size}>
              Size: {item.product.size_name}
            </Text>
            <Text style={styles.price}>${item.product.price}</Text>
          </View>
        </View>
      ))}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    margin: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 8,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deliveryIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  headerText: {
    fontSize: 14,
    color: '#1A1A1A',
    flex: 1,
  },
  dateText: {
    fontSize: 12,
    color: '#666666',
    marginRight: 4,
  },
  chevronIcon: {
    width: 16,
    height: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    marginTop: 12,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  itemDetails: {
    flex: 1,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#0066FF',
  },
  quantity: {
    fontSize: 14,
    color: '#666666',
  },
  size: {
    fontSize: 14,
    color: '#666666',
    marginTop: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1A1A1A',
    marginTop: 4,
  },
});

export default OrderNotification;