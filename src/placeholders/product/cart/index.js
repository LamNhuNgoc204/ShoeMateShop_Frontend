import React from 'react';
import {View, StyleSheet} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const CartPlaceholder = () => {
  return (
    <View style={{flex: 1}}>
      <SkeletonPlaceholder>
        <View style={styles.header}>
          <View style={styles.circle} />
          <View style={styles.title} />
        </View>

        <View style={styles.cartItem}>
          <View style={styles.checkbox} />
          <View style={styles.image} />
          <View style={styles.details}>
            <View style={styles.productName} />
            <View style={styles.productPrice} />
            <View style={styles.productSize} />
            <View style={styles.quantityControls}>
              <View style={styles.button} />
              <View style={styles.quantity} />
              <View style={styles.button} />
            </View>
          </View>
        </View>

        <View style={styles.cartItem}>
          <View style={styles.checkbox} />
          <View style={styles.image} />
          <View style={styles.details}>
            <View style={styles.productName} />
            <View style={styles.productPrice} />
            <View style={styles.productSize} />
            <View style={styles.quantityControls}>
              <View style={styles.button} />
              <View style={styles.quantity} />
              <View style={styles.button} />
            </View>
          </View>
        </View>

        <View style={styles.cartItem}>
          <View style={styles.checkbox} />
          <View style={styles.image} />
          <View style={styles.details}>
            <View style={styles.productName} />
            <View style={styles.productPrice} />
            <View style={styles.productSize} />
            <View style={styles.quantityControls}>
              <View style={styles.button} />
              <View style={styles.quantity} />
              <View style={styles.button} />
            </View>
          </View>
        </View>

        <View style={styles.cartItem}>
          <View style={styles.checkbox} />
          <View style={styles.image} />
          <View style={styles.details}>
            <View style={styles.productName} />
            <View style={styles.productPrice} />
            <View style={styles.productSize} />
            <View style={styles.quantityControls}>
              <View style={styles.button} />
              <View style={styles.quantity} />
              <View style={styles.button} />
            </View>
          </View>
        </View>

        <View style={styles.cartItem}>
          <View style={styles.checkbox} />
          <View style={styles.image} />
          <View style={styles.details}>
            <View style={styles.productName} />
            <View style={styles.productPrice} />
            <View style={styles.productSize} />
            <View style={styles.quantityControls}>
              <View style={styles.button} />
              <View style={styles.quantity} />
              <View style={styles.button} />
            </View>
          </View>
        </View>
      </SkeletonPlaceholder>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  title: {
    marginLeft: 10,
    width: 200,
    height: 20,
    borderRadius: 4,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    marginRight: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 10,
  },
  details: {
    flex: 1,
  },
  productName: {
    width: '80%',
    height: 20,
    borderRadius: 4,
    marginBottom: 6,
  },
  productPrice: {
    width: '60%',
    height: 20,
    borderRadius: 4,
    marginBottom: 6,
  },
  productSize: {
    width: '40%',
    height: 20,
    borderRadius: 4,
    marginBottom: 10,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    width: 30,
    height: 30,
    borderRadius: 4,
  },
  quantity: {
    width: 30,
    height: 20,
    borderRadius: 4,
    marginHorizontal: 8,
  },
});

export default CartPlaceholder;
