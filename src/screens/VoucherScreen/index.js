import { View, Text, TouchableOpacity, FlatList, TextInput, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import appst from '../../constants/AppStyle';
import VoucherItem from '../../items/VoucherItem';
import Header from '../../components/Header';
import style from './style';
import AxiosInstance from '../../helpers/AxiosInstance';

const SearchSection = () => {
  return (
    <View style={style.searchSection}>
      <TextInput placeholder='Looking Voucher' style={style.inputText} />
      <TouchableOpacity style={style.buttonSearch}>
        <Text style={style.btnText}>Search</Text>
      </TouchableOpacity>
    </View>
  );
};

const VoucherScreen = ({ route }) => {
  const { totalPrice } = route.params;
  console.log("totalPrice  voucher: ", totalPrice);
  const [vouchers, setVouchers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVouchers = async () => {
      try {
        const response = await AxiosInstance().get('/vouchers/list');
        setVouchers(response); // Lưu danh sách voucher vào state
      } catch (error) {
        console.error('Failed to fetch vouchers', error);
      } finally {
        setLoading(false); // Tắt trạng thái loading sau khi gọi API
      }
    };

    fetchVouchers();
  }, []);

  if (loading) {
    return (
      <View style={style.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={[appst.container, style.container]}>
      <Header iconLeft={require('../../assets/icons/ic_back.png')} iconRight={require('../../assets/icons/ic_bag.png')} name={'Vouchers'} />
      <SearchSection />
      <FlatList
        data={vouchers}
        renderItem={({ item }) => <VoucherItem voucher={item} cartTotal={totalPrice} />}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
        style={style.flat}
        contentContainerStyle={style.flatContainer}
      />
    </View>
  );
};

export default VoucherScreen;
