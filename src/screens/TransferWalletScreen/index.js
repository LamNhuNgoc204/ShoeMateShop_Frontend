import React, {useEffect, useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import appst from '../../constants/AppStyle';
import {spacing} from '../../constants';
import {CustomedButton} from '../../components';
import styles from './style';
import CustomModal from './Modal';
import { useNavigation } from '@react-navigation/native';
const TransferWalletScreen = () => {
  const [selected, setSelected] = useState('');
  const [data, setData] = useState([]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  const closeModal = () => {
    setModalVisible(false);
    navigation.navigate('OtpVerification');
  };
  useEffect(() => {
    // Get Values from database
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(data => {
        // Store Values in Temporary Array
        const newArray = data.map(item => ({
          key: item.id.toString(),
          value: `${item.phone}`,
        }));
        // Set Data Variable
        setData(newArray);
      })
      .catch(e => {
        console.log(e);
      });
  }, []);

  const handleTransfer = () => {
    setModalVisible(true);
  };

  useEffect(() => {
    if (selected) {
      fetch(`https://jsonplaceholder.typicode.com/users/${selected}`)
        .then(response => response.json())
        .then(data => {
          setName(data.name);
          setPhone(data.phone);
        })
        .catch(e => {
          console.log(e);
        });
    }
  }, [selected]);

  return (
    <View style={styles.container}>
      <View style={appst.rowCenter}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            style={appst.icon40}
            source={require('../../assets/icons/ic_backwhite.png')}
          />
        </TouchableOpacity>
        <Text style={styles.title}>Deposit</Text>
        <View style={{width: 40}} />
      </View>
      <View style={styles.viewBody}>
        <View style={styles.boxwallet}>
          <Text style={styles.textwallet}>Your wallet</Text>
          <Text style={styles.textmoney}>1000$</Text>
        </View>
        <View style={{marginTop: spacing.lg}}>
          <Text style={styles.lable}>Email người nhận</Text>
          <TextInput value={name} placeholder="Nhập email" style={styles.input}/>
        </View>

        <View style={{marginTop: spacing.lg}}>
          <Text style={styles.lable}>Tên người nhận</Text>
          <TextInput editable={false} value={name} placeholder="Tên người nhận" style={styles.input}/>
        </View>
        <View style={{marginTop: spacing.lg}}>
          <Text style={styles.lable}>Amount</Text>
          <TextInput
            placeholder="Nhập số tiền cần chuyển"
            style={styles.input}
            keyboardType="numeric"
          />
        </View>
        <View style={{marginTop: spacing.lg}}>
          <Text style={styles.lable}>Lời nhắn</Text>
          <TextInput
          style={styles.inputarea}
            placeholder="Nhập lời nhắn"
            multiline
            maxLength={50}
            numberOfLines={4}
            editable
          />
        </View>

        <View style={styles.viewButton}>
          <CustomedButton
            title={'Transfer'}
            titleStyle={styles.textPress}
            onPress={handleTransfer}
            style={styles.press}
          />
        </View>
      </View>
      <CustomModal
       visible={modalVisible} 
       closeModal={closeModal}
       title = 'Enter PIN'
       textbutton = 'OK'
       />
    </View>
  );
};

export default TransferWalletScreen;
