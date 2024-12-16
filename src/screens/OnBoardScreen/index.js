import {View, Image, Text} from 'react-native';
import React, {useRef, useState} from 'react';
import onBoardStyle from './style';
import appst from '../../constants/AppStyle';
import PagerView from 'react-native-pager-view';
import {CustomedButton} from '../../components';
import {useTranslation} from 'react-i18next';

const renderPage = key => {
  let backg;
  if (key === 0) {
    backg = require('../../assets/images/onboard1.png');
  } else if (key === 1) {
    backg = require('../../assets/images/onboard2.png');
  } else {
    backg = require('../../assets/images/onboard3.png');
  }
  return (
    <View style={[appst.container, {flex: 1}]} key={key}>
      <Image style={onBoardStyle.onboardBg} source={backg} />
    </View>
  );
};

const renderContent = (page, onButtonPress) => {
  const {t} = useTranslation();

  let content = {};
  if (page === 0) {
    content = {
      buttonTitle: 'onboard.buttonTitle1',
      indicator: require('../../assets/images/indi1.png'),
    };
  } else if (page === 1) {
    content = {
      buttonTitle: 'onboard.buttonTitle2',
      indicator: require('../../assets/images/indi2.png'),
      title: 'onboard.title1',
      content: 'onboard.content1',
    };
  } else {
    content = {
      buttonTitle: 'onboard.buttonTitle2',
      indicator: require('../../assets/images/indi3.png'),
      title: 'onboard.title2',
      content: 'onboard.content2',
    };
  }

  return (
    <View style={onBoardStyle.contentContainer}>
      <Text style={onBoardStyle.title}>{t(content.title)}</Text>
      <Text style={onBoardStyle.content}>{t(content.content)}</Text>
      <Image style={onBoardStyle.indicator} source={content.indicator} />
      <CustomedButton onPress={onButtonPress} title={t(content.buttonTitle)} />
    </View>
  );
};

const OnBoardScreen = ({navigation}) => {
  const pagerRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(0);

  const goToPage = page => {
    if (page < 3) {
      pagerRef.current.setPage(page);
      setCurrentPage(page);
    } else {
      navigation.navigate('LoginScreen');
    }
  };

  return (
    <View style={appst.container}>
      <PagerView
        style={{flex: 1}}
        initialPage={0}
        ref={pagerRef}
        scrollEnabled={false}>
        {renderPage(0)}
        {renderPage(1)}
        {renderPage(2)}
      </PagerView>
      {renderContent(currentPage, () => goToPage(currentPage + 1))}
    </View>
  );
};

export default OnBoardScreen;
