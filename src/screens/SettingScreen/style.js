import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {sizes, spacing} from '../../constants';
import {fonts} from '../../constants/fonts';
import {colors} from '../../constants/colors';

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: spacing.lg,
  },
  title: {
    fontSize: 20,
    fontWeight: 'semibold',
    color: colors.text_black2B,
    fontFamily: fonts.rlw_medium,
  },
  signOut: {
    fontSize: sizes.size18,
    color: colors.primary,
    fontFamily: fonts.rlw_bold,
  },
  button: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'gray',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 20,
  },
  text1: {
    textAlign: 'center',
    marginTop: 8,
    fontFamily: fonts.rlw_medium,
  },
});
