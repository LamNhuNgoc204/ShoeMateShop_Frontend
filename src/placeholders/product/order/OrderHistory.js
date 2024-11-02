import React from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const OrderHistorySkeleton = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Skeleton for each order card */}
      {[...Array(2)].map((_, index) => (
        <SkeletonPlaceholder key={index}>
          <View style={styles.orderCard}>
            <View style={styles.image} />
            <View style={styles.details}>
              <View style={styles.title} />
              <View style={styles.subtitle} />
              <View style={styles.size} />
              <View style={styles.price} />
            </View>
          </View>
        </SkeletonPlaceholder>
      ))}

      {/* Skeleton for "You May Also Like" section */}
      <View style={styles.recommendationContainer}>
        <SkeletonPlaceholder>
          <View style={styles.recommendationTitle} />
          <View style={styles.recommendationList}>
            {[...Array(4)].map((_, index) => (
              <View key={index} style={styles.recommendationCard}>
                <View style={styles.recommendationImage} />
                <View style={styles.recommendationText} />
                <View style={styles.recommendationPrice} />
              </View>
            ))}
          </View>
        </SkeletonPlaceholder>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  orderCard: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  details: {
    flex: 1,
    marginLeft: 12,
  },
  title: {
    width: '70%',
    height: 20,
    borderRadius: 4,
  },
  subtitle: {
    width: '50%',
    height: 16,
    marginTop: 8,
    borderRadius: 4,
  },
  size: {
    width: '40%',
    height: 16,
    marginTop: 8,
    borderRadius: 4,
  },
  price: {
    width: '30%',
    height: 16,
    marginTop: 8,
    borderRadius: 4,
  },
  recommendationContainer: {
    marginTop: 16,
  },
  recommendationTitle: {
    width: '40%',
    height: 20,
    borderRadius: 4,
    marginBottom: 12,
  },
  recommendationList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  recommendationCard: {
    width: '48%',
    padding: 10,
    marginBottom: 16,
    borderRadius: 8,
  },
  recommendationImage: {
    width: '100%',
    height: 80,
    borderRadius: 8,
  },
  recommendationText: {
    width: '70%',
    height: 16,
    marginTop: 8,
    borderRadius: 4,
  },
  recommendationPrice: {
    width: '50%',
    height: 16,
    marginTop: 8,
    borderRadius: 4,
  },
});

export default OrderHistorySkeleton;
