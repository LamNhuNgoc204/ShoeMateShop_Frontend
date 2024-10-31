export const LANGUAGES = [
  {label: 'Tiếng Việt', value: 'vi'},
  {label: 'English', value: 'en'},
  //   {label: '中文', value: 'zh'},
];

export const PROFILE = [
  {
    id: '1',
    iconSource: require('../assets/icons/ic_recently.png'),
    text: 'Recently Viewed',
    navigateTo: 'RecentlyViewedScreen',
  },
  {
    id: '2',
    iconSource: require('../assets/icons/ic-myrating.png'),
    text: 'My Rating',
    navigateTo: 'MyRating',
  },
  {
    id: '3',
    iconSource: require('../assets/icons/ic_orderhistory.png'),
    text: 'Order History',
    navigateTo: 'OrderScreen',
  },
  {
    id: '4',
    iconSource: require('../assets/icons/ic_accountsettings.png'),
    text: 'Account Settings',
    navigateTo: 'SettingScreen',
  },
  {
    id: '5',
    iconSource: require('../assets/icons/ic_informationsecurity.png'),
    text: 'Information Security',
    navigateTo: 'InformationSecurity',
  },
  {
    id: '6',
    iconSource: require('../assets/icons/ic_help.png'),
    text: 'Help',
    navigateTo: 'Help',
  },
  {
    id: '7',
    iconSource: require('../assets/icons/ic_chatwithshop.png'),
    text: 'Chat with Shop',
    navigateTo: 'MessageScreen',
  },
  {
    id: '8',
    iconSource: require('../assets/icons/language.png'),
    text: 'ChangeLanguage',
    navigateTo: 'ChooseLanguage',
  },
];

export const BANNERS = [
  require('../assets/images/banner1.png'),
  require('../assets/images/banner2.jpg'),
  require('../assets/images/banner3.jpg'),
];

export const SETTING = [
  {
    id: '1',
    text: 'Change Profile Picture',
    navigateTo: 'EditProfile',
  },
  {id: '2', text: 'Shipping Address', navigateTo: 'ChooseAddress'},
  {id: '8', text: 'Change email', navigateTo: 'ChangeEmail'},
  {id: '3', text: 'Payment Method', navigateTo: 'PaymentMethod'},
  {id: '4', text: 'Password', navigateTo: 'Password'},
  {
    id: '5',
    text: 'Country',
    navigateTo: 'Country',
    additionalInfo: 'Vietnam',
  },
  {id: '6', text: 'Size', navigateTo: 'Size', additionalInfo: 'UK'},
  {id: '7', text: 'Terms and Conditions', navigateTo: 'TermsAndConditions'},
];
