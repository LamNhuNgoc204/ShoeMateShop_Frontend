import React from 'react';
import {View, FlatList} from 'react-native';
import styles from './style';

const SkeletonCard = () => {
  return (
    <View style={styles.card}>
      <View style={styles.imageSkeleton} />
      <View style={styles.textSkeletonShort} />
      <View style={styles.textSkeletonMedium} />
      <View style={styles.textSkeletonShort} />
    </View>
  );
};

const CateDetailSkeleton = () => {
  const renderSkeleton = () => <SkeletonCard />;

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.textSkeletonHeader} />
        <View style={styles.textSkeletonSubHeader} />
      </View>
      <FlatList
        data={Array.from({length: 6})} // Tạo danh sách skeleton giả
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderSkeleton}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

export default CateDetailSkeleton;
