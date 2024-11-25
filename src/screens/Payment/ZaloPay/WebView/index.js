import React, {useEffect} from 'react';
import {ActivityIndicator, Linking} from 'react-native';
import WebView from 'react-native-webview';
import appst from '../../../../constants/AppStyle';

const ZaloPayWebView = ({route, navigation}) => {
  const {paymentUrl} = route.params;

  useEffect(() => {
    // Đảm bảo ứng dụng có thể nhận deep link khi quay lại
    const handleDeepLink = event => {
      const {url} = event;

      if (url.includes('success')) {
        navigation.navigate('CheckoutSuccess', {status: 'success'});
      } else if (url.includes('fail')) {
        navigation.goBack();
      }
    };

    Linking.addEventListener('url', handleDeepLink);

    return () => {
      Linking.removeEventListener('url', handleDeepLink);
    };
  }, [navigation]);

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
      onShouldStartLoadWithRequest={request => {
        // Nếu URL chứa deep link trả về kết quả thanh toán
        if (request.url.includes('shoeMate://callback')) {
          Linking.openURL(request.url);
          return false; // Ngừng tải URL trong WebView
        }
        return true;
      }}
    />
  );
};

export default ZaloPayWebView;
