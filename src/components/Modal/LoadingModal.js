// components/LoadingModal.js
import React, {useState, useEffect} from 'react';
import {View, Text, Modal, StyleSheet} from 'react-native';
import {spacing} from '../../constants';
import ProgressBar from 'react-native-progress/Bar';
import {colors} from '../../constants/colors';

const LoadingModal = ({visible, message, isComplete, onLoadingComplete}) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval;

    if (visible && !isComplete) {
      interval = setInterval(() => {
        setProgress(prevProgress => {
          const newProgress = prevProgress + 0.01;
          if (newProgress >= 1) {
            onLoadingComplete();
            return 1;
          }
          return newProgress;
        });
      }, 50);
    } else if (isComplete && progress === 1) {
      onLoadingComplete();
    }

    return () => clearInterval(interval);
  }, [visible, isComplete, onLoadingComplete, progress]);

  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="fade"
      onRequestClose={() => {}}>
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          <Text style={styles.message}>{message}</Text>
          <ProgressBar
            progress={progress}
            width={200}
            height={10}
            borderRadius={5}
            color={isComplete ? colors.primary : '#5f8ef4'}
            unfilledColor="#acccff85"
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 250,
    padding: spacing.md,
    backgroundColor: 'white',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    marginTop: spacing.sm,
    fontSize: 16,
    color: '#000',
  },
});

export default LoadingModal;
