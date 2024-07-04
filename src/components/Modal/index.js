import React from 'react';
import { View, Text, Modal, TouchableOpacity, Image } from 'react-native';
import { modalst } from './style';

const CustomModal = ({ visible, closeModal }) => {
  return (
    <Modal
      animationType="slide" 
      transparent={true}
      visible={visible} 
      onRequestClose={() => { // Xử lý khi bấm nút back
        closeModal();
      }}
    >
      <View style={modalst.centeredView}>
        <View style={modalst.modalView}>
          <Image source={require('../../assets/images/img_success.png')}/>
          <Text style={modalst.modalText}>Your Payment Is Successful</Text>
          <TouchableOpacity
            style={modalst.closeButton}
            onPress={() => closeModal()}
          >
            <Text style={modalst.closeButtonText}>Back To Shopping</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default CustomModal;
