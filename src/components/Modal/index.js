import React from 'react';
import {View, Text, Modal, TouchableOpacity, Image} from 'react-native';
import {modalst} from './style';
import CustomedButton from '../Button';

const CustomModal = ({
  visible,
  closeModal,
  image,
  title,
  textbutton,
  content,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        // Xử lý khi bấm nút back
        closeModal();
      }}>
      <View style={modalst.centeredView}>
        <View style={modalst.modalView}>
          <Image source={image} />
          <Text style={modalst.modalText}>{title}</Text>
          <Text style={modalst.modalContent}>{content}</Text>
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
