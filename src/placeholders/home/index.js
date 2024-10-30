import React from 'react';
import {View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import appst from '../../constants/AppStyle';
import styles from './style';

const HomeSkeleton = () => (
  <View style={appst.container}>
    <SkeletonPlaceholder>
      <View style={styles.banner} />

      <View style={styles.categoryList}>
        {[...Array(10)].map((_, index) => (
          <View key={index} style={styles.categoryItem} />
        ))}
      </View>

      <View style={styles.productList}>
        {[...Array(6)].map((_, index) => (
          <View key={index} style={styles.productItem} />
        ))}
      </View>
    </SkeletonPlaceholder>
  </View>
);

export default HomeSkeleton;
