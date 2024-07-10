import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { sizes, spacing } from '../../constants';
import { fonts } from '../../constants/fonts';
import { colors } from '../../constants/colors';


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
    viewBody: {
      marginTop: sizes.size56,
    },
    signOut: {
      fontSize: sizes.size18,
      fontWeight: 'bold',
      color: colors.primary,
      fontFamily: fonts.rlw_medium,
      marginTop: spacing.xxl,
    },
  });
  