import React from 'react';
import {View, Text, Button, StyleSheet, TouchableOpacity} from 'react-native';
import Header from '../../../components/Header';
import {colors} from '../../../constants/colors';

const ConsequencesScreen = ({navigation}) => {
  const handleContinue = () => {
    navigation.navigate('FinalConfirmationScreen');
  };

  return (
    <>
      <Header
        iconLeft={require('../../../assets/icons/back.png')}
        leftOnPress={() => navigation.goBack()}
        name={'Hậu quả của việc xóa tài khoản'}
      />
      <View style={styles.container}>
        {/* <Text style={styles.title}>Hậu quả của việc xóa tài khoản</Text> */}
        <Text style={styles.warning}>
          Hành động này sẽ xóa vĩnh viễn các thông tin sau:
        </Text>
        <Text>- Lịch sử giao dịch</Text>
        <Text>- Địa chỉ giao hàng</Text>
        <Text>- Điểm thưởng và ưu đãi</Text>
        <TouchableOpacity style={styles.deleteButton} onPress={handleContinue}>
          <Text style={styles.deleteButtonText}>Tiếp tục</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 20},
  title: {fontSize: 22, fontWeight: 'bold', marginBottom: 20},
  warning: {fontSize: 16, marginBottom: 10},
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

export default ConsequencesScreen;
