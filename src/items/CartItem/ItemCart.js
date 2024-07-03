import {View, Text, TouchableOpacity, Image} from 'react-native';
import React, {useRef} from 'react';
import {itCart} from './style';
import appst from '../../constants/AppStyle';
import Swipeable from 'react-native-gesture-handler/Swipeable';

const ItemCart = ({
  item,
  currentlyOpenSwipeable,
  setCurrentlyOpenSwipeable,
}) => {
  const swipeableRef = useRef(null);

  const rightSwipeable = () => {
    return (
      <View style={itCart.deleteContainer}>
        <TouchableOpacity onPress={() => console.log('Delete success')}>
          <Image
            style={appst.icon24}
            source={require('../../assets/icons/cart_del.png')}
          />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <Swipeable
      ref={swipeableRef}
      renderRightActions={rightSwipeable}
      onSwipeableOpen={() => {
        console.log('Swipeable opened');
        if (
          currentlyOpenSwipeable &&
          currentlyOpenSwipeable !== swipeableRef.current
        ) {
          currentlyOpenSwipeable.close();
        }
        setCurrentlyOpenSwipeable(swipeableRef.current);
      }}
      onSwipeableClose={() => {
        console.log('Swipeable closed');
        if (currentlyOpenSwipeable === swipeableRef.current) {
          setCurrentlyOpenSwipeable(null);
        }
      }}>
      <View style={itCart.container}>
        <View style={[itCart.viewContainer, appst.rowStart]}>
          <TouchableOpacity>
            <Image
              style={appst.icon24}
              source={require('../../assets/icons/icon_check.png')}
            />
          </TouchableOpacity>
          <Image
            style={itCart.image}
            source={require('../../assets/images/onboard1.png')}
          />
          <View style={[appst.columnSb, itCart.viewQuatity]}>
            <Text style={itCart.name}>Nike Air Max 200</Text>
            <Text style={itCart.price}>$94.05</Text>
            <View style={[appst.rowCenter, itCart.view]}>
              <TouchableOpacity>
                <Image source={require('../../assets/icons/increase.png')} />
              </TouchableOpacity>
              <Text style={itCart.quatity}>10</Text>
              <TouchableOpacity>
                <Image source={require('../../assets/icons/decrease.png')} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Swipeable>
  );
};

export default ItemCart;
