import { View, Text, Image, TouchableOpacity, FlatList, TextInput } from 'react-native'
import React, { useState } from 'react'
import appst from '../../constants/AppStyle'
import messageScreenStyle from './style'
import { colors } from '../../constants/colors'


const messages = [
  {
    message_id: 1,
    conversation_id: 1001,
    text: "Hello, how can I help you today?",
    isCustomerSent: false,
    create_at: "2024-07-13 10:00:00"
  },
  {
    message_id: 2,
    conversation_id: 1001,
    text: "I am looking for information on your products.",
    isCustomerSent: true,
    create_at: "2024-07-13 10:01:00"
  },
  {
    message_id: 3,
    conversation_id: 1002,
    text: "Can you provide me with a quote?",
    isCustomerSent: true,
    create_at: "2024-07-13 10:02:00"
  },
  {
    message_id: 4,
    conversation_id: 1003,
    text: "Sure, what products are you interested in?",
    isCustomerSent: false,
    create_at: "2024-07-13 10:03:00"
  },
  {
    message_id: 5,
    conversation_id: 1002,
    text: "I am interested in the premium package.",
    isCustomerSent: true,
    create_at: "2024-07-13 10:04:00"
  },
  {
    message_id: 6,
    conversation_id: 1001,
    text: "Our products include a variety of options...",
    isCustomerSent: false,
    create_at: "2024-07-13 10:05:00"
  },
  {
    message_id: 7,
    conversation_id: 1003,
    text: "How soon can you deliver?",
    isCustomerSent: true,
    create_at: "2024-07-13 10:06:00"
  },
  {
    message_id: 8,
    conversation_id: 1003,
    text: "We can deliver within 3-5 business days.",
    isCustomerSent: false,
    create_at: "2024-07-13 10:07:00"
  }
];




const renderToolbar = () => {
  return (
    <View style={[appst.toolbar, messageScreenStyle.toolBarStyle]}>
      <TouchableOpacity>
        <Image style={messageScreenStyle.icon16} source={require('../../assets/icons/back-blue.png')} />
      </TouchableOpacity>
      <View style={[messageScreenStyle.imageWrapper, messageScreenStyle.marginLeft15]}>
        <Image style={[messageScreenStyle.image40]} source={require('../../assets/images/avatar.png')} />
      </View>
      <View style={messageScreenStyle.marginLeft15}>
        <Text style={messageScreenStyle.name}>Duc Duy</Text>
        <Text style={messageScreenStyle.role}>Assistant</Text>
      </View>
    </View>
  )
}


const MessageItem = ({ message }) => {
  return (
    <View style={[messageScreenStyle.messageItem, messageScreenStyle.marginTop10, message.isCustomerSent && messageScreenStyle.customerMessageItem]}>
      <Text style={[messageScreenStyle.messageContent, message.isCustomerSent && messageScreenStyle.customerMessageContent]}>{message.text}</Text>
    </View>
  )
}


const renderBottom = () => {

  const [focused, setFocused] = useState(false)
  return (
    <View style={messageScreenStyle.bottomContainer}>
      <TextInput onBlur={() => { setFocused(false) }} onFocus={() => { setFocused(true) }} style={messageScreenStyle.input} placeholder='Message' placeholderTextColor={colors.color004BFE} />
      <TouchableOpacity>
        <Image source={require('../../assets/icons/open_gallery.png')} style={[messageScreenStyle.icon26, messageScreenStyle.marginLeft15, focused && messageScreenStyle.hide]} />
      </TouchableOpacity>
      <TouchableOpacity>
        <Image source={require('../../assets/icons/menu.png')} style={[messageScreenStyle.icon26, messageScreenStyle.marginLeft15, focused && messageScreenStyle.hide]} />
      </TouchableOpacity>
      <TouchableOpacity>
        <Image source={require('../../assets/icons/send.png')} style={[messageScreenStyle.icon26, messageScreenStyle.marginLeft15, !focused && messageScreenStyle.hide]} />
      </TouchableOpacity>
    </View>
  )
}

const MessageScreen = () => {
  return (
    <View style={[appst.container, messageScreenStyle.container]}>
      {renderToolbar()}
      <FlatList
        data={messages}
        renderItem={({ item }) => <MessageItem message={item} />}
        keyExtractor={(item, index) => index.toString()}
        style={{ paddingHorizontal: 20, flex: 1 }}
      />
      {renderBottom()}
    </View>
  )
}

export default MessageScreen