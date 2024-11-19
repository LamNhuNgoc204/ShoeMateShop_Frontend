import React, {useEffect, useRef} from 'react';
import {View, StyleSheet, Animated} from 'react-native';

const SkeletonLoader = () => {
  const shimmerAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(shimmerAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [shimmerAnim]);

  const shimmerOpacity = shimmerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 1],
  });

  return (
    <View style={styles.container}>
      {[...Array(10)].map((_, index) => (
        <Animated.View
          key={index}
          style={[styles.skeletonBox, {opacity: shimmerOpacity}]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  skeletonBox: {
    height: 50,
    width: '100%',
    backgroundColor: '#e0e0e0',
    marginBottom: 16,
    borderRadius: 8,
  },
});

export default SkeletonLoader;
