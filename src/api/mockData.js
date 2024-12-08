export const LANGUAGES = [
  {label: 'Tiếng Việt', value: 'vi'},
  {label: 'English', value: 'en'},
  //   {label: '中文', value: 'zh'},
];

export const PROFILE = [
  // {
  //   id: '5',
  //   iconSource: require('../assets/icons/ic_mywallet.png'),
  //   text: 'profiles.wallet',
  //   navigateTo: 'wallet',
  // },
  {
    id: '3',
    iconSource: require('../assets/icons/ic_orderhistory.png'),
    text: 'profiles.order_history',
    navigateTo: 'OrderScreen',
  },
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
    id: '4',
    iconSource: require('../assets/icons/ic_accountsettings.png'),
    text: 'profiles.setting',
    navigateTo: 'SettingScreen',
  },

  {
    id: '6',
    iconSource: require('../assets/icons/shopping_bag.png'),
    text: 'profiles.buy_again',
    navigateTo: 'BuyAgain',
  },
  {
    id: '7',
    iconSource: require('../assets/icons/ic_chatwithshop.png'),
    text: 'profiles.chat',
    navigateTo: 'MessageScreen',
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
    text: 'profiles.update_profile',
    navigateTo: 'EditProfile',
  },
  {id: '2', text: 'profiles.ship_address', navigateTo: 'ChooseAddress'},
  {id: '4', text: 'profiles.change_pass', navigateTo: 'Password'},
  {
    id: '5',
    // iconSource: require('../assets/icons/language.png'),
    text: 'profiles.language',
    navigateTo: 'ChooseLanguage',
  },
  {
    id: '9',
    // iconSource: require('../assets/icons/ic_help.png'),
    text: 'profiles.help',
    navigateTo: 'Help',
  },
  {id: '6', text: 'profiles.about', navigateTo: 'About'},
  {
    id: '10',
    // iconSource: require('../assets/icons/ic_informationsecurity.png'),
    text: 'profiles.security',
    navigateTo: 'Privacy',
  },
  {id: '3', text: 'profiles.standards', navigateTo: 'CommunityStandards'},
  {id: '7', text: 'profiles.term', navigateTo: 'TermsAndConditions'},
  {
    id: '8',
    text: 'profiles.delete_acc',
    navigateTo: 'DeleteAccountScreen',
  },
];
