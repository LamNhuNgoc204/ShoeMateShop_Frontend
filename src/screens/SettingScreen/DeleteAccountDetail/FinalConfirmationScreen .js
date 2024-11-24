import React from 'react';
import {View, Text, Alert, StyleSheet, TouchableOpacity} from 'react-native';
import Header from '../../../components/Header';
import {colors} from '../../../constants/colors';

const FinalConfirmationScreen = ({navigation}) => {
  const confirmDeletion = () => {
    Alert.alert(
      'Xác nhận xóa tài khoản',
      'Bạn chắc chắn muốn xóa tài khoản? Hành động này không thể hoàn tác.',
      [
        {text: 'Hủy', style: 'cancel'},
        {
          text: 'Tiếp tục',
          onPress: () => {
            navigation.navigate('DeletionCompletedScreen');
          },
        },
      ],
    );
  };

  return (
    <>
      <Header
        iconLeft={require('../../../assets/icons/back.png')}
        leftOnPress={() => navigation.goBack()}
        name={'Xác nhận lần cuối'}
      />
      <View style={styles.container}>
        {/* <Text style={styles.title}>Xác nhận lần cuối</Text> */}
        <Text style={styles.message}>
          Bạn chắc chắn muốn xóa tài khoản? Hành động này không thể hoàn tác.
        </Text>
        <TouchableOpacity style={styles.deleteButton} onPress={confirmDeletion}>
          <Text style={styles.deleteButtonText}>Xác nhận xóa</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 20},
  title: {fontSize: 22, fontWeight: 'bold', marginBottom: 20},
  message: {fontSize: 16, marginBottom: 20},
  deleteButton: {
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 10,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default FinalConfirmationScreen;
