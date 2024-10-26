import {View, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import appst from '../../../constants/AppStyle';
import Header from '../../../components/Header';
import PaymentItem from '../../../items/PaymentItem';
import AxiosInstance from '../../../helpers/AxiosInstance';
import {useDispatch} from 'react-redux';
import {setPaymentMethod} from '../../../redux/reducer/cartReducer';

const ChoosePaymentScreen = ({navigation}) => {
  const [listPayment, setlistPayment] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchPayment = async () => {
      const response = await AxiosInstance().get(
        '/payment-method/getall-payment',
      );
      if (response.status) {
        setlistPayment(response.data);
      }
    };
    fetchPayment();
  }, []);

  const handlePress = item => {
    console.log('item payment press', item);
    dispatch(setPaymentMethod(item));
    navigation.goBack();
  };

  return (
    <View style={appst.container}>
      <Header
        iconLeft={require('../../../assets/icons/back.png')}
        leftOnPress={() => navigation.goBack()}
        name={'Payment'}
      />
      <FlatList
        data={listPayment}
        renderItem={item => <PaymentItem item={item} onPress={handlePress} />}
        keyExtractor={(item, index) => (item._id ? item._id : index.toString())}
      />
    </View>
  );
};

export default ChoosePaymentScreen;
