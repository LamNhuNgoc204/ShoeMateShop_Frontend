import {View, Text, TouchableOpacity, Image} from 'react-native';
import React, {useState} from 'react';
import {itCart} from './style';
import appst from '../../constants/AppStyle';
import Swipeable from 'react-native-gesture-handler/Swipeable';

const ItemCart = () => {
  const [isSwiping, setIsSwiping] = useState(false);

  const rightSwipeable = () => {
    if (isSwiping) {
      return (
        <View style={itCart.deleteContainer}>
          <TouchableOpacity onPress={() => console.log('Delete success')}>
            <Text style={itCart.deleteText}>Delete</Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return null;
    }
  };

  return (
    <Swipeable
      renderRightActions={rightSwipeable}
      onSwipeableOpen={() => setIsSwiping(true)}
      onSwipeableClose={() => setIsSwiping(false)}>
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
