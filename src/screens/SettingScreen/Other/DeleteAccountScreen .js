import React from 'react';
import {View, Text, TouchableOpacity, Alert, StyleSheet} from 'react-native';
import {colors} from '../../../constants/colors';
import Header from '../../../components/Header';

const DeleteAccountScreen = ({navigation}) => {
  const goToAccountDeletionReasonScreen = () => {
    navigation.navigate('AccountDeletionReasonScreen');
  };

  const handleDeleteConfirmation = () => {
    Alert.alert(
      'Xác nhận',
      'Bạn có chắc chắn muốn xóa tài khoản không? Hành động này sẽ xóa vĩnh viễn tất cả thông tin.',
      [
        {text: 'Hủy bỏ', style: 'cancel'},
        {text: 'Tiếp tục', onPress: goToAccountDeletionReasonScreen},
      ],
    );
  };

  return (
    <>
      <Header
        iconLeft={require('../../../assets/icons/back.png')}
        leftOnPress={() => navigation.goBack()}
        name={'Yêu cầu xóa tài khoản'}
      />
      <View style={styles.container}>
        {/* <Text style={styles.title}>Yêu cầu xóa tài khoản</Text> */}
        <Text style={styles.description}>
          Khi bạn xóa tài khoản, tất cả thông tin liên quan sẽ bị xóa vĩnh viễn
          và không thể khôi phục. Bạn có chắc chắn muốn xóa tài khoản?
        </Text>

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={handleDeleteConfirmation}>
          <Text style={styles.deleteButtonText}>Tiếp tục</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => navigation.goBack()}>
          <Text style={styles.cancelButtonText}>Hủy bỏ</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    paddingTop: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    lineHeight: 22,
  },
  deleteButton: {
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#333',
    fontSize: 16,
  },
});

export default DeleteAccountScreen;
