import React from 'react';
import {View, StyleSheet} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const SkeletonMyReview = () => {
  return (
    <SkeletonPlaceholder>
      <View style={styles.container}>
        {Array.from({length: 5}).map((_, index) => (
          <View key={index} style={styles.card}>
            <View style={styles.avatar} />

            <View style={styles.reviewInfo}>
              <View style={styles.textLine} />
              <View style={styles.textLineShort} />
            </View>

            <View style={styles.productImage} />
          </View>
        ))}
      </View>
    </SkeletonPlaceholder>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  reviewInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  textLine: {
    height: 16,
    borderRadius: 4,
    marginBottom: 8,
    width: '80%',
  },
  textLineShort: {
    height: 16,
    borderRadius: 4,
    width: '60%',
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
});

export default SkeletonMyReview;
