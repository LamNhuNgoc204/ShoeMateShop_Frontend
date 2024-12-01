import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const SkeletonToRating = () => {
  return (
    <SkeletonPlaceholder>
      <ScrollView contentContainerStyle={styles.container}>
        {Array.from({length: 10}).map((_, index) => (
          <View key={index} style={styles.card}>
            <View style={styles.image} />

            <View style={styles.textContent}>
              <View style={styles.textLine} />
              <View style={styles.textLineShort} />
              <View style={styles.textLineSmall} />
            </View>

            <View style={styles.button} />
          </View>
        ))}

        <View style={styles.noRatingsMessage}>
          <View style={styles.noRatingsLine} />
        </View>
      </ScrollView>
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
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 16,
  },
  textContent: {
    flex: 1,
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
    marginBottom: 8,
    width: '60%',
  },
  textLineSmall: {
    height: 12,
    borderRadius: 4,
    width: '40%',
  },
  button: {
    width: 80,
    height: 30,
    borderRadius: 8,
    backgroundColor: '#e0e0e0',
  },
  noRatingsMessage: {
    alignItems: 'center',
    marginTop: 32,
  },
  noRatingsLine: {
    width: 200,
    height: 16,
    borderRadius: 8,
  },
});

export default SkeletonToRating;
