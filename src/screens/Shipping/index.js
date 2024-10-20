import {useTranslation} from 'react-i18next';
import {View, Text, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import appst from '../../constants/AppStyle';
import Header from '../../components/Header';
import ShipItem from '../../items/ShippingIt';
import {CustomedButton} from '../../components';
import ship from './style';
import AxiosInstance from '../../helpers/AxiosInstance';
import {useDispatch} from 'react-redux';
import {setShipping} from '../../redux/reducer/cartReducer';

const ShipScreen = ({navigation}) => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const [selectedShipping, setSelectedShipping] = useState(null);
  const [ships, setships] = useState([]);

  useEffect(() => {
    const fetchShipData = async () => {
      const response = await AxiosInstance().get('/ship/get-shipping');
      console.log('response', response);

      if (response.status) {
        setships(response.data);
      }
    };
    fetchShipData();
  }, []);

  console.log('ships', ships);
  const handleSelectShipping = shipping => {
    setSelectedShipping(shipping);
  };

  const handleToggleTracking = shipping => {
    // Cập nhật trạng thái local
    setships(prevShips =>
      prevShips.map(ship =>
        ship._id === shipping._id
          ? {...ship, trackingAvailable: true}
          : {...ship, trackingAvailable: false},
      ),
    );
    handleSelectShipping(shipping);
  };

  const handleConfirm = () => {
    if (selectedShipping) {
      dispatch(setShipping(selectedShipping));
      navigation.navigate('CheckOutScreen');
    } else {
      alert('Vui lòng chọn phương thức vận chuyển!');
    }
  };

  console.log('selectedShipping', selectedShipping);

  return (
    <View style={appst.container}>
      <Header
        leftOnPress={() => navigation.goBack()}
        iconLeft={require('../../assets/icons/back.png')}
        name={'Phương thức vận chuyển'}
      />
      <Text style={ship.text1}>Cac phuong thuc van chuyen cua shop</Text>
      <FlatList
        style={ship.flat}
        data={ships}
        keyExtractor={item => item._id}
        renderItem={item => (
          <ShipItem item={item} onSelect={handleToggleTracking} />
        )}
      />
      <CustomedButton
        style={ship.button}
        titleStyle={ship.titleButton}
        title={'Xac nhan'}
        onPress={handleConfirm}
      />
    </View>
  );
};

export default ShipScreen;
