import React from 'react';
import { TextInput, View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

import styles from './style';
const CustomTextInput = ({ label, placeholder, secureTextEntry, isPassword, onTogglePassword }) => {
  return (
    <View style={!isPassword && styles.viewInput}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          secureTextEntry={secureTextEntry}
          style={styles.input}
          placeholder={placeholder}
        />
        {isPassword && (
          <TouchableOpacity style={styles.iconContainer} onPress={onTogglePassword}>
            <Image
              source={secureTextEntry ? require('../../assets/icons/eyeon.png') : require('../../assets/icons/eyeoff.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};


export default CustomTextInput;
