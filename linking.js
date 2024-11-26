import {Linking} from 'react-native';

const linking = {
  prefixes: [
    'myapp://',
    'http://shoe-mate-shop-backend.vercel.app',
    'https://shoe-mate-shop-backend.vercel.app',
  ],

  config: {
    screens: {
      PaymentResult: 'payment/:status',
    },
  },

  async getInitialURL() {
    const url = await Linking.getInitialURL();
    return url;
  },

  subscribe(listener) {
    const linkingSubscription = Linking.addEventListener('url', ({url}) => {
      listener(url);
    });

    return () => {
      linkingSubscription.remove();
    };
  },
};

export default linking;
