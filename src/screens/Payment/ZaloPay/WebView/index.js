import React from 'react';
import {ActivityIndicator} from 'react-native';
import WebView from 'react-native-webview';
import appst from '../../../../constants/AppStyle';

const ZaloPayWebView = ({route, navigation}) => {
  const {paymentUrl} = route.params;

  const handleNavigationChange = navState => {
    // Kiểm tra URL trong navState để xác định thành công hay thất bại
    if (navState.url.includes('success')) {
      // Nếu URL có chứa 'success', nghĩa là thanh toán thành công
      navigation.navigate('CheckoutSuccess');
    } else if (navState.url.includes('fail')) {
      // Nếu URL có chứa 'fail', nghĩa là thanh toán thất bại
      navigation.goBack();
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
