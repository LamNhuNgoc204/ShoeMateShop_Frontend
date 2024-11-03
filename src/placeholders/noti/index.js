import React from 'react';
import {View, StyleSheet} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const NotiMainSkeleton = () => {
  return (
    <View style={styles.container}>
      <SkeletonPlaceholder>
        <View>
          <View style={styles.card}>
            <View style={styles.image} />
            <View style={styles.content}>
              <View style={styles.title} />
              <View style={styles.description} />
            </View>
          </View>

          <View style={styles.card}>
            <View style={styles.image} />
            <View style={styles.content}>
              <View style={styles.title} />
              <View style={styles.description} />
            </View>
          </View>

          <View style={styles.card}>
            <View style={styles.image} />
            <View style={styles.content}>
              <View style={styles.title} />
              <View style={styles.description} />
            </View>
          </View>

          <View style={styles.card}>
            <View style={styles.image} />
            <View style={styles.content}>
              <View style={styles.title} />
              <View style={styles.description} />
            </View>
          </View>

          <View style={styles.card}>
            <View style={styles.image} />
            <View style={styles.content}>
              <View style={styles.title} />
              <View style={styles.description} />
            </View>
          </View>
        </View>
      </SkeletonPlaceholder>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  content: {
    marginLeft: 10,
    flex: 1,
    flexDirection: 'column',
  },
  title: {
    width: '70%',
    height: 20,
    marginBottom: 6,
    borderRadius: 4,
  },
  description: {
    width: '90%',
    height: 20,
    borderRadius: 4,
  },
});

export default NotiMainSkeleton;
