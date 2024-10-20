import React from 'react';
import {ActivityIndicator} from 'react-native';
import WebView from 'react-native-webview';
import appst from '../../../../constants/AppStyle';

const ZaloPayWebView = ({route}) => {
  const {paymentUrl} = route.params;

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
    />
  );
};

export default ZaloPayWebView;
