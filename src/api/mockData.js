export const LANGUAGES = [
  {label: 'Tiếng Việt', value: 'vi'},
  {label: 'English', value: 'en'},
  //   {label: '中文', value: 'zh'},
];

export const PROFILE = [
  {
    id: '1',
    iconSource: require('../assets/icons/ic_recently.png'),
    text: 'profiles.viewed',
    navigateTo: 'RecentlyViewedScreen',
  },
  {
    id: '2',
    iconSource: require('../assets/icons/ic-myrating.png'),
    text: 'profiles.rate',
    navigateTo: 'MyRating',
  },
  {
    id: '3',
    iconSource: require('../assets/icons/ic_orderhistory.png'),
    text: 'profiles.order_history',
    navigateTo: 'OrderScreen',
  },
  {
    id: '4',
    iconSource: require('../assets/icons/ic_accountsettings.png'),
    text: 'profiles.setting',
    navigateTo: 'SettingScreen',
  },
  {
    id: '5',
    iconSource: require('../assets/icons/ic_informationsecurity.png'),
    text: 'profiles.security',
    navigateTo: 'InformationSecurity',
  },
  {
    id: '6',
    iconSource: require('../assets/icons/ic_help.png'),
    text: 'profiles.help',
    navigateTo: 'Help',
  },
  {
    id: '7',
    iconSource: require('../assets/icons/ic_chatwithshop.png'),
    text: 'profiles.chat',
    navigateTo: 'MessageScreen',
  },
  {
    id: '8',
    iconSource: require('../assets/icons/language.png'),
    text: 'profiles.language',
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
