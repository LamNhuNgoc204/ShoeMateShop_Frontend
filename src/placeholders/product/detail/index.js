import React from 'react';
import {View, ScrollView} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import styles from './style';

const ProductSkeleton = () => {
  return (
    <ScrollView style={styles.container}>
      <SkeletonPlaceholder>
        <View style={styles.imageContainer}>
          <View style={styles.imageBox} />
        </View>

        <View style={styles.infoContainer}>
          <View style={styles.title} />
          <View style={styles.price} />
          <View style={styles.rating} />
          <View style={styles.description} />
        </View>

        <View style={styles.button} />

        <View style={styles.productList}>
        {[...Array(6)].map((_, index) => (
          <View key={index} style={styles.productItem} />
        ))}
      </View>
      </SkeletonPlaceholder>
    </ScrollView>
  );
};

export default ProductSkeleton;
