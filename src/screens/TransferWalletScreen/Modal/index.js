import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Image,
  TextInput,
  StyleSheet,
} from 'react-native';
import {modalst} from './style'; 
import CustomedButton from '../../../components/Button';
import { colors } from '../../../constants/colors';

const CustomModal = ({
  visible,
  closeModal,
  image,
  title,
  textbutton,
  content,
}) => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [completeOtp, setCompleteOtp] = useState('');
  const inputs = useRef([]);

  const handleChangeText = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text.length === 1 && index < 3) {
      inputs.current[index + 1].focus();
    }

    if (newOtp.every(digit => digit.length === 1)) {
      setCompleteOtp(newOtp.join(''));
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && otp[index] === '' && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        closeModal();
      }}>
      <View style={modalst.centeredView}>
        <View style={modalst.modalView}>
          {/* Nếu bạn muốn thêm hình ảnh vào modal */}
          {image && <Image source={image} style={modalst.image} />}

          <Text style={modalst.modalText}>{title}</Text>
          

          <View style={modalst.otpContainer}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                style={modalst.otpInput}
                value={digit}
                onChangeText={text => handleChangeText(text, index)}
                onKeyPress={e => handleKeyPress(e, index)}
                keyboardType="number-pad"
                maxLength={1}
                ref={ref => (inputs.current[index] = ref)}
              />
            ))}
          </View>
          <Text style={modalst.modalContent}>Forgot your PIN</Text>

          <CustomedButton
            title={textbutton}
            titleStyle={modalst.closeButtonText}
            style={modalst.closeButton}
            onPress={() => closeModal()}
          />
        </View>
      </View>
    </Modal>
  );
};


export default CustomModal;
