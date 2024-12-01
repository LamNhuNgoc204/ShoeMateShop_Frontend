const config = {
  screens: {
    HomeScreen: {
      path: 'shoemate/home',
    },
    Profile: {
      path: 'profile/:id',
      parse: {
        id: id => `${id}`,
      },
    },
    Notifications: 'notifications',
    SettingScreen: 'settings',
    CheckoutSuccess: 'checkout-success',
  },
};

const linking = {
  prefixes: ['shoemate://', 'https://shoemate.com', 'http://localhost:3000'],
  config,
};

export default linking;
