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
    navigateTo: 'RecentlyViewed',
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
    navigateTo: 'OrderHistory',
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
    navigateTo: 'ChangeLanguages',
  },
];

export const BANNERS = [
  require('../assets/images/banner1.png'),
  require('../assets/images/banner2.jpg'),
  require('../assets/images/banner3.jpg'),
];
