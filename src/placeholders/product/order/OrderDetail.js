import React from 'react';
import {View, StyleSheet} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const OrderDetailSkeleton = () => {
  return (
    <SkeletonPlaceholder style={{flex: 1}}>
      <View style={{padding: 16, height: '100%'}}>
        <View style={{flexDirection: 'row', marginBottom: 20}}>
          <View style={styles.circle} />
          <View style={{marginLeft: 10}}>
            <View style={styles.mediumLine} />
            <View style={styles.shortLine} />
          </View>
        </View>

        <View style={[styles.row, {marginBottom: 20}]}>
          <View style={styles.square} />
          <View style={{marginLeft: 10}}>
            <View style={styles.mediumLine} />
            <View style={styles.shortLine} />
            <View style={styles.shortLine} />
            <View style={styles.shortLine} />
          </View>
        </View>

        <View style={{marginBottom: 16}}>
          <View style={styles.mediumLine} />
          <View style={[styles.row, {marginTop: 8}]}>
            <View style={styles.shortLine} />
            <View style={styles.shortLine} />
            <View style={styles.shortLine} />
            <View style={styles.shortLine} />
            <View style={styles.shortLine} />
          </View>
        </View>

        <View style={{marginBottom: 16}}>
          <View style={styles.longLine} />
          <View style={styles.longLine} />
          <View style={styles.longLine} />
          <View style={styles.longLine} />
          <View style={styles.longLine} />
          <View style={styles.longLine} />
        </View>

        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{marginBottom: 16}}>
            <View style={styles.shortLine} />
            <View style={styles.shortLine} />
            <View style={styles.mediumLine} />
            <View style={styles.mediumLine} />
          </View>

          <View style={{marginBottom: 16}}>
            <View style={styles.shortLine} />
            <View style={styles.shortLine} />
            <View style={styles.shortLine} />
            <View style={styles.shortLine} />
          </View>
        </View>

        <View style={styles.button} />
      </View>
    </SkeletonPlaceholder>
  );
};

const styles = StyleSheet.create({
  circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  square: {
    width: 70,
    height: 70,
    borderRadius: 4,
  },
  longLine: {
    width: 200,
    height: 10,
    borderRadius: 4,
    marginBottom: 8,
  },
  mediumLine: {
    width: 150,
    height: 10,
    borderRadius: 4,
    marginBottom: 8,
  },
  shortLine: {
    width: 100,
    height: 10,
    borderRadius: 4,
    marginBottom: 8,
  },
  longLine: {
    width: '100%',
    height: 10,
    borderRadius: 4,
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    width: '100%',
    height: 45,
    borderRadius: 4,
  },
});

export default OrderDetailSkeleton;
