import React from 'react';
import {ActivityIndicator} from 'react-native';
import WebView from 'react-native-webview';
import appst from '../../../../constants/AppStyle';

const ZaloPayWebView = ({route, navigation}) => {
  const {paymentUrl} = route.params;

  const handleNavigationChange = navState => {
    // Kiểm tra nếu URL có chứa 'success' hoặc 'fail'
    if (navState.url.includes('success')) {
      // Nếu thanh toán thành công, quay lại ứng dụng thông qua deep link
      navigation.navigate('CheckoutSuccess');
    } else if (navState.url.includes('fail')) {
      // Nếu thanh toán thất bại, quay lại màn hình trước
      navigation.goBack();
    } else if (navState.url.includes('shoeMate://callback')) {
      // Xử lý khi nhận được callback từ Zalo Pay (deep link)
      navigation.navigate('CheckoutSuccess'); // Hoặc xử lý theo cách bạn muốn
    }
  };

  return (
    <WebView
      source={{uri: paymentUrl}}
      style={appst.container}
      startInLoadingState={true}
      renderLoading={() => (
        <ActivityIndicator
          size="large"
          color="#00ff00"
          style={{flex: 1, justifyContent: 'center'}}
        />
      )}
      onNavigationStateChange={handleNavigationChange}
    />
  );
};

export default ZaloPayWebView;
