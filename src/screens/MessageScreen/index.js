import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  TextInput,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import appst from '../../constants/AppStyle';
import messageScreenStyle from './style';
import {colors} from '../../constants/colors';
import {
  getConversationAction,
  getMessagesAction,
  sendMessageAction,
} from '../../redux/actions/messageAction';
import {useSelector} from 'react-redux';
import io from 'socket.io-client';

const renderToolbar = ({onBack, name, avatar}) => {
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
            avatar
              ? {uri: avatar}
              : require('../../assets/images/placeholder_image.jpg')
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

const MessageItem = ({message, user}) => {
  return (
    <View
      style={[
        messageScreenStyle.messageItem,
        messageScreenStyle.marginTop10,
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
      <TouchableOpacity>
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

const MessageScreen = ({navigation}) => {
  const [conversation, setConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [focused, setFocused] = useState(false);
  const [user, setUser] = useState(null);
  const [text, setText] = useState('');
  const authState = useSelector(state => state.user);
  const messagesRef = useRef(null);
  const name = authState.user.name;
  const avatar = authState.user.avatar;

  // console.log('user', name, avatar);

  const SOCKET_URL = `http://192.168.1.68:3000/`;

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
      setMessages(prevMessages => [...prevMessages, data.message]);
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

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current?.scrollToEnd({animated: true});
    }
  }, [messages]);

  return conversation ? (
    <View style={[appst.container, messageScreenStyle.container]}>
      {renderToolbar({onBack, name, avatar})}
      <FlatList
        ref={messagesRef}
        data={messages}
        renderItem={({item}) => <MessageItem user={user} message={item} />}
        keyExtractor={(item, index) => index.toString()}
        style={{paddingHorizontal: 20, flex: 1}}
        contentContainerStyle={{paddingTop: 10}}
      />
      {renderBottom({
        focused,
        onFocused,
        onBlur,
        text,
        onChangeText,
        onSend: sendMessage,
      })}
    </View>
  ) : (
    <Text>Loading...</Text>
  );
};

export default MessageScreen;
