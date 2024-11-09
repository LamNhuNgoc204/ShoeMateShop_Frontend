import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  TextInput,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import appst from '../../constants/AppStyle';
import messageScreenStyle from './style';
import { colors } from '../../constants/colors';
import {
  getConversationAction,
  getMessagesAction,
  sendMessageAction,
} from '../../redux/actions/messageAction';
import { useSelector } from 'react-redux';
import io from 'socket.io-client';
import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import AxiosInstance from '../../helpers/AxiosInstance';
import { Axios } from 'axios';

const renderToolbar = ({ onBack, name, avatar }) => {
  return (
    <View style={[appst.toolbar, messageScreenStyle.toolBarStyle]}>
      <TouchableOpacity onPress={onBack}>
        <Image
          style={messageScreenStyle.icon16}
          source={require('../../assets/icons/back-blue.png')}
        />
      </TouchableOpacity>
      <View
        style={[
          messageScreenStyle.imageWrapper,
          messageScreenStyle.marginLeft15,
        ]}>
        <Image
          style={[messageScreenStyle.image40]}
          source={
            avatar ? { uri: avatar } : require('../../assets/images/avatar.png')
          }
        />
      </View>
      <View style={messageScreenStyle.marginLeft15}>
        <Text style={messageScreenStyle.name}>{name}</Text>
        <Text style={messageScreenStyle.role}>Assistant</Text>
      </View>
    </View>
  );
};

const MessageItem = ({ message, user }) => {

  function formatDate(isoString) {
    const date = new Date(isoString);
    const now = new Date();
    
    const diffTime = now - date;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays >= 2) {
        return date.toLocaleDateString('vi-VN');
    } else if (diffDays >= 1) {
        return "hôm qua";
    } else {
        return date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
    }
}

  return (
    <View
      style={[
        messageScreenStyle.messageItem,
        message.senderId._id == user._id &&
        messageScreenStyle.customerMessageItem,
      ]}>
      <Text
        style={[
          messageScreenStyle.messageContent,
          message.senderId._id == user._id &&
          messageScreenStyle.customerMessageContent,
        ]}>
        {message.text}
      </Text>
      <Text>{formatDate(message.createdAt)}</Text>
    </View>
  );
};

const renderBottom = ({
  focused,
  onFocused,
  onBlur,
  text,
  onChangeText,
  onSend,
  onOpenBottomSheet
}) => {
  return (
    <View style={messageScreenStyle.bottomContainer}>
      <TextInput
        value={text}
        onChangeText={onChangeText}
        onFocus={onFocused}
        onBlur={onBlur}
        style={messageScreenStyle.input}
        placeholder="Message"
        placeholderTextColor={colors.color004BFE}
      />
      <TouchableOpacity>
        <Image
          source={require('../../assets/icons/open_gallery.png')}
          style={[
            messageScreenStyle.icon26,
            messageScreenStyle.marginLeft15,
            focused && messageScreenStyle.hide,
          ]}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={onOpenBottomSheet}>
        <Image
          source={require('../../assets/icons/menu.png')}
          style={[
            messageScreenStyle.icon26,
            messageScreenStyle.marginLeft15,
            focused && messageScreenStyle.hide,
          ]}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={onSend}>
        <Image
          source={require('../../assets/icons/send.png')}
          style={[
            messageScreenStyle.icon26,
            messageScreenStyle.marginLeft15,
            !focused && messageScreenStyle.hide,
          ]}
        />
      </TouchableOpacity>
    </View>
  );
};

const OrderItem = ({ order, isMessage = false, isSelected, onSelect }) => {

  const countItem = () => {
    var count = 0
    order.orderDetails.forEach(e => {
      count += e.product.pd_quantity;
    })
    return count;
  }
  return (
    <View style={{ width: '100%', padding: 15, borderRadius: 16, flexDirection: 'row', borderWidth: 1, borderColor: colors.primary }}>
      <Image source={{ uri: "https://c8.alamy.com/comp/2H0ME7K/issuing-an-order-icon-outline-issuing-an-order-vector-icon-color-flat-isolated-2H0ME7K.jpg" }} style={{ width: 100, height: 100, borderRadius: 8 }} />
      <View style={{ flex: 1, paddingHorizontal: 10 }}>
        <Text style={{ color: "#000", fontWeight: '700', fontSize: 16 }} ellipsizeMode='tail' numberOfLines={1}>Order #{order.order._id}</Text>
        <Text>{order.order.status}</Text>
        <View style={{ flex: 1 }} />
        <Text style={[{ fontWeight: '700', color: colors.primary, fontSize: 14 }]}>Total: ${order.order.total_price}</Text>
      </View>
      <View style={{ justifyContent: 'space-between' }}>
        <Text style={{
          backgroundColor: "#cdcdcd", padding: 3,
          borderRadius: 10, color: '#fff'
        }}>{countItem()} items</Text>
        <TouchableOpacity onPress={onSelect} style={[{
          padding: 10, borderRadius: 16, borderWidth: 1,
          borderColor: colors.primary
        }, isSelected && { backgroundColor: colors.primary }, isMessage && { display: 'none' }]}>
          <Text style={[{ color: isSelected ? 'white' : colors.primary }]}>Select</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const BottomSheetMenu = ({ onCloseBottomSheet, orders, orderSelected, onSelect, sendOrder }) => {
  const checkSelect = (order, orderSelect) => {
    if (!orderSelect) {
      return false;
    } else if (orderSelect.order._id == order.order._id) {
      return true;
    } else {
      return false;
    }
  }
  return (
    <View style={{ padding: 10, height: 400, width: '100%' }}>
      <BottomSheetFlatList
        ItemSeparatorComponent={<View style={{ height: 10 }} />}
        data={orders}
        renderItem={({ item }) => <OrderItem onSelect={() => onSelect(item)} isSelected={checkSelect(item, orderSelected)} order={item} />}
        keyExtractor={(item, id) => id.toString()}
        contentContainerStyle={{ padding: 15 }}
        showsVerticalScrollIndicator={false}
      />
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity onPress={sendOrder} style={{ flex: 1, borderRadius: 16, padding: 10, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.primary }}>
          <Text style={{ color: 'white', fontWeight: '700', fontSize: 16 }}>Send</Text>
        </TouchableOpacity>
        <View style={{ width: 20 }} />
        <TouchableOpacity onPress={onCloseBottomSheet} style={[{ justifyContent: 'center', alignItems: 'center', padding: 10, borderRadius: 16, borderWidth: 1, borderColor: colors.primary, paddingHorizontal: 40 }]}>
          <Text style={{ fontSize: 20, fontWeight: '700', color: colors.primary }}>x</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const MessageScreen = ({ navigation }) => {
  const [conversation, setConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [focused, setFocused] = useState(false);
  const [user, setUser] = useState(null);
  const [text, setText] = useState('');
  const authState = useSelector(state => state.user);
  const messagesRef = useRef(null);
  const name = authState.user.name;
  const avatar = authState.user.avatar;
  const bottomSheetRef = useRef(null);
  const [orders, setOrders] = useState([]);
  const [orderSelected, setOrderSelected] = useState();

  // console.log('user', name, avatar);

  const SOCKET_URL = `http://192.168.9.22:3000/`;

  const getConversation = async () => {
    try {
      const conversation = await getConversationAction();
      const messages = await getMessagesAction(conversation._id);
      console.log('messages...: ', messages);
      console.log('getConversation...: ', conversation);
      setMessages(messages);
      setConversation(conversation);
    } catch (error) {
      console.error('Error getting conversation:', error);
    }
  };

  const sendMessage = async () => {
    try {
      console.log('send message.....');
      const response = await sendMessageAction(
        conversation._id,
        user._id,
        text,
      );
      console.log('response...: ', response);
      setText('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const sendOrder = async () => {

    if (!orderSelected) {
      return
    }
    try {
      const response = await AxiosInstance().post('/messages/send-message', {
        conversationId: conversation._id,
        senderId: user._id,
        text: "send order",
        orderId: orderSelected.order._id
      })
      if (response.status) {
        console.log('send order success')
        setOrderSelected(null);
        closeBottomSheet()
      }
    } catch (error) {
      console.log('Error sending order')
    }
  }

  const onSelect = (order) => {
    setOrderSelected(order);
  }

  const getOrders = async () => {
    try {
      const response = await AxiosInstance().get('orders/get-orders-for-message');

      if (response.status) {
        console.log('orders...: ', response.data);
        setOrders(response.data);
      }
    } catch (error) {

    }
  }

  const onChangeText = txt => {
    setText(txt);
  };

  const onFocused = () => {
    setFocused(true);
  };
  const onBlur = () => {
    setFocused(false);
  };
  const onBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    getConversation();
    setUser(authState.user);
    getOrders();
  }, [authState.user]);

  useEffect(() => {
    // Kết nối tới server
    const socket = io(SOCKET_URL);

    // Lắng nghe sự kiện 'connect' khi kết nối thành công
    socket.on('connect', () => {
      console.log('Socket connected');
    });

    // Lắng nghe sự kiện 'newMessage' để nhận tin nhắn mới
    socket.on('sendMessage', data => {
      console.log('Received message:', data.message);
      setMessages(prevMessages => [data.message, ...prevMessages]);
    });

    // Lắng nghe sự kiện 'disconnect'
    socket.on('disconnect', () => {
      console.log('Socket disconnected');
    });

    // Cleanup function khi component bị unmount
    return () => {
      socket.disconnect();
      console.log('Socket disconnected on cleanup');
    };
  }, []);

  const scrollToTop = () => {
    if (messagesRef.current) {
      messagesRef.current?.scrollToIndex({ index: 0, animated: true });
    }
  };

  const openBottomSheet = () => {
    if (bottomSheetRef.current) {
      bottomSheetRef.current.snapToIndex(0);
    }
  }

  const closeBottomSheet = () => {
    if (bottomSheetRef.current) {
      bottomSheetRef.current.close();
    }
  }

  function formatDate(isoString) {
    const date = new Date(isoString);
    const now = new Date();

    const diffTime = now - date;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays >= 2) {
      return date.toLocaleDateString('vi-VN');
    } else if (diffDays >= 1) {
      return "hôm qua";
    } else {
      return date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
    }
  }



  useEffect(() => {
    scrollToTop()
  }, [messages]);

  return conversation ? (
    <View style={[appst.container, messageScreenStyle.container]}>
      {renderToolbar({ onBack, name, avatar })}
      <FlatList
        ItemSeparatorComponent={<View style={{marginBottom: 10}}/>}
        inverted={true}
        ref={messagesRef}
        data={messages}
        renderItem={({ item }) => {
          if (item.type == 'text') {
            return <MessageItem user={user} message={item} />
          } else if (item.type == 'order') {
            return <OrderItem order={item.order} isMessage={true} />
          }
        }}
        keyExtractor={(item, index) => index.toString()}
        style={{ paddingHorizontal: 20, flex: 1 }}
        contentContainerStyle={{ paddingTop: 10 }}
      />
      {renderBottom({
        focused,
        onFocused,
        onBlur,
        text,
        onChangeText,
        onSend: sendMessage,
        onOpenBottomSheet: openBottomSheet
      })}
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={[420]}
        index={-1}
        enablePanDownToClose={true}>
        <BottomSheetMenu sendOrder={sendOrder} onSelect={onSelect} orderSelected={orderSelected} orders={orders} onCloseBottomSheet={closeBottomSheet} />
      </BottomSheet>
    </View>
  ) : (
    <Text>Loading...</Text>
  );
};

export default MessageScreen;
