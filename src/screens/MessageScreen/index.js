import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  TextInput,
  StyleSheet,
  Alert,
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
import { formatCurrency } from '../../utils/functions/formatCurrency';
import { launchImageLibrary } from 'react-native-image-picker';
import ImageView from "react-native-image-viewing";
import axios from 'axios';


const ProductMessageItem = ({ product, isMessage, onSend, onClose }) => {

  if (!product) {
    return <View />;
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: product.assets[0] || "https://via.placeholder.com/60" }} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.name} numberOfLines={1} ellipsizeMode='tail'>{product.name}</Text>
        <Text style={styles.price}>{formatCurrency(product.price)} đ</Text>
        <Text style={styles.description} numberOfLines={2}>
          {product.description}
        </Text>
      </View>
      <View style={[{ alignItems: 'flex-end', justifyContent: 'space-between', paddingLeft: 5 }, isMessage && { display: 'none' }]}>
        <TouchableOpacity onPress={onClose}>
          <Text style={{ fontSize: 16, fontWeight: '700', color: colors.black }}>X</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onSend} style={{ backgroundColor: colors.primary, borderRadius: 16, paddingVertical: 5, paddingHorizontal: 10, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontSize: 16, fontWeight: '700', color: '#fff' }}>Gửi</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    marginVertical: 5,
    borderRadius: 8,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: colors.primary
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  details: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  price: {
    color: '#FF5733',
    marginTop: 4,
    fontSize: 14,
  },
  description: {
    color: '#6c6c6c',
    marginTop: 2,
    fontSize: 12,
  },
});



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
            avatar
              ? { uri: avatar }
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

const MessageItem = ({ message, user }) => {
  function formatDate(isoString) {
    const date = new Date(isoString);
    const now = new Date();

    const diffTime = now - date;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays >= 2) {
      return date.toLocaleDateString('vi-VN');
    } else if (diffDays >= 1) {
      return 'hôm qua';
    } else {
      return date.toLocaleTimeString('vi-VN', {
        hour: '2-digit',
        minute: '2-digit',
      });
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
      <Text style={{
        fontSize: 12,
        marginTop: 5
      }}>{formatDate(message.createdAt)}</Text>
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
  onOpenBottomSheet,
  onOpenGallery
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
      <TouchableOpacity onPress={onOpenGallery}>
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
    var count = 0;
    order.orderDetails.forEach(e => {
      count += e.product.pd_quantity;
    });
    return count;
  };
  return (
    <View
      style={{
        width: '100%',
        padding: 15,
        borderRadius: 16,
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: colors.primary,
      }}>
      <Image
        source={{
          uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNOfRQ6Of1RQUHmzbfpCaYYzU0fOFqzQFEgw&s',
        }}
        style={{ width: 60, height: 60, borderRadius: 8 }}
      />
      <View style={{ flex: 1, paddingHorizontal: 10 }}>
        <Text
          style={{ color: '#000', fontWeight: '700', fontSize: 16 }}
          ellipsizeMode="tail"
          numberOfLines={1}>
          Order #{order.order._id}
        </Text>
        <Text>{order.order.status}</Text>
        <View style={{ flex: 1 }} />
        <Text
          style={[{ fontWeight: '700', color: colors.primary, fontSize: 14 }]}>
          Total: ${formatCurrency(order.order.total_price)}
        </Text>
      </View>
      <View style={{ justifyContent: 'space-between' }}>
        <Text
          style={{
            backgroundColor: '#cdcdcd',
            padding: 3,
            borderRadius: 10,
            color: '#fff',
            textAlign: 'center'
          }}>
          {countItem()} items
        </Text>
        <TouchableOpacity
          onPress={onSelect}
          style={[
            {
              paddingHorizontal: 10,
              paddingVertical: 5,
              borderRadius: 16,
              borderWidth: 1,
              borderColor: '#2d5430',
            },
            isSelected && { backgroundColor: colors.primary },
            isMessage && { display: 'none' },
          ]}>
          <Text style={[{ color: isSelected ? 'white' : colors.primary }]}>
            Select
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const BottomSheetMenu = ({
  onCloseBottomSheet,
  orders,
  orderSelected,
  onSelect,
  sendOrder,
}) => {
  const checkSelect = (order, orderSelect) => {
    if (!orderSelect) {
      return false;
    } else if (orderSelect.order._id == order.order._id) {
      return true;
    } else {
      return false;
    }
  };
  return (
    <View style={{ padding: 10, height: 400, width: '100%' }}>
      <BottomSheetFlatList
        ItemSeparatorComponent={<View style={{ height: 10 }} />}
        data={orders}
        renderItem={({ item }) => (
          <OrderItem
            onSelect={() => onSelect(item)}
            isSelected={checkSelect(item, orderSelected)}
            order={item}
          />
        )}
        keyExtractor={(item, id) => id.toString()}
        contentContainerStyle={{ padding: 15 }}
        showsVerticalScrollIndicator={false}
      />
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity
          onPress={sendOrder}
          style={{
            flex: 1,
            borderRadius: 16,
            padding: 10,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors.primary,
          }}>
          <Text style={{ color: 'white', fontWeight: '700', fontSize: 16 }}>
            Send
          </Text>
        </TouchableOpacity>
        <View style={{ width: 20 }} />
        <TouchableOpacity
          onPress={onCloseBottomSheet}
          style={[
            {
              justifyContent: 'center',
              alignItems: 'center',
              padding: 10,
              borderRadius: 16,
              borderWidth: 1,
              borderColor: colors.primary,
              paddingHorizontal: 40,
            },
          ]}>
          <Text
            style={{ fontSize: 20, fontWeight: '700', color: colors.primary }}>
            x
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};


const groupDate = (messages) => {
  if (messages.length === 0) return [];

  messages = messages.reverse();

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  let lastDate = null;


  return messages.map((message) => {
    const messageDate = formatDate(message.createdAt);

    const isShowDate = messageDate !== lastDate;
    lastDate = messageDate;
    return { ...message, isShowDate };
  }).reverse();;
};


export function formatDate(isoString) {
  const inputDate = new Date(isoString);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const day = String(inputDate.getDate()).padStart(2, '0');
  const month = String(inputDate.getMonth() + 1).padStart(2, '0');
  const year = inputDate.getFullYear();
  const formattedDate = `${day}/${month}/${year}`;

  const daysOfWeek = ['Chủ Nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];

  // So sánh ngày
  if (inputDate.toDateString() === today.toDateString()) {
    return `Hôm nay, ${formattedDate}`;
  } else if (inputDate.toDateString() === yesterday.toDateString()) {
    return `Hôm qua, ${formattedDate}`;
  } else {
    return `${daysOfWeek[inputDate.getDay()]}, ${formattedDate}`;
  }
}

const maxWidth = 220

const MessageTypeImage = ({ message, user, onImagePress }) => {
  const imageCount = message.fileUrls.length;
  const isLastMessageExpand = imageCount % 2 == 1;

  function formatDate(isoString) {
    const date = new Date(isoString);
    const now = new Date();

    const diffTime = now - date;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays >= 2) {
      return date.toLocaleDateString('vi-VN');
    } else if (diffDays >= 1) {
      return 'hôm qua';
    } else {
      return date.toLocaleTimeString('vi-VN', {
        hour: '2-digit',
        minute: '2-digit',
      });
    }
  }
  return <View>
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', maxWidth: maxWidth + 16, alignSelf: user._id == message.senderId._id ? 'flex-end' : 'flex-start' }}>
      {
        message.fileUrls.map((file, index) => {
          return <TouchableOpacity onPress={() => {onImagePress(message.fileUrls, index)}} key={index.toString() + message._id}>
            <Image
            source={{ uri: file }}
            style={[{
              marginVertical: 2,
              borderRadius: 16,
              width: maxWidth / 2 - 2,
              height: 100,
              borderRadius: 10,
              marginHorizontal: 5,
            }, (isLastMessageExpand && index == message.fileUrls.length - 1) && { width: 220 }]}
          />
          </TouchableOpacity>
        })
      }
    </View>
    <Text style={{ borderRadius: 16, color: 'white', paddingHorizontal: 5, backgroundColor: '#cdcdcd', fontSize: 12, alignSelf: 'flex-end', marginRight: 10 }}>{formatDate(message.createdAt)}</Text>
  </View>
}

const MessageScreen = ({ navigation, route }) => {
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
  const { product } = route.params;
  const [curProduct, setCurProduct] = useState(null);
  const [orderSelected, setOrderSelected] = useState();
  const [urls, setUrls] = useState([]);
  const [images, setImages] = useState([]);
  const [imageIndex, setImageIndex] = useState(0)
  const [visible, setVisible] = useState(false);

  console.log('message length: ' + messages.length)

  // console.log('user', name, avatar);

  const SOCKET_URL = `http://192.168.1.97:3000/`;

  const getConversation = async () => {
    try {
      const conversation = await getConversationAction();
      const messagesResponse = await getMessagesAction(conversation._id);
      const newMessage = groupDate(messagesResponse)
      setMessages(newMessage);
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
      return;
    }
    try {
      const response = await AxiosInstance().post('/messages/send-message', {
        conversationId: conversation._id,
        senderId: user._id,
        text: 'send order',
        orderId: orderSelected.order._id,
      });
      if (response.status) {
        console.log('send order success');
        setOrderSelected(null);
        closeBottomSheet();
      }
    } catch (error) {
      console.log('Error sending order');
    }
  };

  const sendProduct = async () => {
    try {
      if (!curProduct) {
        return
      }
      const response = await AxiosInstance().post('/messages/send-message', {
        conversationId: conversation._id,
        senderId: user._id,
        text: 'send product',
        productId: curProduct._id,
      })
      if (response.status) {
        console.log('send product success');
        setCurProduct(null);
      }
    } catch (error) {
      console.log('Error sending product');
    }
  }

  const pickImages = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        selectionLimit: 0,
        includeBase64: false,
      },
      response => {
        if (response.didCancel) {
          Alert.alert('User cancelled image picker');
        } else if (response.errorCode) {
          Alert.alert('ImagePicker Error', response.errorMessage);
        } else {
          uploadImages(response.assets)
        }
      }
    );
  };

  // Upload ảnh
  const uploadImages = async (selectedImages) => {
    if (selectedImages.length === 0) {
      Alert.alert('No images selected!');
      return;
    }

    const formData = new FormData();
    selectedImages.forEach((image, index) => {
      const mimeType = image.uri.split('.').pop().toLowerCase(); // Lấy phần mở rộng file ảnh
      const type = mimeType === 'jpg' || mimeType === 'jpeg' ? 'image/jpeg' : `image/${mimeType}`;

      formData.append('images', {
        uri: image.uri,
        name: `photo-${index}.${mimeType}`,
        type: type,
      });
    });

    try {
      const result = await axios.post(
        'https://upload-image-git-main-duc-duys-projects-1c370f99.vercel.app/upload/upload-multiple',
        formData,
        {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }
    );

      console.log('Upload successful:', result.data);
      sendImage(result.data.data);
    } catch (error) {
      console.error('Upload failed:', error);
      Alert.alert('Error', 'Failed to upload images.');
    }
  };

  const sendImage = async (urls) => {
    console.log('sendImage....: ', urls);
    try {
      if (urls.length == 0) {
        return
      }
      const result = await AxiosInstance().post('/messages/send-message', {
        conversationId: conversation._id,
        senderId: user._id,
        text: '{Ảnh}',
        imageUrls: urls,
      })
      if (result.status) {
        setUrls([]);
      }
    } catch (error) {
      console.log('Upload failed:', error);
    }
  }




  const onSelect = order => {
    setOrderSelected(order);
  };

  const getOrders = async () => {
    try {
      const response = await AxiosInstance().get(
        'orders/get-orders-for-message',
      );

      if (response.status) {
        console.log('orders...: ', response.data);
        setOrders(response.data);
      }
    } catch (error) { }
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
      console.log('aaaaa: ', messages.length)
      console.log('Received message:', data.message);
      var newMessages = groupDate([data.message, ...messages])
      setMessages(newMessages)
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
  }, [messages]);

  const scrollToTop = () => {
    if (messagesRef.current) {
      messagesRef.current?.scrollToIndex({ index: 0, animated: true });
    }
  };

  const openBottomSheet = () => {
    if (bottomSheetRef.current) {
      bottomSheetRef.current.snapToIndex(0);
    }
  };

  const closeBottomSheet = () => {
    if (bottomSheetRef.current) {
      bottomSheetRef.current.close();
    }
  };

  useEffect(() => {
    scrollToTop();
  }, [messages]);

  useEffect(() => {
    setCurProduct(product)
  }, [product])

  const newDate = () => {
    const date = new Date();
    const utcOffsetInMs = 7 * 60 * 60 * 1000; // UTC+7 trong milliseconds
    const newDate = new Date(date.getTime() + utcOffsetInMs);
    return newDate;
  }

  const onImagePress = (imgs, index) => {
    const newImgs = imgs.map((img) => ({
      uri: img
    }))
    setImageIndex(index)
    setImages(newImgs)
    setVisible(true)
  }

  return conversation ? (
    <View style={[appst.container, messageScreenStyle.container]}>
      {renderToolbar({ onBack, name, avatar })}
      <FlatList
        ItemSeparatorComponent={<View style={{ marginBottom: 10 }} />}
        inverted={true}
        ref={messagesRef}
        data={messages}
        renderItem={({ item }) => (
          <>

            {item.type === 'text' && <MessageItem user={user} message={item} />}
            {item.type === 'order' && <OrderItem order={item.order} isMessage={true} />}
            {item.type === 'product' && <ProductMessageItem product={item.product} isMessage={true} />}
            {item.type === 'image' && <MessageTypeImage onImagePress={onImagePress} message={item} user={user} />}
            {item.isShowDate && (
              <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 12, color: '#999', marginBottom: 5, marginVertical: 10 }}>
                  {formatDate(item.createdAt) == formatDate(newDate()) ? 'Hôm nay' : formatDate(item.createdAt)}
                </Text>
              </View>
            )}
          </>
        )}
        // ListHeaderComponent={(messages.length > 0 && messages[0].senderId._id == user._id) && <View style={{
        //   paddingVertical: 5, paddingHorizontal: 10, justifyContent: 'center', alignItems: 'center', marginVertical: 5,
        //   borderRadius: 16,
        //   backgroundColor: "#cdcdcd",
        //   alignSelf: 'flex-end'
        // }}>
        //   <Text style={{ fontSize: 14, fontWeight: '500', color: 'white' }}>{messages[0].isStaffRead ? "Đã xem" : "Đã gửi"}</Text>
        // </View>}
        keyExtractor={(item, index) => index.toString()}
        style={{ paddingHorizontal: 20, flex: 1 }}
        contentContainerStyle={{ paddingTop: 10 }}
      />

      <ProductMessageItem product={curProduct} onClose={() => { setCurProduct(null) }} onSend={sendProduct} />
      {renderBottom({
        focused: text != "",
        onFocused,
        onBlur,
        text,
        onChangeText,
        onSend: sendMessage,
        onOpenBottomSheet: openBottomSheet,
        onOpenGallery: pickImages
      })}

      <ImageView
        images={images}
        imageIndex={imageIndex}
        visible={visible}
        onRequestClose={() => setVisible(false)}
      />
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={[420]}
        index={-1}
        enablePanDownToClose={true}>
        <BottomSheetMenu
          sendOrder={sendOrder}
          onSelect={onSelect}
          orderSelected={orderSelected}
          orders={orders}
          onCloseBottomSheet={closeBottomSheet}
        />
      </BottomSheet>
    </View>
  ) : (
    <Text>Loading...</Text>
  );
};

export default MessageScreen;
