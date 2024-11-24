import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Header from '../../../components/Header';
import {colors} from '../../../constants/colors';
import {logout} from '../../../redux/reducer/userReducer';
import {useDispatch} from 'react-redux';

const DeletionCompletedScreen = ({navigation}) => {
  const dispatch = useDispatch();

  return (
    <>
      <Header
        iconLeft={require('../../../assets/icons/back.png')}
        leftOnPress={() => navigation.goBack()}
        name={'Gửi yêu cầu'}
      />
      <View style={styles.container}>
        {/* <Text style={styles.title}>Yêu cầu đã được gửi</Text> */}
        <Text style={styles.message}>
          Chúng tôi đã nhận yêu cầu xóa tài khoản của bạn.
        </Text>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => {
            dispatch(logout());
            navigation.replace('LoginScreen');
          }}>
          <Text style={styles.deleteButtonText}>Gửi yêu cầu</Text>
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

export default DeletionCompletedScreen;
