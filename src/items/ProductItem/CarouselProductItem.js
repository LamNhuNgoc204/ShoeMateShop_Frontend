import Carousel from 'react-native-snap-carousel';

const renderCarouselItem = ({item}) => (
  <Image style={pddt.pdImg} source={{uri: item}} />
);

return (
  <Carousel
    data={imageAssets}
    renderItem={renderCarouselItem}
    sliderWidth={screenWidth}
    itemWidth={screenWidth}
  />
);
