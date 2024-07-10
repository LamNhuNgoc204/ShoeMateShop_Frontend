import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {sizes, spacing} from '../../constants';
import {fonts} from '../../constants/fonts';
import {colors} from '../../constants/colors';


export default styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: spacing.lg,
      backgroundColor: 'white',
    },
    title: {
      fontSize: 20,
      fontWeight: 'semibold',
      color: colors.text_black2B,
      fontFamily: fonts.rlw_medium,
    },
    avatar: {
      width: sizes.size96,
      height: sizes.size96,
      borderRadius: 50,
      marginTop: spacing.xl,
    },
    text: {
      fontSize: sizes.size14,
      fontWeight: 'semibold',
      color: colors.primary,
      fontFamily: fonts.rlw_medium,
      marginTop: spacing.sm,
    },
    ViewInput: {
      marginTop: spacing.xxxxl,
    },
    
    button: {
      marginTop: spacing.xxxxl,
    },
    press: {
      width: '100%',
      alignItems: 'center',
      borderRadius: 12,
      backgroundColor: colors.primary,
      marginTop: spacing.md,
    },
    textPress: {
      color: colors.background_primary,
      textAlign: 'center',
      fontSize: sizes.size16,
      fontFamily: fonts.rlw_bold,
      paddingVertical: spacing.md,
    },
  
  
  });
  