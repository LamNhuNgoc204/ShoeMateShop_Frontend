import React from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const RecentlySkeleton = () => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <SkeletonPlaceholder>
        <View style={styles.productList}>
          {[...Array(10)].map((_, index) => (
            <View key={index} style={styles.productItem} />
          ))}
        </View>
      </SkeletonPlaceholder>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  productList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  productItem: {
    width: 170,
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },
});

export default RecentlySkeleton;
