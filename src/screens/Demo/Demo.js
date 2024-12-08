import React, {useState} from 'react';
import {View, Button, Alert} from 'react-native';
import WebView from 'react-native-webview';
import AxiosInstance from '../../helpers/AxiosInstance';

const ZaloPayPayment = () => {
  const [orderUrl, setOrderUrl] = useState(null);
  const [amount, setAmount] = useState(50000);
  const [curentURL, setCurrentURL] = useState('');

  const handleDeposit = async () => {
    try {
      const response = await AxiosInstance().post('/wallet/deposit', {
        amount: amount,
      });

      if (response.status) {
        const {order_url} = response.zaloPayData;
        setOrderUrl(order_url);
      
      } else {
        Alert.alert(
          'Tạo giao dịch thất bại',
          response.message || 'Không thể tạo giao dịch.',
        );
      }
    } catch (error) {
      console.error('Error during deposit:', error);
      Alert.alert('Có lỗi xảy ra', error.message);
    }
  };

  // Hàm phân tích URL và trả về một đối tượng các tham số
  const getUrlParams = url => {
    const params = {};

    // Tách phần query string ra từ URL
    const queryString = url.split('?')[1];

    // Kiểm tra nếu có query string trong URL
    if (queryString) {
      const queryParts = queryString.split('&'); // Tách các tham số
      queryParts.forEach(part => {
        const [key, value] = part.split('='); // Tách key và value
        params[decodeURIComponent(key)] = decodeURIComponent(value); // Giải mã key và value
      });
    }

    return params;
  };

  const handleTransactionResult = async url => {
    setCurrentURL(url);

    try {
      const params = getUrlParams(url);
      const status = params.returncode;
      const apptransid = params.zptransid;

      console.log('Trạng thái:', status);
      console.log('apptransid:', apptransid);

      if (status == 1) {
        console.log('Xử lý cập nhật ví...');

        // Gửi yêu cầu cập nhật ví
        const response = await AxiosInstance().post('/wallet/update-balance', {
          amount: amount,
          transactionId: apptransid,
        });

        console.log('Cập nhật viên:', response);

        if (response.status) {
          Alert.alert('Thanh toán thành công', 'Số tiền đã được nạp vào ví.');
          setOrderUrl(null); 
        } else {
          Alert.alert('Cập nhật ví thất bại', response.message);
        }
      } else {
        Alert.alert('Thanh toán thất bại', 'Vui lòng thử lại.');
      }
    } catch (error) {
      console.error('Error during transaction result handling:', error);
      Alert.alert('Có lỗi xảy ra', error.message);
    }
  };

  return (
    <View style={{flex: 1}}>
      {orderUrl ? (
        <WebView
          source={{uri: orderUrl}}
          onNavigationStateChange={navState => {
            const {url} = navState;
            console.log('URL hiện tại:', url);

            // Kiểm tra URL kết thúc giao dịch
            if (url.includes('/result') && curentURL !== url) {
              console.log('Đang xử lý kết quả thanh toán ZaloPay');

              handleTransactionResult(url); // Gọi xử lý kết quả thanh toán
            } else {
              console.log('URL không vào trang kết quả');
            }
          }}
          onError={err => Alert.alert('Lỗi khi tải trang', err.message)}
        />
      ) : (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Button title="Nạp tiền với ZaloPay" onPress={handleDeposit} />
        </View>
      )}
    </View>
  );
};

export default ZaloPayPayment;
